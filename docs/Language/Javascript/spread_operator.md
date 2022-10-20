## description

- 名称：spread
- 操作符：`...`
- 说明：**ES6**中引入了延展操作运算符（...），延展操作运算符将可迭代的对象扩展为其单独的元素，可迭代对象是可以使用 for 循环进行循环的任何对象，可迭代的示例：Array，String，Map，Set，DOM节点。

### demo

- Object Copy

```
let user = {name : "John", age : 20 }
let userCopy = {...user}
```

- Object merge

```
let user1 = {name : "John", age : 20 };
let user2 = {name : "Ram", salary: '20K' };
let userCopy = {...user1, ...user2};
userCopy ; // {name : "Ram", age :20 , salary : '20K'};
```



## link

- https://www.cnblogs.com/xiaonian8/p/13690934.html

- https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
