## description

"Hash join algorithm ssuffer from extensive CPU cache stalls. The standard hash join algorithm for disk-oriented databases spends over 73% of its user time stalled on CPU cache misses" 

HashJoin 的主要性能影响因素是 Cache Miss, 其次是计算开销(代码分支预测, Hash 函数计算, Key 值比较) 

当前学术界和工程实现主要是从下面两个点出发来优化 HashJoin 性能: 

- 减少 Cache Miss 

- 减少分支判断和分支预测失败 

## link

- Hash Join in Mysql https://dev.mysql.com/blog-archive/hash-join-in-mysql-8/

- Hash Table https://en.wikipedia.org/wiki/Hash_table

- Improving Hash Join Performance through Prefetching https://kilthub.cmu.edu/articles/journal_contribution/Improving_Hash_Join_Performance_through_Prefetching/6606389/1

