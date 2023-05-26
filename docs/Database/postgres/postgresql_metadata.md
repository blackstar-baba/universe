## 描述

元数据逻辑结构与物理存储研究

### 逻辑数据
pg的核心元数据存储在pg_开头的表中，pg_database, pg_tablespace、pg_attribute、pg_class等，其中pg_class最为核心，可以查到各个实体的相关信息

pg以对象的方式管理各种实体，实体包含数据库、表、索引、序列、视图、函数等，每个实体都有一个唯一的标识符OID。

- 查询数据库元数据
```
postgres=# select oid,datname from pg_database;
  oid  |  datname  
-------+-----------
 12937 | postgres
     1 | template1
 12936 | template0
(3 rows)

```

- 查看数据库表元数据
```
postgres=# select oid ,relname,relfilenode from pg_class where relname = 't1';
  oid  | relname | relfilenode 
-------+---------+-------------
 16384 | t1      |       16384
(1 row)

```
### 物理数据

每创建一个数据库，会在${pgData}/base目录下新建一个对应的文件夹的信息
```
blackstar@blackstar data % tree -L 1 base 
base
├── 1
├── 12936
└── 12937

3 directories, 0 files
```
表数据存储在信息存储在${pgData}/base/databaseOid/tableRelfilenode中，以上面的表`t1`举例，信息存储在${pgData}/base/12937/16384中

TIPS：
- 当表或索引文件大小超过1G时，PG会创建.1的新文件并使用它，以此类推，还会按需创建.2的文件并使用。
- 当表或索引截断（TRUNCATE）时，relfilenode的值会发生变化
- 9.0版本以上，可以通过`select pg_relation_filepath(name/oid)` 直接查找存储路径。
```
postgres=# select pg_relation_filepath('16384');
 pg_relation_filepath 
----------------------
 base/12937/16384
(1 row)

postgres=# select pg_relation_filepath('pg_class');
 pg_relation_filepath 
----------------------
 base/12937/1259
(1 row)

```
- 在数据库文件目录中，还存在以_fsm（free space map）、_vm（visibility map）结尾的文件，分别存储表文件中每个page的可用空间容量和可见性信息，索引只有单独的FSM，没有VM

## 链接

- 《The Internals of PostgreSQL》 https://www.interdb.jp/pg/