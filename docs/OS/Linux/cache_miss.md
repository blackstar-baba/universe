## description

```
perf stat ./yourapp
```

See the [kernel wiki perf tutorial](https://perf.wiki.kernel.org/index.php/Tutorial) for details. This uses the hardware performance counters of your CPU, so the overhead is very small.

Example from the wiki:

```
perf stat -B dd if=/dev/zero of=/dev/null count=1000000

Performance counter stats for 'dd if=/dev/zero of=/dev/null count=1000000':

        5,099 cache-misses             #      0.005 M/sec (scaled from 66.58%)
      235,384 cache-references         #      0.246 M/sec (scaled from 66.56%)
    9,281,660 branch-misses            #      3.858 %     (scaled from 33.50%)
  240,609,766 branches                 #    251.559 M/sec (scaled from 33.66%)
1,403,561,257 instructions             #      0.679 IPC   (scaled from 50.23%)
2,066,201,729 cycles                   #   2160.227 M/sec (scaled from 66.67%)
          217 page-faults              #      0.000 M/sec
            3 CPU-migrations           #      0.000 M/sec
           83 context-switches         #      0.000 M/sec
   956.474238 task-clock-msecs         #      0.999 CPUs

   0.957617512  seconds time elapsed
```

## link

- Measure cache hit miss https://stackoverflow.com/questions/10082517/simplest-tool-to-measure-c-program-cache-hit-miss-and-cpu-time-in-linux
