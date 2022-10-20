## description

- get device name

  ```
  fdisk -l
  ```

- Make device partition

  ```
  fdisk  /dev/sdb
  ```

- Format filesystem

  ```
  mkfs.xfs /dev/sdb
  ```

- Mount

  ```
  mkdir /data
  mount /dev/sdb /data
  ```

## link

- https://www.cnblogs.com/patriot/p/7880990.html

