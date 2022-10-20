## description

StarRocks中也有临时分区的概念，通过临时分区，我们可以较为方便的调整原数据表中不合理分区的分桶数或者分区范围，也可以在StarRocks中基于lambda模式方便的进行数据导入（用T+1的数据修正实时数据）。

首先，只有显式指定的分区表才可以创建临时分区，例如前面的table01、table05和table07。临时分区的创建需要遵循以下规则：

1、临时分区的分区列和正式分区的相同，且不可修改；

2、一张表所有临时分区之间的分区范围不可重叠，但临时分区的范围和正式分区范围可以重叠；

3、临时分区的分区名称不能和正式分区或其他临时分区的重复。

4、与正式分区一样，临时分区同样可以独立指定一些属性。包括分桶数、副本数、是否是内存表、存储介质等信息。

临时分区的创建语法与正式分区的基本一致，只有关键词TEMPORARY PARTITION不同，例如为表table05新增一个临时分区tp01：

> ALTER TABLE table05 ADD TEMPORARY PARTITION tp01 VALUES [("2021-12-01"), ("2021-12-02"));

查看table05中的临时分区情况：

> show temporary partitions from table05;

导入数据到临时分区的语句也和普通分区的一样，只有分区关键词不同，例如：

> **Insert into：**
>
> INSERT INTO tbl TEMPORARY PARTITION(tp1, tp2, ...) SELECT ....
>
> **Stream Load：**
>
> curl --location-trusted -u root: -H "label:123" -H "temporary_partitions: tp1, tp2, ..." ……
>
> **Broker Load：**
>
> LOAD LABEL example_db.label1
>
> (
>
> DATA INFILE("hdfs://hdfs_host:hdfs_port/user/data/input/file")
>
> INTO TABLE `my_table`
>
> TEMPORARY PARTITION (tp1, tp2, ...)
>
> …………
>
> **Routine Load：**
>
> CREATE ROUTINE LOAD example_db.test1 ON example_tbl
>
> COLUMNS(k1, k2, k3, v1, v2, v3 = k1 * 100),
>
> TEMPORARY PARTITIONS(tp1, tp2, ...)
> …………

查询临时分区：

> SELECT ... FROM
>
> tbl1 TEMPORARY PARTITION(tp1, tp2, ...)
>
> JOIN
>
> tbl2 TEMPORARY PARTITION(tp1, tp2, ...)
>
> ON ...
>
> WHERE ...;

删除table05的临时分区tp01（不会影响正式分区的数据）：

> ALTER TABLE table05 DROP TEMPORARY PARTITION tp01;

创建临时分区主要还是为了服务正式分区，在对临时分区处理完成后，我们还可以用一个或多个临时分区来替换表中的一个或多个正式分区。

举个例子，我们创建临时分区tp02，并设置该分区为单副本，分桶数为8：

> ALTER TABLE table05 ADD TEMPORARY PARTITION tp02 VALUES LESS THAN("2021-12-20")
>
> ("replication_num" = "1")
>
> DISTRIBUTED BY HASH(`order_id`) BUCKETS 8;

因为前面已经删除了tp01，那么临时分区tp02的时间范围应为左闭右开的：[0000-01-01 , 2021-12-20)，通过show temporary partitions语句确认后也确实如此。

导入数据：

> insert into table05 temporary partition(tp02) values('2021-09-29',20210707001,01,100,10086,'lm',9,23,98,2);

查看临时分区数据：

> SELECT * FROM table05 TEMPORARY PARTITION(tp02);

如果我们想用调整过分桶数和副本数的临时分区tp02来替换table05中的正式p20210929和p20210930，写法为：

> ALTER TABLE table05 REPLACE PARTITION (p20210929,p20210930) WITH TEMPORARY PARTITION (tp02)
>
> PROPERTIES (
>
>   "strict_range" = "false",
>
>   "use_temp_partition_name" = "true"
>
> );

这里解释一下strict_range和use_temp_partition_name的概念。

strict_range：默认为true。对于Range分区，当该参数为true时，表示要被替换的所有正式分区的范围并集需要和替换的临时分区的范围并集完全相同。当置为 false 时，只需要保证替换后，新的正式分区间的范围不重叠即可。上面的例子中因为范围不相同，我们设为了false。

use_temp_partition_name：默认为false。当该参数为false，并且待替换的分区和替换分区的个数相同时，替换后的正式分区名称维持不变。如果为true，或待替换分区与替换分区的个数不相同，则替换后，正式分区的名称为替换分区的名称。在上面的例子中，因为待替换分区和替换分区的个数不相同，所以此时table05中的正式分区的名称变为tp02。

分区替换成功后，被替换的分区将被删除，且不可恢复。

此时查看table05表的数据，会发现已经是刚才临时分区中的数据：

> SELECT * FROM table05;

查看正式分区，会发现正式分区名称为tp02：

> SELECT partitions FROM table05;

临时分区和其他操作的关系：

- DROP

使用Drop操作直接删除数据库或表后，可以通过Recover命令恢复数据库或表（限定时间内），但临时分区不会被恢复。

使用Alter命令删除正式分区后，可以通过Recover命令恢复分区（限定时间内）。操作正式分区和临时分区无关。

使用Alter命令删除临时分区后，无法通过 Recover 命令恢复临时分区。

- TRUNCATE

使用Truncate命令清空表，表的临时分区会被删除，且不可恢复。

使用Truncate命令清空正式分区时，不影响临时分区。

不可以使用Truncate命令清空临时分区。

- ALTER

当表存在临时分区时，无法使用Alter命令对表进行 Schema Change、Rollup 等变更操作。

当表在进行变更操作时，无法对表添加临时分区。



## link

- StarRocks表设计--分区分桶与副本数 https://copyfuture.com/blogs-details/202201042325565788
