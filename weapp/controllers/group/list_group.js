const userModer = require('../../tools/sql');

module.exports =  {
    // 小程序请求 websocket 地址
    get: async ctx => {
    
  },
  // 信道将信息传输过来的时候
  post: async ctx => {
    let openid = ctx.request.body.openid

    var user = await userModer.selectFromOpenId(openid)
    var groups = user[0].groups.split(",")

    var have_group = false
    var group = []
    for(var i=0;i<groups.length;i++){
        var group_one = await userModer.selectGroupWithId(groups[i])
        group[i]=group_one[0]
        if(group_one[0].create_userid==user[0].user_id){
            have_group=group_one[0].group_id
        }
    }
    console.log(group)
    ctx.body={
        group,
        have_group
    }
  }
}
