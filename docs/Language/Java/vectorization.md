## description



code like this:

```
/**
 *使用此命令运行以显示本机程序集：<br/>
 * Java -XX:+UnlockDiagnosticVMOptions
 * -XX:CompileCommand=print,VectorizationMicroBenchmark.square
 * VectorizationMicroBenchmark
 */
public class VectorizationMicroBenchmark {

    private static void square(float[] a) {
        for (int i = 0; i < a.length; i++) {
            a[i] = a[i] * a[i]; // line 11
        }
    }

    public static void main(String[] args) throws Exception {
        float[] a = new float[1024];

        // repeatedly invoke the method under test. this
        // causes the JIT compiler to optimize the method
        for (int i = 0; i < 1000 * 1000; i++) {
            square(a);
        }
        //vm options
        //-XX:+UnlockDiagnosticVMOptions -XX:+DebugNonSafepoints  -XX:CompileCommand=print,VectorizationMicroBenchmark.square
        // vmulps Parallel Scalar 平行标量
        // vmulss Single Scalar 单标量
    }

}

```


## link

- demo: http://daniel-strecker.com/blog/2020-01-14_auto_vectorization_in_java/#Output%20Interpretation
- hsdis: https://github.com/liuzhengyang/hsdis
