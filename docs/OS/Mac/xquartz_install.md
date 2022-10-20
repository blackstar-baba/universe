## description

For xquartz install.

### install

#### Local Machine
- dmg

Step 1. download xquartz from `https://www.xquartz.org/releases/`

Step 2. double click `xquartz.dmg` which downloaded in step 1,  click `continue` until `close`

- brew

```
brew install xquartz
```

####  Remote Machine

Step1. install auth

```
apt-get install xauth
or
yum install xauth

```

Step2. set `/etc/ssh/sshd_config`,  use command `which xauth` to check xauth installed path，if path is not equals `usr/bin/xauth`,set variable `XAuthLocation`.

```
X11Forwarding yes
# 基础偏移量，比如打开一个窗口，display值为10，再打开一个，display值为11
X11DisplayOffset 10 
X11UseLocalhost yes
# XAuthLocation /bin/xauth
```

Step3 restart ssh server, e.g.

```
service sshd restart
```

### use

```
ssh -X user@host:port
```

### trouble shooting
you can use `-vv` to get some debug information, e.g.
```
ssh -X -vv user@host:port
```
information like this:
```
debug2: we did not send a packet, disable method
debug1: Next authentication method: publickey
debug1: Offering public key: /root/.ssh/id_rsa RSA SHA256:hin98oADYQTl0Ge9/x4jQoi5FhI5BVRBP+vJJDNB31c
debug2: we sent a publickey packet, wait for reply
debug1: Authentications that can continue: publickey,gssapi-with-mic,password
debug1: Trying private key: /root/.ssh/id_dsa
debug1: Trying private key: /root/.ssh/id_ecdsa
debug1: Trying private key: /root/.ssh/id_ed25519
debug1: Trying private key: /root/.ssh/id_xmss
debug2: we did not send a packet, disable method
```
if you find `no xauth program`, you can look link `no-xauth-program`

## link
- no-xauth-program https://unix.stackexchange.com/questions/552601/no-xauth-program-cannot-forward-x11

- embird install https://www.embird.net/sw/embird/tutorial/wine/xquartz.htm

