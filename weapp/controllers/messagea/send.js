const userModer = require('../../tools/sql');

module.exports =  {
    // 小程序请求 websocket 地址
    get: async ctx => {
    
  },
  // 信道将信息传输过来的时候
  post: async ctx => {
    let content = ctx.request.body.content
    let openid = ctx.request.body.openid
    let group_id = ctx.request.body.group_id

    var user = await userModer.selectFromOpenId(openid)
    var group = await userModer.selectGroupWithId(group_id)
    console.log(group[0].member.indexOf(user[0].user_id))
    var MyDate = new Date()
    // if(MyDate.getHours()<10&&MyDate.getMinutes<10){
    //     MyDate = '0'+MyDate.getHours().toString()+":0"+MyDate.getMinutes()
    //     console.log(MyDate)
    // }else if(MyDate.getHours()<10){
    //     MyDate = '0'+MyDate.getHours().toString()+":"+MyDate.getMinutes()
    //     console.log(MyDate)
    // }else if(MyDate.getMinutes()<10){
    //     MyDate = MyDate.getHours().toString()+":0"+MyDate.getMinutes()
    //     console.log(MyDate)
    // }else{
    //     MyDate = MyDate.getHours().toString()+":"+MyDate.getMinutes()
    //     console.log(MyDate)
    // }
        var year = MyDate.getFullYear()
        var month = MyDate.getMonth()+1
        var day = MyDate.getDate()

        var date = year+"-"+month+"-"+day
    
    if(group[0].member.indexOf(user[0].user_id)==-1){
        ctx.body={
            code:-1,
            msg:'该用户不在该群组中'
        }
    }else if(content.length==0){
        ctx.body={
            code:-1,
            msg:'输入不可为空'
        }
    }else{
        userModer.insertGroup_record([user[0].user_id,user[0].user_name,group_id,content,"normal",new Date(),date,user[0].head_img])
        ctx.body={ 
            code:0,
            msg:'发言成功'
        }
    }
    }
  }
