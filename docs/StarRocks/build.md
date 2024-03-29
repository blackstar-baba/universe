## description

- dockerfile

```dockerfile
FROM centos:7 AS builder


# //todo need ccache

# install dependencies
RUN yum makecache && yum -y update && yum -y groupinstall 'Development Tools' && \
    yum install -y byacc automake java-11-openjdk-devel java-1.8.0-openjdk-devel libtool bison binutils-devel zip \
    unzip ncurses-devel curl git wget python2 python3 glibc-static java-1.8.0-openjdk-devel \
    libstdc++-static which psl libpsl-devel centos-release-scl && \
    yum install -y devtoolset-10 devtoolset-10-gcc devtoolset-10-libubsan-devel devtoolset-10-liblsan-devel \
    devtoolset-10-libasan-devel
    
# build cmake
ARG CMAKE_VERSION=3.19.8
ARG CMAKE_BASE_URL=https://github.com/Kitware/CMake/releases/download/v${CMAKE_VERSION}
RUN wget ${CMAKE_BASE_URL}/cmake-${CMAKE_VERSION}-Linux-x86_64.sh -q -O /tmp/cmake-install.sh && \
    chmod u+x /tmp/cmake-install.sh && \
    /tmp/cmake-install.sh --skip-license --prefix=/usr --exclude-subdir && \
    rm /tmp/cmake-install.sh

# build gcc
ARG GCC_VERSION=10.3.0
ARG GCC_URL=https://mirrors.ustc.edu.cn/gnu/gcc/gcc-${GCC_VERSION}

RUN yum install -y gcc-c++ \
  && mkdir -p  /var/local/gcc \
  && curl -fsSL -o /tmp/gcc.tar.gz  ${GCC_URL}/gcc-${GCC_VERSION}.tar.gz \
  && tar -xvf /tmp/gcc.tar.gz -C /var/local/gcc --strip-components=1 \
  && cd /var/local/gcc \
  && sed -i 's/ftp:\/\/gcc.gnu.org\/pub\/gcc\/infrastructure\//http:\/\/mirror.linux-ia64.org\/gnu\/gcc\/infrastructure\//g' contrib/download_prerequisites \
  && ./contrib/download_prerequisites \
  && ./configure --disable-multilib --enable-languages=c,c++ --prefix=/usr \
  && make -j$[$(nproc)/4+1] && make install \
  && rm -rf /var/local/gcc \
  && rm -f /tmp/gcc.tar.gz

# build  ninja
ARG NINJA_VER=1.10.2
ARG NINJA_BASE_URL=https://github.com/ninja-build/ninja/releases/download/v${NINJA_VER}
RUN wget -q ${NINJA_BASE_URL}/ninja-linux.zip -O /tmp/ninja-linux.zip && \
    unzip /tmp/ninja-linux.zip -d /usr/bin/ && \
    rm /tmp/ninja-linux.zip

# install maven 3.6.3
ARG MAVEN_VERSION=3.6.3
ARG MAVEN_BASE_URL=https://downloads.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries
RUN mkdir -p /usr/share/maven /usr/share/maven/ref && \
    wget -q -O /tmp/apache-maven.tar.gz ${MAVEN_BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz && \
    tar -xzf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 && \
    rm -f /tmp/apache-maven.tar.gz && \
    ln -s /usr/share/maven/bin/mvn /usr/bin/mvn

# build flex
ARG FLEX_VERSION=2.6.4
RUN wget https://github.com/westes/flex/releases/download/v$FLEX_VERSION/flex-$FLEX_VERSION.tar.gz \
    -q -O /tmp/flex-$FLEX_VERSION.tar.gz \
    && cd /tmp/ \
    && tar -xf flex-$FLEX_VERSION.tar.gz \
    && cd flex-$FLEX_VERSION \
    && ./configure --enable-shared=NO \
    && make \
    && make install \
    && rm /tmp/flex-$FLEX_VERSION.tar.gz \
    && rm -rf /tmp/flex-$FLEX_VERSION

# install nodejs
ARG NODEJS_VERSION=14.16.0
RUN wget https://nodejs.org/dist/v$NODEJS_VERSION/node-v$NODEJS_VERSION-linux-x64.tar.gz \
    -q -O /tmp/node-v$NODEJS_VERSION-linux-x64.tar.gz \
    && cd /tmp/ && tar -xf node-v$NODEJS_VERSION-linux-x64.tar.gz \
    && cp -r node-v$NODEJS_VERSION-linux-x64/* /usr/local/ \
    && rm /tmp/node-v$NODEJS_VERSION-linux-x64.tar.gz && rm -rf node-v$NODEJS_VERSION-linux-x64


ENV BASH_ENV=/opt/rh/devtoolset-10/enable  \
    ENV=/opt/rh/devtoolset-10/enable  \
    PROMPT_COMMAND=". /opt/rh/devtoolset-10/enable"

# there is a repo which is included all of thirdparty
ENV REPOSITORY_URL=https://doris-thirdparty-repo.bj.bcebos.com/thirdparty
ENV DEFAULT_DIR=/var/local
ENV JAVA_HOME=/usr/lib/jvm/java-1.8.0
# ENV JAVA_HOME="/usr/lib/jvm/java-11"

# clone lastest source code, download and build third party
# COPY incubator-doris ${DEFAULT_DIR}/incubator-doris
# RUN cd ${DEFAULT_DIR}/incubator-doris && /bin/bash thirdparty/build-thirdparty.sh \
#    && rm -rf ${DEFAULT_DIR}/incubator-doris/thirdparty/src \
#    && rm -rf ${DEFAULT_DIR}/doris-thirdparty.tar.gz \
#    && rm -rf ${DEFAULT_DIR}/doris-thirdparty \
#    && mkdir -p ${DEFAULT_DIR}/thirdparty \
#    && mv ${DEFAULT_DIR}/incubator-doris/thirdparty/installed ${DEFAULT_DIR}/thirdparty/ \
#    && rm -rf ${DEFAULT_DIR}/incubator-doris

# RUN alternatives --set java java-11-openjdk.x86_64 && alternatives --set javac java-11-openjdk.x86_64


FROM scratch

COPY --from=builder / /
# ENV JAVA_HOME="/usr/lib/jvm/java-11" \
ENV JAVA_HOME="/usr/lib/jvm/java-8" \
    MAVEN_HOME="/usr/share/maven" \
    BASH_ENV="/opt/rh/devtoolset-10/enable" \
    ENV="/opt/rh/devtoolset-10/enable"  \
    PROMPT_COMMAND=". /opt/rh/devtoolset-10/enable" \
    REPOSITORY_URL="https://doris-thirdparty-repo.bj.bcebos.com/thirdparty" \
    DEFAULT_DIR="/var/local" \
    PATH="/var/local/thirdparty/installed/bin:$PATH" \
    DORIS_THIRDPARTY="/var/local/thirdparty"
WORKDIR /root

CMD ["/bin/bash"]


```





## link

- [gcc download](https://ftp.gnu.org/gnu/gcc/gcc-10.3.0/)
- [gcc update](https://lolipopj.github.io/2021/04/19/linux-docker-gcc-update/#/%E4%B8%8B%E8%BD%BD-GCC-%E4%BE%9D%E8%B5%96%E5%8C%85)

