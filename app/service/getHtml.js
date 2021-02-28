/* eslint-disable jsdoc/require-param */
'use strict'
const { Service } = require('egg')
const cheerio = require('cheerio');
const HOST = 'http://www.itheima.com/images/teacher/ui/'

class GetHtml extends Service {
  async gethtmlData(){
    const { ctx, config } = this
    const {data} = await ctx.curl(`http://web.itheima.com/teacher.html`)
    const chunks = new Buffer(JSON.parse(JSON.stringify(data))).toString() // Buffer转JSON
    const $ =  cheerio.load(chunks) // 解析html
    const imgList = Array.prototype.map.call($('.tea_box4 .maincon .clears .main_pic  > img'),item=>{
      const  itemData= $(item).attr('src').split('/').slice(-1)
      return encodeURI(HOST+itemData[0])
    })
    return chunks
  }
}
module.exports = GetHtml