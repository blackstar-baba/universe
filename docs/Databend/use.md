## 描述
简单使用


### 前提
- 安装`databend`

### 命令行
- 下载命令行客户端使用
```

```

### SQL客户端
```
```

### 使用
```sql
create database test;

use test;

create table user (
    username varchar(90) not null
);

# insert into user values('abc');

create view user_view as select * from user;

# select * from user_view;

``` 

## 链接
- 官方程序下载 https://docs.databend.com/download
- 