'use strict';

const Service = require('egg').Service;

class BillService extends Service {
  // 添加账单
  async add(params) {
    const { ctx, app } = this;
    try {
      // 往 bill 表中插入一条账单数据
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取账单列表
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    const sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取账单详情
  async detail(id, user_id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get('bill', { id, user_id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 修改账单
  async update(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.update('bill', {
        ...params,
      }, {
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 删除帐单
  async delete(id, user_id) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.delete('bill', {
        id: id,
        user_id: user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BillService;
