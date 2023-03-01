## 描述

JPA3中，Hibernate版本升级为6，一些用于自定义数据类型的注解被移除：
```
@TypeDef

@TypeDefs

@CollectionId#type

@AnyMetaDef#metaType

@AnyMetaDef#idType
```

如果有自定义数据类型可以使用UserType/AttributeConverter。


## 链接

- Hibernete https://docs.jboss.org/hibernate/orm/6.0/userguide/html_single/Hibernate_User_Guide.html#basic

