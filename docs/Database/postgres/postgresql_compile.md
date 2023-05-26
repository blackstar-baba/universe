

### 前提
- 基于x86_64位centos7.4进行编译

以编译12.14为例：
```
yum -y install readline readline-devel

wget https://ftp.postgresql.org/pub/source/v12.14/postgresql-12.14.tar.bz2
tar xjvf postgresql*.bz2 #解压至一个目录
cd potgresql-12.14
./configure --prefix=/opt/pgsql #拟安装至/opt/pgsql
make world
make install-world
adduser postgres #增加新用户，系统提示要给定新用户密码
mkdir /opt/pgsql/data #创建数据库目录
chown -R postgres:postgres /opt/pgsql/data
su - postgres #使用postgres帐号操作
/opt/pgsql/bin/initdb -D /opt/pgsql/data #初始化数据库
/opt/pgsql/bin/pg_ctl -D /opt/pgsql/data -l logfile start #启动数据库
/opt/pgsql/bin/createdb genericdb #假定数据库名为gerericdb)
/opt/pgsql/bin/psql genericdb # (进入数据库内部)
```




### 异常

- Q:在configure阶段，提示`configure: error: readline library not found`, 
- A:安装`readline-devel`