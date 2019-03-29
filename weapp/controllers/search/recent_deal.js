var querystring = require('querystring')
var http = require('http');
const request = require('superagent');
const mysql = require('../../tools/sql');



function getJoke(url,stockCode,market) {
  return new Promise((reslove, reject) => {
      // console.log("111111111111111111111111111")
    var sendinfo={                          
        //设置要请求的参数
        "header":{
            "action":"S071",
            "code":"0",
            "devicetype":"0",
            "msgtype":0,
            "sendingtime":"2016-10-13 09:23:37.761",
            "version":"1.0.01",
            "page":{
                "index":1,
                "size":3
            }
        },
        "stockCode":stockCode,
        "market":market
    
    }
    // console.log(sendinfo)
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

        let url = '47.96.107.128'
        console.log(1111111111)
        var bookinfo =await getJoke(url,stockCode,market)
        // console.log(typeof sss+"22222222222222222222222222222222222222222222222")
        var sss = JSON.parse(bookinfo)
        ctx.body=sss
        
        
     
    }

}