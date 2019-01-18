const userModer = require('../../tools/sql');

/**
 * 实现 onMessage 方法
 * 客户端推送消息到 WebSocket 信道服务器上后，会调用该方法，此时可以处理信道的消息。
 * 在本示例，我们处理 `speak` 类型的消息，该消息表示有用户发言。
 * 我们把这个发言的信息广播到所有在线的 WebSocket 信道上
 */
function namegroup (groupName, openid_create, openid_invited) {

    if(groupName==""){
        console.log("群组名不能为空")
        return false
    }

    if(openid_create==""||openid_invited==""){
        console.log("必须存在邀请人和被邀请人")
        return false
    }
    console.log("全部对了")
}

module.exports =  {
    // 小程序请求 websocket 地址
    get: async ctx => {
    
  },
  // 信道将信息传输过来的时候
  post: async ctx => { 
    let group_name = ctx.request.body.groupName
    let new_name = ctx.request.body.new_name
    let openid = ctx.request.body.openid

    var user = await userModer.selectFromOpenId(openid)
    var user_num = user[0].user_id
    console.log(user)

    //检查用户是否创建过群组
    var group = await userModer.selectGroupWithName(group_name)
    console.log(group)
    if(group[0].create_userid!=user_num){
        ctx.body={
            code:-1,
            msg:'该用户不是群主，没有操作权限'
        }
        return false
    }else{
        await userModer.updateGroups_Name([new_name,group[0].group_id])

        ctx.body={
            code:0,
            msg:'群名修改成功！！！'
        }
    }
    }
  }
