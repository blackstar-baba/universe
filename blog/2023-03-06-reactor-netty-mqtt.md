---
slug: reactor-netty-mqtt
title: reactor netty mqtt
authors: blackstar
tags: [reactor, netty, mqtt]
---

TcpMqttServer

```
import io.netty.channel.ChannelOption;
import io.netty.handler.codec.mqtt.MqttDecoder;
import io.netty.handler.codec.mqtt.MqttEncoder;
import reactor.netty.DisposableServer;
import reactor.netty.tcp.TcpServer;

import io.netty.channel.ChannelOption;
import io.netty.handler.codec.mqtt.MqttDecoder;
import io.netty.handler.codec.mqtt.MqttEncoder;
import reactor.netty.DisposableServer;
import reactor.netty.tcp.TcpServer;

public class TcpMqttServer {
    public static void main(String[] args) {

        String host = "localhost";
        int port = 1883;

        DisposableServer disposableServer = TcpServer
                .create()
                .host(host)
                .port(port)
                .wiretap(true)
                .childOption(ChannelOption.SO_KEEPALIVE, false)
                .doOnConnection(connection -> {
                    connection.addHandlerFirst("encoder", MqttEncoder.INSTANCE);
                    connection.addHandlerLast("decoder", new MqttDecoder(65536));
                })
                .handle(MqttProcessor::process)
                .bindNow();
        disposableServer.onDispose().block();
    }
}

```
MqttProcessor

```
import io.netty.handler.codec.mqtt.MqttConnAckMessage;
import io.netty.handler.codec.mqtt.MqttConnAckVariableHeader;
import io.netty.handler.codec.mqtt.MqttConnectMessage;
import io.netty.handler.codec.mqtt.MqttConnectReturnCode;
import io.netty.handler.codec.mqtt.MqttFixedHeader;
import io.netty.handler.codec.mqtt.MqttMessage;
import reactor.core.publisher.Flux;
import reactor.netty.NettyInbound;
import reactor.netty.NettyOutbound;

import static io.netty.handler.codec.mqtt.MqttConnectReturnCode.CONNECTION_ACCEPTED;
import static io.netty.handler.codec.mqtt.MqttMessageType.CONNACK;
import static io.netty.handler.codec.mqtt.MqttQoS.AT_MOST_ONCE;

public class MqttProcessor {

    public static NettyOutbound process(NettyInbound in, NettyOutbound out){
        Flux<MqttMessage> inMqttMessage = in.receiveObject()
                .cast(MqttMessage.class);
        return out
                .withConnection(connection -> {
                    connection.disposeNow();
                })
                .sendObject(Flux.from(inMqttMessage)
                .doOnError((throwable -> {
                    throwable.printStackTrace();
                }))
                .map(mqttMessage -> createMqttConnAckMsg(CONNECTION_ACCEPTED, ((MqttConnectMessage) mqttMessage)))
        );
    }

    private static MqttConnAckMessage createMqttConnAckMsg(MqttConnectReturnCode returnCode, MqttConnectMessage msg) {
        MqttFixedHeader mqttFixedHeader =
                new MqttFixedHeader(CONNACK, false, AT_MOST_ONCE, false, 0);
        MqttConnAckVariableHeader mqttConnAckVariableHeader =
                new MqttConnAckVariableHeader(returnCode, !msg.variableHeader().isCleanSession());
        return new MqttConnAckMessage(mqttFixedHeader, mqttConnAckVariableHeader);
    }
}

```
