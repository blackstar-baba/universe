## description

`virtual_disk_operation.sh` :

```shell
#!/bin/bash


filePath=/data1/disks
filePathPredix=disk
mountPathPrefix=/mnt/vhds/vhd

operation=$1

create(){
  num=$1
  if [ "${num}" = "" ]; then
    echo "Error: num is not set."
    exit 1
  fi

  echo "=======> disk number:${num}<======="

  sudo mkdir -p ${filePath}

  for ((i=0; i<$num; i++))
  do
    fileFullPath="${filePath}/${filePathPredix}-${i}.img"
    mountFullPath="${mountPathPrefix}-${i}"
    echo "file path: ${fileFullPath}, mount path:${mountFullPath}"
    sudo dd if=/dev/zero of=${fileFullPath} bs=1M count=1024
    sudo mkfs -t ext4 ${fileFullPath}
    sudo mkdir -p ${mountFullPath}
    sudo mount -t auto -o loop ${fileFullPath} ${mountFullPath}
  done
}

remove(){
  mountPaths=$(df -Th | grep /mnt/vhds/vhd | awk '{ print $7 }')
  for mp in ${mountPaths}
  do
    sudo umount "${mp}"
  done
  filePaths=$(ls ${filePath} | awk '{ print $1 }')
  for fp in ${filePaths}
  do
    sudo rm "${filePath}/${fp}"
  done
}

if [ "${operation}" = "" ]; then
  echo "Error: operation is not set."
  exit 1
elif [ "${operation}" = "create" ]; then
  create $2
elif [ "${operation}" = "remove" ]; then
  remove
else
  echo "Error: ${operation} not supported."
  exit 1
fi

```
how to use?
- create virtual disks:
```shell
sh /path/to/virtual_disk_operation.sh create num
```
e.g. create two virtual disks
```shell
sh /path/to/virtual_disk_operation.sh create 2
```
- remove all virtual disks
```shell
sh /path/to/virtual_disk_operation.sh remove
```

## link

- [How to Create a Virtual HardDisk Volume Using a File in Linux](https://www.tecmint.com/create-virtual-harddisk-volume-in-linux/)

