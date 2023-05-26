## 描述

在一些黑盒测试中，系统有些内部异常无法使用测试框架捕捉，但系统可以吐出错误日志，因此可以采取捕获错误日志来判断测试失败。

以下是在Junit5 + logback的测试例子：

- 新建日志Appender
```
import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;

import java.util.Vector;

public class TestAppender extends AppenderBase<ILoggingEvent> {
    static Vector<ILoggingEvent> events = new Vector<>();

    @Override
    protected void append(ILoggingEvent e) {
        System.out.println(e.getLevel().equals(Level.ERROR));
        if(e.getLevel().levelStr.equals(Level.ERROR.levelStr)){
            events.add(e);
        }
    }
}
```
- 在测试配置文件中增加Appender
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration>
<configuration scan="true" scanPeriod="10 seconds">

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{ISO8601} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <!-- 增加appender -->
    <appender name="TEST" class="com.roc.rule.engine.TestAppender">

    </appender>

    <logger name="com.roc" level="INFO"/>

    <logger name="io.r2dbc.postgresql.PARAM" level="DEBUG"/>
    <logger name="io.r2dbc.postgresql.QUERY" level="DEBUG"/>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
        <!-- 关联appender -->
        <appender-ref ref="TEST" />
    </root>


</configuration>
```

- 在测试用例中增加如下代码：
```
Assertions.assertEquals(0 ,TestAppender.events.size());
```

PS：
在对异步执行程序的测试用例中可能不太奏效，因为错误可能发生在Assertions之后。

## 链接
- https://stackoverflow.com/questions/29076981/how-to-intercept-slf4j-with-logback-logging-via-a-junit-test
