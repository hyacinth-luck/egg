'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { service } = ctx
    // console.log('service=====>',ctx.service.getHtml.gethtmlData)
   const data = await service.getHtml.gethtmlData()
  //  console.log('data=====>',data)
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
