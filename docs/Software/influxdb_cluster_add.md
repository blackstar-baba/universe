## description
#### 修改原则

尽可能少的修改原始文件，抽象出接口，实现接口并进行替换更加容易，也更少出错，后期merge代码也会更方便

#### 元数据
meta server 基于raft协议，具体go module使用raft-boltdb

#### 写入
根据规则判断写入本地shard还是远程，如果是本地，调用`w.TSDBStore.WriteToShard`进行写入，如果远程，调用 `.ShardWriter.WriteShard`进行rpc连接然后写入数据，无法写入的数据写入本地hints

#### 查询

实现RemoteShardMapper包裹LocalShardMapper，RemoteShardMapper对shardgroups 中的shards根据nodeID进行分类，优先本地node，做数据请求时，根据分类依次判断，如果为本地，使用LocalShardMapper，如果为远程，进行rpc连接请求数据，需要实现的结构体以及方法为：
```
//分片
RemoteShardMapper
    MapShards
    mapShards
//具体请求实现   
RemoteShardMapping
    FieldDimensions
    MapType
    CreateIterator
    IteratorCost
//远程拨号
NodeDialer
    DialNode
```

```
├── NOAA_water_database
│   ├── _series
│   │   ├── 00
│   │   │   └── 0000
│   │   ├── 01
│   │   │   └── 0000
│   │   ├── 02
│   │   │   └── 0000
│   │   ├── 03
│   │   │   └── 0000
│   │   ├── 04
│   │   │   └── 0000
│   │   ├── 05
│   │   │   └── 0000
│   │   ├── 06
│   │   │   └── 0000
│   │   └── 07
│   │       └── 0000
│   └── default
│       ├── 15
│       │   ├── 000000001-000000001.tsm
│       │   └── fields.idx
│       ├── 16
│       │   ├── 000000001-000000001.tsm
│       │   └── fields.idx
│       ├── 17
│       │   ├── 000000001-000000001.tsm
│       │   └── fields.idx
│       ├── 18
│       │   ├── 000000001-000000001.tsm
│       │   └── fields.idx
│       ├── 19
│       │   ├── 000000001-000000001.tsm
│       │   └── fields.idx
│       └── 20
│           ├── 000000001-000000001.tsm
│           └── fields.idx
```


## link
