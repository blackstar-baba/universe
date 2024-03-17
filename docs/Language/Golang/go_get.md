## 描述
Permission Denied when downloading a private module with go get

follow this：
```
I listed the keys added to the agent with ssh-add -l
I verified that the key I had to use for the authentication was not added to the agent
I added the key: ssh-add ~/.ssh/<your_private.key>
And bingo! go get worked!
```


## 链接
https://github.com/golang/go/issues/52942
