
## 描述

JDK 多个版本的核心变化清单：

###  JDK 9
**模块化**
模块化提供了比 package 更高级别的聚合，模块是一个包的容器。模块的代码被组织成多个包，每个包中包含Java类和接口；如果我们想让项目成为一个模块，则需要在该项目的java源码的根目录(如果是maven项目也就是src/main/java)添加一个特殊的java文件模块描述符文件 module-info.java，以jdk 里java.sql 模块为例：
```
/**
 * Defines the JDBC API.
 *
 * @uses java.sql.Driver
 *
 * @moduleGraph
 * @since 9
 */
// 声明模块
module java.sql {

    // 声明依赖模块, transitive修饰符会导致依赖于当前模块的其他模块具有隐式依赖性。
    requires transitive java.logging;
    requires transitive java.transaction.xa;
    requires transitive java.xml;

    // 声明哪些包是可以被其它模块访问
    exports java.sql;
    exports javax.sql;

    // 使用语句（uses statement）和提供语句（provides statement）实现其服务
    // 使用语句可以指定服务接口的名字，当前模块就会发现它，使用 java.util.ServiceLoader类进行加载
    uses java.sql.Driver;
}
```
**接口支持私有方法**
JDK 9 为我们带来了接口的默认方法。接口现在也可以包含行为，而不仅仅是方法签名。JDK 9支持了私有方法，可以解决接口中代码复用问题；该特性主要是为了Java 8中default方法和static方法服务的。
```
public interface TestInterface{
    
    default void method(){ init(); }
    
    default void anotherMethod(){ init(); }
        
    private void init(){ System.out.println("Initializing");}
}
```
**新增Stream API & 集合工厂方法**
JDK 9 为 Stream 新增了几个方法：dropWhile、takeWhile、ofNullable，为 iterate 方法新增了一个重载方法。
- takeWhile
takeWhile 方法使用一个断言作为参数，返回给定 Stream 的子集直到断言语句第一次返回 false。如果第一个值不满足断言条件，将返回一个空的 Stream。
```
// 输出 => abc
Stream.of("a","b","c","","e","f").takeWhile(s->!s.isEmpty())
         .forEach(System.out::print);
```      
- dropWhile
dropWhile 方法和 takeWhile 作用相反的，使用一个断言作为参数，直到断言语句第一次返回 true 才返回给定 Stream 的子集。
```
// 输出 => ef
Stream.of("a","b","c","","e","f").dropWhile(s-> !s.isEmpty())
         .forEach(System.out::print);
```
- ofNullable
ofNullable 方法可以预防 NullPointerException 异常， 可以通过检查流来避免 null 值。
```
// 输出 => 0
System.out.println(Stream.ofNullable(null).count());
```
- 集合工厂方法
```
// 通过java.util.Set 创建 不可变 的集合实例
Set<String> set = Set.of("A", "B", "C");

// 通过java.util.List 创建 不可变 的集合实例
List<String> list = List.of("A", "B", "C");

// 通过k1,v1,k2,v2,...,形式创建
Map<String, String> map = Map.of("A","V1","B","v2","C","v3");

// 通过 Map.entry 形式创建
Map<Integer, String> map1 = Map.ofEntries (
    Map.entry(1, "v1"),
    Map.entry(2, "v2"),
    Map.entry(3, "v3"));
```
**改进版 Try-With Resources**
try-with-resources 是 JDK 7 中一个新的异常处理机制，它能够很容易地关闭在 try-catch 语句块中使用的资源。try-with-resources 声明在 JDK 9 已得到改进。如果你已经有一个资源是 final 或等效于 final 变量,您可以在 try-with-resources 语句中使用该变量，而无需在 try-with-resources 语句中声明一个新变量。
 static String readData(String message) throws IOException {
      Reader reader = new StringReader(message);
      BufferedReader br = new BufferedReader(reader);
     // 不需要重新声明变量
      try (br) {
         return br.readLine();
      }
  }
