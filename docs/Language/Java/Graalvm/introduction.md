## 描述

GraalVM：Run Programs Faster Anywhere

作为一个高性能全栈虚拟器而存在，与普通的JVM差别主要在即时编译器，普通JVM的即时编译器主要为C1和C2，GraalVM自带Graal编译器，用于替代20年前已经存在的C2。

提供原生模式native-image，但有比较多的限制条件，原生模式包含一个极小型的运行时环境substratevm，包括了独立的异常处理、同步调度、线程管理、内存管理（垃圾收集）和 JNI 访问等组件，目标是替代HotSpot用来支持提前编译后的程序执行。

 
## 链接

-  《凤凰架构》- 新一代即时编译器 https://icyfenix.cn/tricks/2020/graalvm/graal-compiler.html
-  Java 大杀器来了，这玩意也太猛了 https://cloud.tencent.com/developer/article/1943857?from=article.detail.2152328&areaSource=106000.13&traceId=s5e3Mws2I5Rcmn7zfXVba


