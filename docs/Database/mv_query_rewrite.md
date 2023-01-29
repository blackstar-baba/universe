## 描述

### 改写方式
通常改写有三种方式：
- 基于语法的改写 文本匹配或者语法匹配是最简单的改写方法，将查询的文本与物化视图的文本或语法树进行比较，完全匹配可以进行改写
- 基于规则的改写 基于规则的改写和其他优化器规则相同，针对不同 Pattern 的查询和视图编写不同的规则，寻找等价的替代关系树。
- 基于结构的改写 基于结构的改写与基于规则的改写相反，通过提取查询中的特征，使用一套规则进行匹配改写。优化器将查询表示为 SPJG 标准形式 (Join-Select-Project-GroupBy)，提取查询中的 Join，Projects，Filters，Grouping 和 Aggregations 五种表达式，分别与物化视图对应的表达式进行匹配和改写。
这个方法是由微软在 2001 年 SIGMOD 论文《Optimizing queries using materialized views: A practical, scalable solution》系统化的提出。这种方法可以改写包含可以改写包含 Join，Filter，Project 的任意查询的方法，运用一系列的步骤匹配并得到补偿表达式。还可以进一步改写含有 Aggreagtion 的查询，在需要时添加 Aggregation 节点返回进一步汇总的结果。

## 链接
- https://segmentfault.com/a/1190000039873388?utm_source=sf-similar-article