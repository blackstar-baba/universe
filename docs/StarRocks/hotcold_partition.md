## description

在很多业务场景中，较近时间段的数据通常是查询最频繁的，时间较久的历史数据查询频率可能就会低很多。StarRocks支持在一个BE中使用多种存储介质（HDD/SSD/Mem），这样我们就可以将最新数据所在的分区放在SSD上，利用SSD的随机读写性能来提高查询性能。而老的数据会自动迁移至HDD盘中，以节省数据存储的成本。此外，StarRocks也是支持内存表的，但这部分功能很久没有优化了，目前不推荐使用。

首先明确一点，若集群服务器的存储介质单一（只有机械磁盘，又或者全为固态硬盘），我们就不需要再单独设置什么。例如集群中的磁盘全为SSD，虽然StarRocks在不额外设置参数时默认展示磁盘为HDD，但由于SSD带来的性能提升是源自物理层面的，所以并不会影响实际性能。

当同一台服务器中既有SSD又有HDD时，StarRocks并不会自动识别磁盘的类型，我们需要在be.conf中为storage_root_path显式的指定存储介质类型，格式可以参考be.conf中的示例：

> \# storage_root_path = /data1,medium:HDD,capacity:50;/data2,medium:SSD,capacity:1;/data3,capacity:50;/data4
>
> \# /data1, capacity limit is 50GB, HDD;
>
> \# /data2, capacity limit is 1GB, SSD;
>
> \# /data3, capacity limit is 50GB, HDD(default);
>
> \# /data4, capacity limit is disk capacity, HDD(default)

StarRocks的冷热分区目前有以下几个使用方式：

1、在建表时，指定表级别的存储介质及存储到期时间；

2、建表完成后，修改分区的存储介质及存储到期时间；

3、建表完成后，新增分区时设置分区的存储介质及存储到期时间；

4、当前不支持在建表时为某个分区单独设置分区的到期时间，同样，也不支持设置动态分区自动创建的新分区的到期时间。

举个例子，在集群的be.conf中设置完SSD及HDD后，创建表table08：

> CREATE TABLE table08 (
>
>   user_id INT COMMENT "id of user",
>
>   device_code INT COMMENT "code of device",
>
>   device_price DECIMAL(10,2) COMMENT "",
>
>   event_time DATETIME NOT NULL COMMENT "datetime of event",
>
>   total DECIMAL(18,2) SUM DEFAULT "0" COMMENT "total amount of equipment",
>
>   index index01 (user_id) USING BITMAP COMMENT "bitmap index"
>
> )
>
> AGGREGATE KEY(user_id, device_code,device_price,event_time)
>
> PARTITION BY RANGE(event_time)
>
> (
>
> PARTITION p1 VALUES LESS THAN ('2022-01-01'),
>
> PARTITION p2 VALUES LESS THAN ('2022-01-02'),
>
> PARTITION p3 VALUES LESS THAN ('2022-01-03')
>
> )
>
> DISTRIBUTED BY HASH(user_id,device_code) BUCKETS 20
>
> PROPERTIES (
>
> "replication_num" = "1",
>
> "storage_medium" = "SSD",
>
> "storage_cooldown_time" = "2023-01-01 23:59:59"
>
> );

通过show语句，查看分区存储介质及其到期时间：

> show partitions from table08;

StorageMedium为SSD；

CooldownTime为2023-01-01 23:59:59。

这里的storage_cooldown_time参数若不显式设置，默认为1个月，默认时间可以通过fe.conf中storage_cooldown_second参数调整。

修改分区p3的存储到期时间：

> ALTER TABLE table08 MODIFY PARTITION p3 SET("storage_medium"="SSD", "storage_cooldown_time"="2023-03-11 10:29:01");

新增分区p4，指定存储介质及存储到期时间：

> ALTER TABLE table08 ADD PARTITION p4 VALUES LESS THAN ('2022-01-04') ("storage_medium" = "SSD","storage_cooldown_time"="2023-03-11 10:29:01");

在table08中，我们虽然在PROPERTIES 中设置了"storage_medium" = "SSD"和"storage_cooldown_time"，但这个属性仅会用于表创建时的三个分区，后面新建的分区若不指定，还是会使用HDD（也就没有所谓的存储到期时间了）。这里的默认存储介质类型受fe.conf中的default_storage_medium参数控制，默认为HDD，我们可以设置为：default_storage_medium=SSD

注意，只有SSD的存储到期时间有意义，在HDD中，到期时间都为9999-12-31，也即为无到期时间。当时钟到达分区存储到期时间后，会触发迁移逻辑，该分区存储在SSD中的数据会向HDD中迁移。

这里同样引出一个注意事项，当我们的存储介质全为SSD时，我们前面提到过，完全可以不单独设置参数，也即be.conf和建表语句中都不用设置。此时，若我们在建表语句中设置了"storage_medium" = "SSD"，那同时就需要注意给一个较大的"storage_cooldown_time"到期时间，以避免分区到期后后台不断触发迁移逻辑。

## link

