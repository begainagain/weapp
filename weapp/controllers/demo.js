var http = require('http');



function getJoke(url,keyword) {
  return new Promise((reslove, reject) => {
      console.log("111111111111111111111111111")
    var sendinfo={                          
        //设置要请求的参数
        "header":{
            "action":"Q003",
            "code":"0",
            "msgtype":0,
            "page":{"index":1,"size":50},
            "sendingtime":"2017-05-25 10:25:17.906",
            "version":"1.0.01"
        },
        "searchString":keyword,
        "queryIndex":"1"
    }
    console.log(sendinfo)
    var sendData = JSON.stringify(sendinfo);   //对参数编号处理
      let options = {
        hostname: url,
        // port: 443,
        path: '/stock/httpServiceImpl/doQuote',
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
        let keyword = ctx.request.body.keyword

        let url = 'api.rrjiaoyi.com'
        var bookinfo =await getJoke(url,keyword)
        var MyDate = new Date()
        
        var years = MyDate.getFullYear
        var months= MyDate.getMonth
        var days  = MyDate.getDate
        var hours = MyDate.getHours
        var mimutes = MyDate.getMilliseconds
        console.log(MyDate.toLocaleString()+"."+MyDate.getMilliseconds())
     
    }

}