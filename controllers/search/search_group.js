var querystring = require('querystring')
var http = require('http');
const request = require('superagent');
const mysql = require('../../tools/sql');



function getJoke(url,stockCode,market) {
  return new Promise((reslove, reject) => {
      console.log("111111111111111111111111111")
      var MyDate = new Date()
    var sendinfo={                          
        //设置要请求的参数
        "header":{
            "action":"S070",
            "code":"0",
            "devicetype":"0",
            "msgtype":0,
            "sendingtime":MyDate.toLocaleString()+"."+MyDate.getMilliseconds(),
            "version":"1.0.01"
                        
        },
            "stockCode":stockCode,
            "market":market
    }
    console.log(sendinfo)
    var sendData = JSON.stringify(sendinfo);   //对参数编号处理
      let options = {
        hostname: url,
        // port: 443,
        path: '/stock/httpServiceImpl/doStock',
        method: "POST",
        headers:{ 
          'Content-Type':'application/json',
        //   "Content-Length": Buffer.byteLength(sendData)
        }
      }
    let req = http.request(options, res => {
      res.setEncoding('utf-8');
      let urlData = ''
      res.on('data', data=>{
        urlData += data
        // urlData = data
      })
      console.log(urlData)
      res.on('end', data => {
        // const bookinfo = JSON.parse(urlData)
        const bookinfo = urlData
        if(bookinfo){
          reslove(bookinfo)
        }
        reject(bookinfo)
      })
    })
    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(sendData);
    req.end();
  })
}



module.exports = {
    
    get: async ctx => {
    
    },
    // 信道将信息传输过来的时候
    post: async ctx => {
        let stockCode = ctx.request.body.stockCode
        let market = ctx.request.body.market

        let openid = ctx.request.body.openid
        // let user_name = ctx.request.body.user_name
        // let content_time = ctx.request.body.content_time

        var MyDate = new Date()
        var year = MyDate.getFullYear()
        var month = MyDate.getMonth()+1
        var day = MyDate.getDate()

        var date = year+"-"+month+"-"+day
        console.log(date)

        let url = '47.96.107.128'
        var bookinfo =await getJoke(url,stockCode,market)
        var ss = JSON.parse(bookinfo)
        var content_test = "{\"stock_name\":"+"\""+ss.result.stock_name+"\","+"\"stock_code\":"+"\""+
        ss.result.stock_code+"\","+"\"market\":"+"\""+market+"\"}"
        console.log(content_test)
        
        

        //群组中信息查询
          var user_group = await mysql.selectFromOpenId(openid)
          var record_group = await mysql.selectRecordsWithContent([content_test,date])

          if(record_group.length==0){
              ctx.body={
                  code:-1,
                  msg:'无法查询过期数据'
              }
              return
          }
          var groups = record_group[0].group_id
          console.log(typeof groups)
          var group_num = groups.split(",")
          console.log(group_num.length)

          for(var i=0;i<group_num.length;i++){
            var num = group_num[i]
            var group_mem = await mysql.selectGroupWithId(num)
            if(group_mem[0].member.indexOf(user_group[0].user_id)!=-1){//查询成员列表里是否存在该用户
              console.log(group_mem[0].member.indexOf(user_group[0].user_id))
              ctx.body=ss
              return true
            }
          }
        

    }

} 