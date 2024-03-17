## 环境
- 系统：macOS 14.1.2 
- CPU：2.3 GHz 八核Intel Core i9
- 内存16 GB 2400 MHz DDR4

## 正文


### 编译
1. 下载源码
```
git clone https://github.com/datafuselabs/databend.git
```

2. 安装基础环境
```
cd databend
make setup -d
export PATH=$PATH:~/.cargo/bin
```
3. 编译
调试目的：
```
make build
```
生产目的：
```
make build-release
```
长时间（约30分钟）后，没有任何错误后可视为编译成功。

### 运行
测试 是否编译
```
# 1. Start databend-meta first:
nohup target/debug/databend-meta --single --log-level=ERROR &

# 2. Start databend-query and connect it to databend-meta:
nohup target/debug/databend-query -c scripts/ci/deploy/config/databend-query-node-1.toml &
```

### 终止
```
killall -9 databend-meta
killall -9 databend-query
```
## 链接
- 官方文档 https://docs.databend.com/guides/community/contributor/building-from-source