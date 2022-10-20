## description
The kernel parameter threads-max controls the maximum number of threads. This parameter is defined in the file /proc/sys/kernel/threads-max.Let’s view this file using the cat command:
```
$ cat /proc/sys/kernel/threads-max
63704
```
Here, the output 63704 indicates that the kernel can execute a maximum of 63,704 threads.Alternatively, we can use the sysctl command to retrieve the threads-max value:
```
$ sysctl -a | grep threads-max
kernel.threads-max = 63704
```
The pid_max parameter specifies the value at which PIDs wrap around:
```
$ cat /proc/sys/kernel/pid_max 
131072
```
The kernel.pid_max value of 131072 above means the kernel can execute a maximum of 131,072 processes simultaneously. The max_map_count parameter specifies the maximum number of Virtual Memory Areas (VMAs) that a process can own:
```
cat /proc/sys/vm/max_map_count
65530
```

## link
- https://www.baeldung.com/linux/max-threads-per-process

