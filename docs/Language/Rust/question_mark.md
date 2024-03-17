## 环境
- 系统：macOS 14.1.2
- cargo : 1.75.0 (1d8b05cdd 2023-11-20)

## 正文

### 示例一 错误处理
`？`操作符号在Rust中用于处理错误传播，简化错误处理,可以与Result、Option和其他实现`FromResidual`特征。
```
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
``` 

```
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

### 示例二 Result处理
```
use std::fs::File;

fn main() {
    open_file();
}

fn open_file() {
    let greeting_file = File::open("hello.txt")?;
}
```
运行效果：
```
error[E0277]: the `?` operator can only be used in a function that returns `Result` or `Option` (or another type that implements `FromResidual`)
 --> src/bin/main_question_mark.rs:8:48
  |
7 | fn open_file() {
  | -------------- this function should return `Result` or `Option` to accept `?`
8 |     let greeting_file = File::open("hello.txt")?;
  |                                                ^ cannot use the `?` operator in a function that returns `()`
  |
  = help: the trait `FromResidual<Result<Infallible, std::io::Error>>` is not implemented for `()`
```
提示异常，因为`()`没有实现file.open返回的特性`FromResidual<Result<Infallible, std::io::Error>>`。
有两种方法可以解决此类问题，修改函数`open_file`的返回值，或者使用`match`或其他方法调整`Result<Infallible, std::io::Error>`的输出值

- 方式一
```
fn main() {
    open_file().unwrap();
}

fn open_file() -> Result<File, impl Error>{
   File::open("hello.txt")
}
```
可正常编译，如果存在文件则打开，没有则抛出异常。

- 方式二
```
fn main() {
    open_file();
}

fn open_file() {
    match File::open("hello.txt") {
        Ok(_) => {}
        Err(e) => {
            eprintln!("{}", e.to_string())
        }
    }
}
```
可正常编译，运行结果
```
No such file or directory (os error 2)
```

### 示例三 Option
```
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
```
函数`next`返回Option，如果没有数据则返回，有数据则继续执行后续方法。

## 参考
- 官方文档 https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html?highlight=question%20mark#propagating-errors
