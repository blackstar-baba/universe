
## description


- 物化视图
  - 开关 
    - Add fe config for mv (#5566)
  - 创建
    - [Feature] [MaterializedView] Modify CreateMaterializedViewStmt (#5647)
    - [MaterializedView] add PartitionInfo which have expressions [P0] (#6566)
    - [MaterializedView] add create MaterializedView logic [P1] (#6844)
    - [MaterializedView] Partition based on non-existing table throws NPE when creating mv (#7755)
    - add MATERIALIZED_VIEW TableType (#7878)
    - mv map persistence (#8879)
    - add name check logic (#9767)
    - [Feature] Support create mv from mv (#11873) 
  - 删除
    - when failed,do not change lastBackendId (#9062)
    - change mv replicationNum rules (#10294)
    - Forbid creating materialized view using week/quarter/year to refresh (#9465)
    - fix TaskManager initialDelay not correct (#8633) 
    - mv task definition view (#8856)
    - rename class name (#7622)
    - fix broker load ut error (#7648)
    - restrict op materialized view when alter table (#7351)
    - forbid direct ingest to MaterializedView [P2] #4795
    - Partition Prune support expr (#6522)
    - Drop Materialized vied stmt (#4957)
  - 刷新
    - [MaterializedView] add async refresh task for create mv [P0] (#7445)
    - Mv use insert overwrite (#8041)   
  - 问题修复
    - [MaterializedView] fix mv use bugs (#7896) 
    - The table related mv id is not cleared when dropping mv (#7673) 
    - [Bugfix] Fix task type always manual (#8077) 
    - fix ut failed (#8407)
    - [Bugfix] Fix mv partition sync issues (#8501)   
    - [Bugfix] Fix ut unstable (#8572) 
    - [Bugfix] Fix mv task sync partition issues (#8683)
    - [Bugfix] Fix mv version map issues (#8799) 
    - [Bugfix] Fix mv partition by column expection (#9220)
    - [BugFix] fix mv refresh all the time if base table dropped partition (#9286)
    - [Bugfix] fix mv partition refresh all the time if partition roll up (#9305)
    - fix cocurrent (#9424)
    - [Bugfix] There is no data when use cte (#9567)
    - fix typo in debug log(#9992)
    - [Bugfix] Mv not refresh after truncate base table (#9989)
    - Fix the mv of a single partition is always refreshed (#10026)
      
- 查询优化
   - Reorder predicates based on selectivity (#4869)
   - merge join fe （issue:4036） (#4882) 
   - fix merge join repeat generate fragement error (#6861)
  
- 函数扩展
  - Support math function square (#3205)
  - Add bitmap_max & bitmap_min functions (#3293)

- 其他
  - Fix the misspelling of the word "finished" (#2894)
  - Rename CatalogTest to GlobalStateMgrTest (#5673) 
  - use session to get selectLimit (#7444) 
  - [Feature] Convert query statement to sql which use ids (#6915)





## link
 - https://github.com/StarRocks/starrocks/commits?author=blackstar-baba
 - https://github.com/StarRocks/starrocks/commits?author=zddr 
