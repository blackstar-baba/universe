## 描述

高可用的两种方式：

1. 利用域名A记录，指向多个IP，从而达到高可用。
2. 利用Vip+KeepAlive，利用VRRP协议达到高可用。

优缺点：
- 方案1 DNS可能有失效时间，用户不一定有DNS管理服务或者不允许，
- 方案2 需要申请VIP，在对应机器上安装KeepAlive


## 链接
- 本地DNS设置 https://www.tecmint.com/setup-local-dns-using-etc-hosts-file-in-linux/
