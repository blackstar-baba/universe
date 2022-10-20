## description

System: ubuntu20.04

### install

```
sudo apt update && sudo apt upgrade
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=arm64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get -y install docker-ce
sudo usermod -aG docker ${USER}
```

### test

```
docker run --rm hello-world
```

## link

- https://brjapon.medium.com/setting-up-ubuntu-20-04-arm-64-under-raspberry-pi-4-970654d12696





