## description

Cache miss

```
public class CacheMiss {

	public static void main(String[] args) throws InterruptedException, ExecutionException {

		List<Integer> intList = new ArrayList<>();
		for (int i = 0; i < 10000000; i++) {
			intList.add(i);
		}
		System.out.println("Main Thread : " + Thread.currentThread().getName());

		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);
		doSomeRandomOperationInList(intList);

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