**G1 成为默认垃圾收集器**
在 Java 8 的时候，默认垃圾回收器是 Parallel Scavenge（新生代）+Parallel Old（老年代）。到了 Java 9, CMS 垃圾回收器被废弃了，G1（Garbage-First Garbage Collector） 成为了默认垃圾回收器。G1 是在 Java 7 中被引入的，经过两个版本优异的表现成为成为默认垃圾回收器。


### JDK11
**APPCDS 应用程序类数据共享**
CDS 的全称是 Class-Data Sharing, CDS 的作用是让类可以被预处理放到一个归档文件中，后续 Java 程序启动的时候可以直接带上这个归档文件，这样 JVM 可以直接将这个归档文件映射到内存中，以节约应用启动的时间。这个特性在 JDK 1.5 就开始引入, 但是 CDS 只能作用与 Boot Class Loader 加载的类，不能作用于 App Class Loader 或者自定义的 Class Loader 加载的类。在 JDK 10 中， CDS 扩展为 AppCDS，AppCDS 不止能够作用于 Boot Class Loader，App Class Loader 和自定义的 Class Loader 也都能够起作用，进一步提高了应用启动性能。
**多线程并行 GC**
在JDK9中G1被选定为默认的垃圾收集器，G1的设计目标是避免发生Full GC，由于Full GC较难产生所以在设计之初只有Young GC和Mixed GC是并行的，而Full GC是单线程使用标记-清理-合并算法进行垃圾回收。G1只是避免发生Full GC，在极端情况下，当G1的回收速度相对于产生垃圾的速度不是足够快时，就会发生Full GC。
为了最大限度地减少 Full GC 造成的应用停顿的影响，从 JDK 10开始，G1 的 FullGC 改为并行的标记清除算法，同时会使用与年轻代回收和混合回收相同的并行工作线程数量，从而减少了 Full GC 的发生，以带来更好的性能提升、更大的吞吐量
线程的数量可以由 -XX:ParallelGCThreads 选项来控制，这个参数也用来控制Young GC和Mixed GC的线程数。
**局部变量类型推断**
JDK10 可以使用var作为局部变量类型推断标识符，此符号仅适用于局部变量，增强for循环的索引，以及传统for循环的本地变量；它不能使用于方法形式参数，构造函数形式参数，方法返回类型，字段，catch形式参数或任何其他类型的变量声明。
```
var list = new ArrayList<String>();
list.add("hello，world！");
System.out.println(list);
```
反编译后是这样的
```
ArrayList<String> list = new ArrayList();
list.add("hello，world！");
System.out.println(list);
```
从示例中可以看出，var 其实是一种语法糖，旨在改善开发者体验

**线程-局部管控**
这是在 JVM 内部相当低级别的更改，现在将允许在不运行全局虚拟机安全点的情况下实现线程回调。这将使得停止单个线程变得可能和便宜，而不是只能启用或停止所有线程。

**基于Java的实验性JIT编译器Graal**
Graal 是一个以 Java 为主要编程语言，面向 Java bytecode 的编译器。与用 C++ 实现的 C1 及 C2 相比，它的模块化更加明显，也更加容易维护。Graal 既可以作为动态编译器，在运行时编译热点方法；亦可以作为静态编译器，实现 AOT 编译。在 JDK 10 中，Graal 作为试验性 JIT compiler 一同发布

### JDK11
String 增强
JDK 11 增加了一系列的字符串处理方法：
```
// 判断字符串是否为空
" ".isBlank(); // true
// 去除字符串首尾空格
" JDK11 ".strip();// "JDK11"
// 去除字符串首部空格
" JDK11 ".stripLeading();   // "JDK11 "
// 去除字符串尾部空格
" JDK11 ".stripTrailing();  // " JDK11"
// 重复字符串多少次
"JDK11 ".repeat(3);             // "JDK11 JDK11 JDK11 "
// 返回由行终止符分隔的字符串集合
"A\nB\nC".lines().count();    // 3
```

**支持TLS 1.3 协议**
实现TLS协议1.3版本, 替换了之前版本中包含的 TLS，包括 TLS 1.2，同时还改进了其他 TLS 功能, 在安全性和性能方面也做了很多提升

