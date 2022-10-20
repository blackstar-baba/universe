## description

分支预测是现代CPU中具有的一项功能，用来优化指令执行效率，但当分支预测错误时，将会受到惩罚：处理器必须丢弃错误预测后完成的工作，然后重新开始。

```
 public static void main(String[] args)
    {
        // Generate data
        int arraySize = 32768;
        int data[] = new int[arraySize];

        Random rnd = new Random(0);
        for (int c = 0; c < arraySize; ++c)
            data[c] = rnd.nextInt() % 256;

        // !!! With this, the next loop runs faster
        Arrays.sort(data);

        // Test
        long start = System.nanoTime();
        long sum = 0;

        for (int i = 0; i < 100000; ++i)
        {
            // Primary loop
            // Branch Mispredicts 分支预测
            for (int c = 0; c < arraySize; ++c)
            {
                if (data[c] >= 128)
                    sum += data[c];
            }
        }

        System.out.println((System.nanoTime() - start) / 1000000000.0);
        System.out.println("sum = " + sum);
    }
```

排序后进行判断求和，效率会更高。

## link

- why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array https://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-processing-an-unsorted-array
- CPU分支预测 https://segmentfault.com/a/1190000006889989
- Making Your Code Faster by Taming Branches https://www.infoq.com/articles/making-code-faster-taming-branches/

