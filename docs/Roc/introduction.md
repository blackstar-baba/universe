## 描述

### todo
- [x] 拆分common
- [x] 拆分transport,native化
- [x] 拆分core，native化
- [x] 形成monolith，native化
- [ ] device state center 
- [x] 引入时序数据库
- [x] 加入规则引擎 working on
  - [ ] 租户隔离
- [x] 整理common
- [x] 拆分rule-engine 
- [ ] transport-api抽取
- [ ] AI intergration (device connect\module)
- [ ] all table add tenantId
- [ ] add test case
  - [x] add framework and first
  - [x] rule-engine 主体流程跑通
  - [ ] dao
- [ ] rule engine rebuild 
- [x] device
- [ ] rule chain
  - [x] 表结构重构，当前需要rule_chain、rule_node 以及relation进行储存，rule_chain存储规则链基础信息,rule_node以及relation存储规则链内容
  - [ ]
  - [ ] 
- [x] tenant 
- [x] fix native image dao -> repository NPE，其实是一个多maven项目的坑， 必须先将依赖包进行clean install后native build，当前spring aot支持，构造函数以及@Autowired，不支持@Resource
  


- 2月23，core+transport形成的monilith可以联通
- 4月29，core+transport+ruleengine可以跑通


### 提案

- [x] 聚焦在什么业务？ Device Manage管理
- [x] JPA to MyBatis? 
- [x] 全面 React do this
- [ ] in-tree协议，mqtt over tcp/quic

### 问题
- [x] spring r2dbc ScriptUtils不支持$$,需要将$$替换成',如果要支持$$，需要手动获取connection后执行，e.g.
```
// block获取，原因是Mono处理线程不在本线程中。
 Connection connection = ConnectionFactoryUtils.doGetConnection(connectionFactory).block();
System.out.println(connection);
if(connection != null) {
    connection.close();
}
```


## 链接



