const userModer = require('../../tools/sql');

/**
 * 实现 onMessage 方法
 * 客户端推送消息到 WebSocket 信道服务器上后，会调用该方法，此时可以处理信道的消息。
 * 在本示例，我们处理 `speak` 类型的消息，该消息表示有用户发言。
 * 我们把这个发言的信息广播到所有在线的 WebSocket 信道上
 */
function namegroup (openid_create, openid_invited) {
    if(openid_create==""||openid_invited==""){
        console.log("必须存在邀请人和被邀请人")
        return false
    }
}

module.exports =  {
    // 小程序请求 websocket 地址
    get: async ctx => {
    
  },
  // 信道将信息传输过来的时候
  post: async ctx => {
    let openid_create = ctx.request.body.openid_create
    let openid_invited = ctx.request.body.openid_invited
    let group_id = ctx.request.body.group_id
    
    if(namegroup(openid_create,openid_invited)!=false){
    var create = await userModer.selectFromOpenId(openid_create)
    var invited = await userModer.selectFromOpenId(openid_invited)
    
    var create_num = create[0].user_id
    var create_groups = create[0].groups

    //检查用户是否创建过群组
    var crea = await userModer.selectGroupFromCreate(create_num)
    

    var invited_num = invited[0].user_id
    var invited_times = invited[0].times
    var invited_groups = invited[0].groups

    console.log("invited_num=========",invited_num)
    console.log("invited_times=====",invited_times)
    var member = String(create_num).concat(",",String(invited_num))
    // var Name = await userModer.selectNameinGroup()
    // let o = [];
    // for(let i in Name){
    //     o[i] = Name[i].group_name;
    //     console.log(o[i])
    // }

    if(crea.length==0&&group_id==""){//如果用户没有创建过群组
        group_name = create[0].user_name+'的股友圈'
        await userModer.insertGroups([group_name,create_num+invited_num,4,member,create_num])
        
        ctx.body={
            code:0,
            msg:'创建群组成功，群名为'+create[0].user_name+'的股友圈'
        }
        // return true

    var group =  await userModer.selectGroupFromCreate(create_num)
    console.log(group[0].group_id)
    // await userModer.updateUser([])

    if(create_groups==null||create_groups==""){
        await userModer.updateUser([group[0].group_id,create_num])
    }else if(create_groups.length>=1){
        await userModer.updateUser([create_groups+","+group[0].group_id,create_num])
    }
    
    if(invited_groups==null||invited_groups==""){
        await userModer.updateUser([group[0].group_id,invited_num])
    }else if(invited_groups.length>=1){
        await userModer.updateUser([invited_groups+","+group[0].group_id,invited_num])
    }
}else{//用户创建过群组情况
    var create = await userModer.selectFromOpenId(openid_create) //创建者用户信息
    
    var invited = await userModer.selectFromOpenId(openid_invited) //被邀请者用户信息
    
    var create_num = create[0].user_id    //创建者用户id
    var create_times = create[0].times    //创建者可用测股次数
    console.log("create_num=======",create_num)
    console.log("create_times=====",create_times)
    
    var group = await userModer.selectGroupAndUserid([create_num,group_id])  //根据创建者用户id和群组名字获取群组信息

    var mem = JSON.stringify(group[0].member)

    if(group.length==0){
        ctx.body={
            code:-1,
            msg:'该用户不是群主'
        }
        return false
    }

    var memb = group[0].member  //群组成员
    if(memb.length>=10){
        ctx.body={
            code:-1,
            msg:'群组成员上限已满'
        }
        return false;
    }

    
    var invited_num = invited[0].user_id //被邀请用户的用户id
    var invited_times = invited[0].times
    var invited_groups = invited[0].groups
    
    if(mem.indexOf(invited_num)!=-1){//判断用户是否已经在群组中  code为-1时说明用户在群组中可被邀请
        ctx.body={
            code:-1,
            msg:'用户已经存在于该群组'
        }
        return false
    }

    var test_all = group[0].test_all //群组中总的测股次数
    var test = group[0].test    //群组中可用的测股次数
    var member = memb.concat(",",invited_num)

   

    await userModer.updateGroups([test+invited_times,test_all+2,member,group[0].group_id]).then(result=>{
        ctx.body={
            code:0,
            msg:'成功邀请用户进群'
        }
    })
    if(invited_groups==null||invited_groups==""){
            await userModer.updateUser([group[0].group_id,invited_num])
        }else{
            await userModer.updateUser([invited_groups+","+group[0].group_id,invited_num])
        }
}

    }
  }
}