**HTTP Client**
在 JDK 11 中 Http Client API 得到了标准化的支持。且支持 HTTP/1.1 和 HTTP/2 ，也支持 websockets。
使用起来也很简单，如下：
```
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(uri))
    .build();
// 异步
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println)
    .join();

// 同步
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
```

**Epsilon：低开销垃圾回收器**
新增的垃圾回收器，一个完全消极的 GC 实现，分配有限的内存资源，最大限度的降低内存占用和内存吞吐延迟时间

**飞行记录器：JFR**
Java飞行记录器(Java Flight Recorder)已经变成JDK 11的一部分了，之前它是一个商业功能，但是伴随JDK 11发布，它从OracleJDK开源到了OpenJDK。
飞行记录器类似飞机上的黑盒子，是一种低开销的事件信息收集框架，主要用于对应用程序和 JVM 进行故障检查、分析。飞行记录器记录的主要数据源于应用程序、JVM 和 OS，这些事件信息保存在单独的事件记录文件中，故障发生后，能够从事件记录文件中提取出有用信息对故障进行分析

### JDK12-14
**G1 收集器优化**
JDK 12 为垃圾收集器 G1 带来了两项更新
- 可中止的混合收集集合 ：为了达到用户提供的停顿时间目标，通过把要被回收的区域集（混合收集集合）拆分为强制和可选部分，使 G1 垃圾回收器能中止垃圾回收过程。G1 可以中止可选部分的回收以达到停顿时间目标。
- 及时返回未使用的已分配内存 ：由于 G1 尽量避免完整的 GC，并且仅基于 Java 堆占用和分配活动来触发并发周期，因此在许多情况下，除非从外部强制执行，否则它不会返还 Java 堆内存。JDK 12增强了 G1 GC，可以在空闲时自动将 Java 堆内存返回给操作系统。

**SocketAPI 重构**
java.net.Socket 和 java.net.ServerSocket 类早在 Java 1.0 时就已经引入了，它们的实现的 Java 代码和 C 语言代码的混合，维护和调试都十分不易；而且这个实现还存在并发问题，有时候排查起来也很困难。JDK 13 将 Socket API 的底层进行了重写，并且在 JDK 13 中是默认使用新的 Socket 实现, 使其易于排查问题，同时也增加了可维护性。

**动态 CDS 存档**
JDK 13 中对 JDK 10 中引入的应用程序类数据共享(AppCDS)进行了进一步的简化、改进和扩展，即：允许在 Java 应用程序执行结束时动态进行类归档，具体能够被归档的类包括所有已被加载，但不属于默认基层 CDS 的应用程序类和引用类库中的类。这提高了应用程序类数据共享AppCDS的可用性。

**增强 switch**
增强版 switch 在 JDK 12 作为预览特性引入。在 JDK 14 之后，增强版 switch 语句块具备返回值
```
String result = switch (day) {
            case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "工作日";
            case "weekend" -> "周末";
            default -> {
                // yield 关键字 yield的是JDK13后的一个新特性，它主要的作用是进行程序的局部返回
                yield "unknown";
            }

        };
System.out.println(result);
```
**移除 CMS 垃圾收集器**
移除了 CMS(Concurrent Mark Sweep) 垃圾收集器（功成而退）

