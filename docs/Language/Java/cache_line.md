## 描述
CPU会将数据从缓存中进行多级加载，每次按行加载，通常一行为64B，也有32B和128B情况，需要查看CPU具体信息，示例：
```
cat /proc/cpuinfo
....
cache_alignment	: 64
....
```

缓存行对齐可以解决伪共享问题（多个线程修改的数据在同一缓存行中），以下是在Centos7.4服务器（OpenJDK1.8，CPU缓存对齐为64B），示例：
```
/**
 * CPU缓存行长度为一般是64Bytes
 * mac系统使用如下命令可查看 `sysctl machdep.cpu.cache.linesize`
 */
public class CpuCacheLineTest {
    private static class T {
        private volatile long value;
        // 注释此行观察缓存行效果
        // private volatile long a, b, c, d, e, f, g;
    }


    public static void main(String[] args) throws Exception {
        final T t1 = new T();
        final T t2 = new T();

        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 100000000; i++) {
                t1.value = i;
            }
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 100000000; i++) {
                t2.value = i;
            }
        });

        long startTime = System.currentTimeMillis();
        thread1.start();
        thread2.start();
        thread1.join();
        thread1.join();
        System.out.println("cost time:" + (System.currentTimeMillis() - startTime) + "ms");
    }
}

```
注释前后的执行时间差别：
```
// 注释前
[root@server-13178 tmp]# java CpuCacheLineTest
cost time:160ms
[root@server-13178 tmp]# java CpuCacheLineTest
cost time:155ms
[root@server-13178 tmp]# java CpuCacheLineTest
cost time:157ms
[root@server-13178 tmp]# java CpuCacheLineTest
cost time:162ms

// 注释后
[root@gs-server-13178 tmp]# java CpuCacheLineTest
cost time:526ms
[root@gs-server-13178 tmp]# java CpuCacheLineTest
cost time:555ms
[root@gs-server-13178 tmp]# java CpuCacheLineTest
cost time:472ms
[root@gs-server-13178 tmp]# java CpuCacheLineTest
cost time:516ms
[root@gs-server-13178 tmp]# java CpuCacheLineTest
cost time:548ms
[root@gs-server-13178 tmp]# java CpuCacheLineTest
cost time:512ms
```

从JDK8开始，提供了注解`sun.misc.Contended` 解决伪共享问题，示例：
```
@sun.misc.Contended
public class T {}
```


## 链接
- 缓存行对齐 https://blog.csdn.net/weixin_45702700/article/details/114188435