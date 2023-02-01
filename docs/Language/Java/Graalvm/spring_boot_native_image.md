## 描述


### 一些坑

- 使用`start.spring.io`生成的默认工程使用native-maven-plugin插件，编译命令必须使用
```
mvn -Pnative native:compile
```
否则会提示找不到文件，类似如下错误：
```
java.lang.IllegalArgumentException: Could not find class [com.cib.roc.RocApplication__ApplicationContextInitializer]
        at org.springframework.util.ClassUtils.resolveClassName(ClassUtils.java:333) ~[na:na]
        at org.springframework.context.aot.AotApplicationContextInitializer.instantiateInitializer(AotApplicationContextInitializer.java:80) ~[me:6.0.4]
        at org.springframework.context.aot.AotApplicationContextInitializer.initialize(AotApplicationContextInitializer.java:71) ~[me:6.0.4]
        at org.springframework.context.aot.AotApplicationContextInitializer.lambda$forInitializerClasses$0(AotApplicationContextInitializer.java:61) ~[me:6.0.4]
        at org.springframework.boot.SpringApplication.applyInitializers(SpringApplication.java:603) ~[me:3.0.2]
        at org.springframework.boot.SpringApplication.prepareContext(SpringApplication.java:383) ~[me:3.0.2]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:307) ~[me:3.0.2]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:1302) ~[me:3.0.2]
        at org.springframework.boot.SpringApplication.run(SpringApplication.java:1291) ~[me:3.0.2]
        at com.cib.roc.RocApplication.main(RocApplication.java:10) ~[me:na]
```
原因是只有使用profile native 进行compile时才会生成。


- 编译过程中提升找不到
 
## 链接
- spring-boot native-image https://docs.spring.io/spring-boot/docs/3.0.2/reference/html/native-image.html#native-image.developing-your-first-application.native-build-tools



