# 电影管理后台

node mongodb express jade

## Run
```
npm install     安装npm依赖
bower install   安装bower依赖
node app.js     启动app
```
learn from  <a href="https://www.imooc.com/learn/75" target="_blank">https://www.imooc.com/learn/75</a>

## mongodb

1  安装 <a href="https://docs.mongodb.com/manual/installation/" target="_blank">https://docs.mongodb.com/manual/installation/</a>

2  使用
```
mongod   启动服务 
```
3  本地直接操作mongodb
```
mongo     进入mongo
show dbs  展示所有数据库
use xxx   切换到指定数据库
db        可以看到当前数据库名称
show collections  查看xxx下所有数据库集合
db.[coll-name].find()  查询coll-name 列表， 可以传query对象
db.[coll-name].count() 列表长度
```
