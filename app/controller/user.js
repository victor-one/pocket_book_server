'use strict';

const md5 = require('md5');

const Controller = require('egg').Controller;
// 默认头像
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // 判断账号密码是否为空
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null,
      };
      return;
    }
    // 获取用户信息
    const userInfo = await ctx.service.user.getUserByName(username);
    // 判断是否已经存在
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null,
      };
      return;
    }
    // 将数据存入数据库
    const passwordMD5 = md5(password);
    const result = await ctx.service.user.register({
      username,
      password: passwordMD5,
      signature: '这个人很懒，没有签名.',
      avatar: defaultAvatar,
      ctime: Date.now(),
    });
    // 判断是否存入数据库
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.service.user.getUserByName(username);
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null,
      };
      return;
    }
    // 找到用户，并且判断输入密码与数据库中用户密码
    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null,
      };
      return;
    }
    // 生成token
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token有效期24小时
    }, app.config.jwt.secret);

    ctx.body = {
      code: 200,
      message: '登录成功',
      data: {
        token,
      },
    };
  }
  // 验证
  async test() {
    const { ctx, app } = this;
    // 通过token解析，拿到 user的id
    const token = ctx.request.header.authorization; // 从请求头中获取token
    const decode = await app.jwt.verify(token, app.config.jwt.secret); // 将token解码获取信息
    // 响应接口
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: {
        ...decode,
      },
    };
  }
  // 获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
      },
    };
  }
  // 修改用户信息
  async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body;

    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar,
      });

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          username: userInfo.username,
          signature,
          avatar,
        },
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserController;
