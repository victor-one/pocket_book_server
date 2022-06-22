# pocket_book_server

这是一个记账本的后台程序。采用的技术栈为egg.js。

## 快速启动

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 接口

### 注册接口

`POST`  :  `/api/user/register`

### 登录接口

`POST`  :  `/api/user/login`

### 获取用户信息

`GET`  :  `/api/user/get_userinfo`

### 修改用户个性签名

`POST`  :  `/api/user/edit_userinfo`

### 上传图片

`POST`  :  `/api/upload`

### 添加账单

`POST`  :  `/api/bill/add`

### 获取帐单列表

`GET`  :  `/api/bill/list`

### 获取账单详情

`GET`  :  `/api/bill/detail`

### 账单更新

`POST`  :  `/api/bill/update`

### 删除帐单

`POST`  :  `/api/bill/delete`

### 获取数据

`GET`  :  `/api/bill/data`
