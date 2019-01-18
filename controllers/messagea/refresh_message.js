const userModer = require('../../tools/sql');

module.exports =  {
    // 小程序请求 websocket 地址
    get: async ctx => {
    
  },
  // 信道将信息传输过来的时候
  post: async ctx => {
    let group_id = ctx.request.body.group_id
    let openid = ctx.request.body.openid

    var user = await userModer.selectFromOpenId(openid)
    var groups = await userModer.selectGroupWithId(group_id)
    // console.log(groups)
    // console.log(user) 
    var MyDate = new Date()
        var year = MyDate.getFullYear()
        var month = MyDate.getMonth()+1
        var day = MyDate.getDate()

        var date = year+"-"+month+"-"+day

           var group_test = await userModer.selectRecords_test(["%"+group_id+"%",date])
           for(var i=0;i<group_test.length;i++){
             if(group_test[i].content_type==='test'){
               group_test[i].content=JSON.parse(group_test[i].content)
             }
             if(group_test[i].content_time.getHours()<10&&group_test[i].content_time.getMinutes()<10){
              group_test[i].content_time = "0"+group_test[i].content_time.getHours()+":0"+group_test[i].content_time.getMinutes()
             }else if(group_test[i].content_time.getHours()<10){
              group_test[i].content_time = "0"+group_test[i].content_time.getHours()+":"+group_test[i].content_time.getMinutes()
             }else if(group_test[i].content_time.getMinutes()<10){
              group_test[i].content_time = group_test[i].content_time.getHours()+":0"+group_test[i].content_time.getMinutes()
             }else{
               group_test[i].content_time = group_test[i].content_time.getHours()+":"+group_test[i].content_time.getMinutes()
             }
             
           }
           console.log( )
           ctx.body={
             group_test
           }
    // if(groups[0].member.indexOf(user[0].user_id)!=-1){
    //     var MyDate = new Date()
    //     var year = MyDate.getFullYear()
    //     var month = MyDate.getMonth()+1
    //     var day = MyDate.getDate()-1

    //     var date = year+"-"+month+"-"+day
    //     console.log(typeof date)

    //     var group_normal = await userModer.selectRecords_normal(group_id)


    //     console.log(group_test)
    //     // ctx.body={
    //     //     group
    //     // }
    //     // console.log(group.length)
    // }
    return
    }
  }
