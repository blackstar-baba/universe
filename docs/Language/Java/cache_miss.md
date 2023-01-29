## description

观察Cache miss（缓存缺失现象）

- 对于处理并行任务的应用程序，如果生产者和消费者之间的共享内存超过 ~8MB，由于缓存未命中效应，它可能会影响应用程序的性能。
- 对于规则引擎这样的用例，可能会发生这种情况： 所有传入的请求都根据预定义的规则进行验证，并且这些规则会随着时间的推移而增长，超过 8 MB 的限制。
- 当线程之间的共享内存超过 ~8 MB 时，用单线程处理内存中的任务比用多线程处理任务有更好的性能。
- 大小（~8 MB）可以根据处理器改变

```
public class CacheMiss {

	public static void main(String[] args) throws InterruptedException, ExecutionException {

		List<Integer> intList = new ArrayList<>();
		for (int i = 0; i < 10000000; i++) {
			intList.add(i);
		}
		System.out.println("Main Thread : " + Thread.currentThread().getName());
		// 在同一个线程中执行随机操作
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		
		//在不同线程中执行随机操作
		runAsync(intList, 1);
		runAsync(intList, 2);
		runAsync(intList, 3);
		runAsync(intList, 4);
		runAsync(intList, 5);

		TimeUnit.MINUTES.sleep(1);

	}

	private static void runAsync(List<Integer> intList, int t) {
		CompletableFuture.runAsync(() -> {
			System.out.println("new thread - " + t + " : " + Thread.currentThread().getName());
			long s = System.currentTimeMillis();
			List<Integer> l = intList.stream().map(i -> i * 2).collect(Collectors.toList());
			long e = System.currentTimeMillis();
			System.out.println("Thread : " + t + " : " + (e - s));
		});
	}

	private static void doSomeRandomOperationInList(List<Integer> intList) {
		long startTime = System.currentTimeMillis();
		intList.stream().map(i -> i * 2).collect(Collectors.toList());
		long endTime = System.currentTimeMillis();
		System.out.println(
				"Thread : " + Thread.currentThread().getName() + " : Time Taken in (ms) : " + (endTime - startTime));
	}

}
// Output
// Main Thread : main
// Thread : main : Time Taken in (ms) : 1838
// Thread : main : Time Taken in (ms) : 490
// Thread : main : Time Taken in (ms) : 542
// Thread : main : Time Taken in (ms) : 322
// Thread : main : Time Taken in (ms) : 325
// new thread - 1 : ForkJoinPool.commonPool-worker-1
// new thread - 3 : ForkJoinPool.commonPool-worker-3
// new thread - 2 : ForkJoinPool.commonPool-worker-2
// new thread - 4 : ForkJoinPool.commonPool-worker-4
// new thread - 5 : ForkJoinPool.commonPool-worker-5
// Thread : 5 : 15178
// Thread : 1 : 15178
// Thread : 4 : 15179
// Thread : 2 : 15200
// Thread : 3 : 15202
```

## link

- Java cache Miss https://vijay-vk.github.io/java-concurrency/java-cache-miss.html
- thread affinity https://www.overops.com/blog/java-thread-magic-tricks/
