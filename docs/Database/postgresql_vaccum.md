## 描述

### postgresql为什么需要vaccum机制？
postgresql通过MVCC机制实现事务隔离，旧的数据通过标记来实现逻辑清除，这会导致数据膨胀。vaccum能够回收死行（不一定释放空间），同时清除高于水位线（理解就是记录最大数）的死行（释放空间），另外PG存在事务ID环绕问题，vaccum在回收的同时，也解决此问题。

PG10之前需要手动执行vaccum命令，从PG11开始可以使用autovaccum进行自动回收。

vaccum不影响表的使用，但full vaccum会锁表，因此一般让系统自动使用autovaccum。


## 链接
- 《postgresql》 https://www.postgresql.org/docs/current/sql-vacuum.html
- 《Understanding of Bloat and VACUUM in PostgreSQL》https://www.percona.com/blog/basic-understanding-bloat-vacuum-postgresql-mvcc/
- 《PostgreSQL Vacuuming to Optimize Database Performance and Reclaim Space》https://www.percona.com/blog/postgresql-vacuuming-to-optimize-database-performance-and-reclaim-space/