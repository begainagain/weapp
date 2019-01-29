var querystring = require('querystring')
var http = require('http');
const request = require('superagent');
const mysql = require('../../tools/sql');



function getJoke(url,stockCode,market,code) {
  return new Promise((reslove, reject) => {
    console.log("111111111111111111111111111")
    var MyDate = new Date()
    var sendinfo = {}
    if(code==0){
      sendinfo={                          
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
    }else if(code==1){
      var sendinfo={
        "header" : { 
          "action" : "S072", 
          "code" : "0", 
          "devicetype" : "1", 
          "msgtype" : 0, 
          "sendingtime" : "2016-09-26 14:46:06.090", 
          "version" : "1.0.1"
        },
        "stockCode":stockCode+"."+market
      }
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

function get_emotion(emotion){
  if(emotion==0){
    let motion=""
    for(var i=0;i<5;i++){
      motion+="😑"
      console.log("ssssssss")
    }
    return motion
  }else if(emotion>0){
    let motion=""
    for(var i=0;i<emotion;i++){
      motion+="😊"
    }
    for(var i =0;i<5-emotion;i++){
      motion+="😑"
    }
    return motion
  }else if(emotion<0){
      let motion=""
    for(var i=0;i<-emotion;i++){
      motion+="😟"
      console.log("ssssssss")
    }
    for(var n=0;n<5+emotion;n++){
      motion+="😑"
      console.log("ssssssss")
    }
    return motion
  }
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

        
        

        // var MyDate = new Date()
        // var year = MyDate.getFullYear()
        // var month = MyDate.getMonth()+1
        // var day = MyDate.getDate()

        // var date = year+"-"+month+"-"+day
        // console.log('11111111111111111111111111111111111',date)

        let url = '47.96.107.128'
        var bookinfo =await getJoke(url,stockCode,market,0)
        var personinfo = await getJoke(url,stockCode,market,1)
        var stockMarket = await getJoke(url,399300,'SZ',1)

        var ss = JSON.parse(bookinfo)
        var aa = JSON.parse(personinfo)
        var stock_market  = JSON.parse(stockMarket)
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaa",aa)
        // console.log("ssssssssssssssssssssssss",ss.result)
        var qq = JSON.parse(JSON.stringify(ss.result))
        console.log(typeof qq)  
        console.log(aa)

        var emotion = aa.result.emotion

        var stock_emotion = stock_market.result.emotion

        var emotion =  get_emotion(emotion)

        var stock_emotion = get_emotion(stock_emotion)

        // if(emotion==0){
        //   emotion=""
        //   for(var i=0;i<5;i++){
        //     emotion.append(":|")
        //   }
        // }else if(emotion>0){
        //   emotion=""
        //   for(var i=0;i<emotion;i++){
        //     emotion.append(":)")
        //   }
        //   for(var i =0;i<5-emotion;i++){
        //     emotion.append(":|")
        //   }
        // }else if(emotion<0){
        //   emotion=""
        //   for(var i=0;i<-emotion;i++){
        //     emotion.append(":(")
        //   }
        //   for(var i =0;i<5+emotion;i++){
        //     emotion.append(":|")
        //   }
        // }

        ss.result["emotion"]=emotion
        ss.result["stock_emotion"]=stock_emotion
        // delete ss[result.buyCount];
        console.log(ss)
        // delete 
        // var content_test = "{\"stock_name\":"+"\""+ss.result.stock_name+"\","+"\"stock_code\":"+"\""+
        // ss.result.stock_code+"\","+"\"market\":"+"\""+market+"\"}"


        // var stockCodes=ss.result.stock_code
        
        

        var user = await mysql.selectFromOpenId(openid)
        // var record = await mysql.selectRecords_two([user[0].user_id,date])
        if(user.length==0){
          return 
        }
        // console.log(record)

        // var record_n=[]
        // for(var n=0;n<record.length;n++){
        //   record_n[n]=JSON.parse(record[n].content)
        // }

        // var record_state=""
        //个人测股信息查询
      //   for(var i=0;i<record_n.length;i++){
      //  if(record_n.length!=0&&record_n[i].stock_code===stockCodes) {
      //    record_state = 'true'
      //     break
      //   }
      // }

      // if(record_state!='true'){
      // if(user[0].times>0){

      //   }else{
      //     ctx.body={
      //       code:-1,
      //       msg:'次数已用完'
      //     }
      //     return
      //   }
      // }
        ctx.body=ss
        return
        

    }

} 