### JDK15-16
**文本块**
JDK 15正式发布文本块功能， 用来解决多行文本的问题，文本块以三重双引号开头，并以同样的以三重双引号结尾终止
示例:
```
String content = """
    JDK 10
    JDK 11
    JDK 12
 """;
System.out.println(content);
输出：
JDK 10
JDK 11
JDK 12
```
**Hidden Classes（隐藏类）**
此功能可帮助需要在运行时生成类的框架。框架生成类需要动态扩展其行为，但是又希望限制对这些类的访问。隐藏类很有用，因为它们只能通过反射访问，而不能从普通字节码访问。此外，隐藏类可以独立于其他类加载，这可以减少框架的内存占用。
**instanceof 模式匹配**
之前使用instanceof 进行类型判断之后，需要进行对象类型转换后才能使用。而在 JDK 16 中，可以在判断类型时指定变量名称进行类型转换，方便了使用。
```
// JDK 16之前
if (obj instanceof String) {
    // 强制转换后使用
    String str = (String)o;
    ... use str ...
}

// JDK 16
if (o instanceof String str) {
    // 直接使用str变量
    ... use s ...
}
```
**记录类**
record 是一种全新的类型，它本质上是一个 final 类，同时所有的属性都是 final 修饰，或者可看成是 Lombok 中 @Data 注解的一个 "低配" 替代。它会自动编译出 getXXX、toString、 hashcode 、equals等方法，减少了代码编写量。
```
// 定义记录类
public record Person(String name, Integer age) {
}

// ======

// 使用
Person person = new Person("张三", 16);
System.out.println(person);
```
**ZGC 并发线程堆栈处理**
ZGC是JDK 11引入的新的垃圾收集器，JDK 15 正式发布成正式特性，ZGC是一个重新设计的并发的垃圾回收器，可以极大的提升GC的性能。支持任意堆大小而保持稳定的低延迟（10ms以内），性能非常可观。
JDK 16将 ZGC 线程栈处理从安全点转移到一个并发阶段，甚至在大堆上也允许在毫秒内暂停 GC 安全点。消除 ZGC 垃圾收集器中最后一个延迟源可以极大地提高应用程序的性能和效率。

### JDK17
**增强的伪随机数生成器**
JDK 17 之前，我们可以借助 Random、ThreadLocalRandom和SplittableRandom来生成随机数。不过，这 3 个类都各有缺陷，且缺少常见的伪随机算法支持。
JDK 17 为伪随机数生成器 （pseudorandom number generator，RPNG，又称为确定性随机位生成器）增加了新的接口类型和实现，使得开发者更容易在应用程序中互换使用各种 PRNG 算法。
```
使用示例：
RandomGeneratorFactory<RandomGenerator> l128X256MixRandom = RandomGeneratorFactory.of("L128X256MixRandom"); 
// 使用时间戳作为随机数种子
RandomGenerator randomGenerator = l128X256MixRandom.create(System.currentTimeMillis());
// 生成随机数
randomGenerator.nextInt(10));
```
**密封类**
密封类可以是封闭类和或者封闭接口，用来增强 Java 编程语言，防止其他类或接口扩展或实现它们。这个特性由JDK 15的预览版本在JDK 17晋升为正式版本。
密封类引入了sealedclass或interface，这些class或者interfaces只允许被指定的类或者interface进行扩展和实现。使用修饰符sealed，可以将一个类声明为密封类。密封的类使用关键字permits列出可以直接扩展它的类。子类可以是最终的，非密封的或密封的。
```
// 比如现在要限制 Person类 只能被这三个类继承，不能被其他类继承，可以这么做
// 添加sealed修饰符，permits后面跟上只能被继承的子类名称
public sealed class Person permits Teacher, Worker, Student{ } //人
 
// 子类可以被修饰为 final
final class Teacher extends Person { }//教师
 
// 子类可以被修饰为 non-sealed，此时 Worker类就成了普通类，谁都可以继承它
non-sealed class Worker extends Person { }  //工人
// 任何类都可以继承Worker
class AnyClass extends Worker{}
```
**移除实验性的 AOT 和 JIT 编译器**
实验性的基于 Java 的提前 (AOT) 和即时 (JIT) 编译器是实验性功能，并未得到广泛采用。作为可选，它们已经从 JDK 16 中删除。这个 JEP 从 JDK 源代码中删除了这些组件。

**删除 Applet API**
Applet 是使用 Java 编写的可以嵌入到 HTML 中的小应用程序，嵌入方式是通过普通的 HTML 标记语法，由于早已过时，几乎没有场景在使用了。Applet API 在 JDK 9 时已经标记了废弃，现在 JDK 17 中彻底删除

## 链接

- 《升级指南之JDK 11+ 新特性和AJDK》 https://mp.weixin.qq.com/s/4YtXx1JVsCdGoExpF8Se3Q