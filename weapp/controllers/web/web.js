var querystring = require('querystring')
var http = require('http');
const request = require('superagent');
const mysql = require('../../tools/sql');



function getJoke(url,account_id) {//赛事进度
  return new Promise((reslove, reject) => {
      // console.log("111111111111111111111111111")
    var sendinfo=
    { 
        "header" : { 
                    "action" : "S066", 
                    "code" : "0", 
                    "devicetype" : "java", 
                    "msgtype" : 0, 
                    "sendingtime" : "2016-09-26 14:46:06.090", 
                    "version" : "1.0.01"						
            },
                                
                "analog_stock_account_id": account_id
        }
    // console.log(sendinfo)
    var sendData = JSON.stringify(sendinfo);   //对参数编号处理
      let options = {
        hostname: url,
        // port: 443,
        path: '/?appid=577908ee0bc7665a8d44f7411613e6e8',
        method: "GET",
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
      // console.log(urlData)
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
    req.end();
  })
}

module.exports = {
    
    get: async ctx => {
        let url = 'api.shenjian.io'
        console.log(1111111111)
        var bookinfo =await getJoke(url)
        console.log(typeof sss+"22222222222222222222222222222222222222222222222")
        
        var sss = JSON.parse(bookinfo)
        console.log(sss)
        ctx.body=sss
    },
    // 信道将信息传输过来的时候
    post: async ctx => {
        let account_id = ctx.request.body.account_id

        let url = 'https://api.shenjian.io'
        console.log(1111111111)
        var bookinfo =await getJoke(url,account_id)
        // console.log(typeof sss+"22222222222222222222222222222222222222222222222")
        // console.log(bookinfo)
        var sss = JSON.parse(bookinfo)
        ctx.body=sss
        
        
     
    }

}