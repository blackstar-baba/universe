## description

### 属性检查
Supports：
- replication_num 
- storage_medium 
- storage_cooldown_time

No Supports：

- bloom_filter_columns

- dynamic_partition
- in_memory
- rollup
- enable_persistent_index primary key兼容
- tablet_type mv没有属性存储，一般存储在partitionInfo具体的partition上
- version_info  分区版本信息
- short_key
- storage_type
- schema_version
- storage_format  doris升级，默认default
- colocate_group 暂不支持，因mv语法设定了分区，分桶，后面在想

### 任务调度
创建完成后，如果是异步刷新，需要增加调度任务，后续补逻辑：周期性任务（异步）， 手动以及导入触发

### 分区创建

创建物化视图时，不创建分区，数据同步时进行创建

## link





