## description

Some plans

### Merge on read( fast write,slow read)

append files, if need read,read base files and append files. e.g. LSM tree\Hudi\influxdb.

### Copy on write(slow write, fast read)

write old files. e.g. Delta Lake\Hudi\Icebreg\Snowflake.

### Delta Store(slow(a bit) write,fast read).

need primary Index, if write, save delta data into delta store,add new record in new file,  if read, read base files and delta store.  e.g. Kudu\Many TP & HTAP Databases.

###  Delete + Insert(slow(a bit) write,fast read)

need primary index. if write, use bitmap to mark delete record,add new record in new file.  if read, ignore delete recode which in bitmap. e.g. Alibaba ADB\Hologres\Sql Server Column store\Starrocks Primary key.

## link

- How to get both read and write performance which one using columnar storage https://www.bilibili.com/video/BV1NU4y1f7HJ/?spm_id_from=333.788
