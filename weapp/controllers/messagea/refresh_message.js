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
        var day = MyDate.getDate()-1

        var date = year+"-"+month+"-"+day

           var group_test = await userModer.selectRecords_test(["%"+group_id+"%",date])
           ctx.body={
             group_test
           }
           return
    if(groups[0].member.indexOf(user[0].user_id)!=-1){
        var MyDate = new Date()
        var year = MyDate.getFullYear()
        var month = MyDate.getMonth()+1
        var day = MyDate.getDate()-1

        var date = year+"-"+month+"-"+day
        console.log(typeof date)

        var group_normal = await userModer.selectRecords_normal(group_id)


        console.log(group_test)
        // ctx.body={
        //     group
        // }
        // console.log(group.length)
    }
    return
    }
  }
