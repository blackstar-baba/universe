## description

Use Brew

Commands:

```shell
# install
brew install postgres@12


# init
echo 'export PATH="/usr/local/opt/postgresql@12/bin:$PATH"' >> ~/.zsh_rc
source ~/.zsh_rc


# start
pg_ctl -D /usr/local/var/postgresql@12 start

# stop
pg_ctl -D /usr/local/var/postgresql@12 stop


# username is your username
# set password
psql
\password
# input your password
\q
```

Packages

```shell
# extension
/usr/local/opt/postgresql@12/share/postgresql@12/extension

# install
/usr/local/var/postgresql@12

```



## link





