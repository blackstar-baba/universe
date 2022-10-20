
## description

#### 底层结构

- data_points  保存数据的位置。
- row_key_index  用于查询查询期间要获取的行的索引。(old)
- string_index  用于响应系统中tags和metrics的查询。
- service_index 存储host\rollups
- row_keys ？
- row_key_time_index ？

#### 代码分析
入口类 `org.kairosdb.core.Main`
启动参数 `-c start`

##### 聚合
代码路径`src/main/java/org/kairosdb/core/aggregator`

聚合举例：
```
graph TD
CountAggregator(CountAggregator Class)-- depend -->RangeAggregator
RangeAggregator-- implement -->Aggregator
RangeAggregator-- implement -->TimezoneAware
```

Denpendencies
- LongDataPointFactory (数据点工厂)
- DataPoint（数据点）

#### rest api
代码路径`src/main/java/org/kairosdb/core/http/rest`

Rest请求时序数据如图
```
sequenceDiagram
MetricsResource->>MetricsResource: runQuery
MetricsResource->>KairosDatastore: createQuery
KairosDatastore->>MetricsResource: return DatastoreQuery
MetricsResource->>DatastoreQuery: execute
DatastoreQuery->>Datastore: queryDatabase(if no cache)
Datastore->>DatastoreQuery: returnedRows
DatastoreQuery->>Aggregator:aggregate
Aggregator->>DatastoreQuery:aggregatedGroup
DatastoreQuery->>MetricsResource:List<DataPointGroup>
```




#### QA
- Q：剥离一套的成本较大，内部依赖较多，建议是剥离聚合部分
- A：单独工程
- Q：kairos默认指标不在体现
- A：移除
- Q：感觉相关社区太不活跃了，不是一个长久的方案
- A：
- Q：jar包依赖太多，40+，需要确定改造方案
- A：

## link
