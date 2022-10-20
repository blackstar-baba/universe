## description

小碎片驱动并行，将任务的数据拆分为大小合适、可动态调整的段（segement），然后按照流水线（pipeline）的方式执行操作。另外，一个DIspatcher负责根据任务执行的一些状态、硬件NUMA的一些解决来合分发任务。还有就是一些优化的Hash Join、分区和排序等的算法。

## link

- En https://15721.courses.cs.cmu.edu/spring2016/papers/p743-leis.pdf

- Cn https://nan01ab.github.io/2018/05/Morsel-Driven-Parallelism.html

