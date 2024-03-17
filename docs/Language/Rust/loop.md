## 环境
- 系统：macOS 14.1.2
- cargo : 1.75.0 (1d8b05cdd 2023-11-20)

## 正文
loop 顾名思义，就是循环，用于多次执行同一段代码
### 示例一 简单循环
```
fn main() {
    loop {
        println!("again!");
    }
}
``` 
运行结果为`again!`不断地打印,直到停止程序。
### 示例二 循环返回值
```
fn main() {
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("The result is {result}");
}
```
运行结果为`The result is 20`，因为当`counter`增加到`10`时，打断循环，并将`result`的值设置为`counter`*2，也就是`20`。 
### 示例三 环境嵌套处理
```
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;
        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }
        count += 1;
    }
    println!("End count = {count}");
}
```
运行结果为:
```
count = 0
remaining = 10
remaining = 9
count = 1
remaining = 10
remaining = 9
count = 2
remaining = 10
End count = 2
```
首先进入第一层循环，循环的名称为`counting_up`，输出`count`，然后进入到第二层循环,输出`remaining`，每当`remaining`从`10`变为`9`时，中断内层循环，并将`count`的值+1，直到`count`的值变为2时，中断名称为`counting_up`的循环，也就是外层循环。

## 参考
- 官方文档 https://doc.rust-lang.org/book/ch03-05-control-flow.html?highlight=loop#repetition-with-loops