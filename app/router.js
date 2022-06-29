'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // 传入加密字符串
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  // 获取用户信息
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo);
  router.get('/api/user/test', _jwt, controller.user.test);
  // 修改用户个性签名
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo);
  // 上传图片
  router.post('/api/upload', controller.upload.upload);
  // 添加账单
  router.post('/api/bill/add', _jwt, controller.bill.add);
  // 获取账单列表
  router.get('/api/bill/list', _jwt, controller.bill.list);
  // 获取账单详情
  router.get('/api/bill/detail', _jwt, controller.bill.detail);
  // 账单更新
  router.post('/api/bill/update', _jwt, controller.bill.update);
  // 删除帐单(是否可以做个回收站功能)
  router.post('/api/bill/delete', _jwt, controller.bill.delete);
  // 获取数据
  router.get('/api/bill/data', _jwt, controller.bill.data);
  // 获取消费类型列表
  router.get('/api/type/list', _jwt, controller.type.list);
  // 修改密码
  router.post('/api/user/modify_pass', _jwt, controller.user.modifyPass);
};
