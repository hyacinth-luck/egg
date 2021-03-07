/* eslint-disable jsdoc/require-param */
'use strict'
const { Service } = require('egg')
const cheerio = require('cheerio');
const HOST = 'http://www.itheima.com/images/teacher/ui/'

class GetHtml extends Service {
  async gethtmlData(){
    const { ctx, config } = this
    // const {data} = await ctx.curl(`http://web.itheima.com/teacher.html`)
    const {data} = await ctx.curl(`http://share.teachee-dev.com/share/batch/113/7982151405935329280?urlDetail==https%3A%2F%2Fdsy.teachee-dev.com%3A8091%2Fstudent%2Fcenter%2Fstore%2Fbatch-detail%3Fid%3D113`)
    const chunks = new Buffer(JSON.parse(JSON.stringify(data))).toString() // Buffer转JSON
    console.log('chunks:',chunks)
    const $ =  cheerio.load(chunks) // 解析html
    console.log('$:',$)
    const imgList = Array.prototype.map.call($('.tea_box4 .maincon .clears .main_pic  > img'),item=>{
      const  itemData= $(item).attr('src').split('/').slice(-1)
      return encodeURI(HOST+itemData[0])
    })
    return chunks
  }
}
module.exports = GetHtml