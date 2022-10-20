## description

## intall

- install bison first （version bigger than 2.5.0）

  ```
  brew install bison 
  ```

- install thrift

```
wget http://archive.apache.org/dist/thrift/0.13.0/thrift-0.13.0.tar.gz

tar -xvf thrift-0.13.0.tar.gz

cd thrift-0.13.0

./configure --without-erlang  --without-haskell --without-java --without-perl --without-php --without-php_extension --without-python --without-ruby --disable-tests --disable-tutorial --without-go --without-swift --without-rs --without-nodejs

make && make install
```

#### check

```
which thrift

# /usr/local/bin/thrift

thrift -version

# Thrift version 0.13.0
```



#### link

