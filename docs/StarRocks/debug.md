## description



### local build and debug

```shell
docker run -it \
-p 9030:9030 \
-p 30002:30002 \
-p 30003:30003 \
-p 9060:9060
-p 8040:8040
-p 9050:9050
-v /Users/blackstar/.m2:/root/.m2 \
-v /Users/blackstar/github/fork/starrocks:/root/starrocks \
--ip 172.17.0.2 \
--name sr-build \
-d starrocks/dev-env:main

docker exec -it sr-build /bin/bash

cd /root/starrocks

./build.sh

```

### remote build and debug

- remote machine installed docker、gdb or lldb, supports avx2.
- local machine installed rsync, os:Mac or Linux

- get image `docker pull starrocks/dev-env:main` on remote machine

- create maven cache dir on remote machine. e.g.

  ```
  mkdir -p /data1/.m2
  ```

- sync code from local machine to remote machine, use this shell script which named` rsync.sh`:

  ```shell
  #!/bin/bash
  
  source=~/github/fork/starrocks
  remote=root@192.168.1.1
  dest=/data1/SR_SYNC
  gitIgnoreFilePath=~/github/fork/starrocks/.gitignore
  command="rsync -avz --delete --exclude=.git*"
  
  for line in `cat ${gitIgnoreFilePath}`
  do
    if [ $line != "" ]; then
      command="${command} --exclude=${line}"
    fi
  done
  
  command="${command} ${source} ${remote}:${dest}"
  
  $command
  ```

   you need to edit `source`、`remote`、`dest` and `gitIgnoreFilePath` in `rsnyc.sh`,and use this command to exec:

  ```
  sh rsync.sh
  ```

- run image and build on remote machine

  ```shell
  docker run -it \
  -v /data1/SR_SYNC/.m2:/root/.m2 \
  -v /data1/SR_SYNC/starrocks:/root/starrocks \
  --name sr_build -d starrocks/dev-env:main
  
  docker run -it \
  -v /data1/.m2:/root/.m2 \
  -v /data1/GL_SR_SYNC/starrocks:/root/starrocks \
  --name gl_sr_build -d starrocks/dev-env:main
  
  docker exec -it sr_build /root/starrocks/build.sh
  ```

- startup program on remote machine

  ```
  sh /root/starrocks/outout/
  ```

  

## link

- https://www.jetbrains.com/help/clion/remote-projects-support.html#remote-toolchain
