/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655351596674_3925';

  // add your middleware config here
  config.middleware = [];

  config.view = {
    mapping: { '.html': 'ejs' }, // 左边写成.html文件，会自动渲染.html文件
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  config.jwt = {
    secret: 'PocketBook',
  };

  config.multipart = {
    mode: 'file',
  };

  config.cors = {
    origin: 'http://localhost:3000', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload',
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'wang19950924,',
      // database
      database: 'pocket_book',
    },
    app: true,
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
