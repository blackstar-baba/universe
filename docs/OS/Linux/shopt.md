## description
show shell config


### show config
```
shopt | grep xx
```

### active config
```
shopt -s xx
```

### inactive config
```
shopt -u xx
```

## example
if huponexit is off, if we have  a background job which use &, after close terminal session the job exist .
```
shopt | grep huponexit
```
set huponexit on
```
shopt -s huponexit
```

## link