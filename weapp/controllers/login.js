const mysql = require('../tools/sql');

// 登录授权接口
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    if (ctx.state.$wxInfo.loginState) {
        ctx.state.data = ctx.state.$wxInfo.userinfo
        ctx.state.data['time'] = Math.floor(Date.now() / 1000)
        // console.log(ctx.state.$wxInfo.userinfo.userinfo.openId)
        var user = ctx.state.$wxInfo.userinfo.userinfo
        // var users = await mysql.selectFromOpenId(user.openId)
        var users = mysql.selectFromOpenId(user.openId)

        if(users.length===0){
            // await mysql.insertUser([user.openId,user.nickName,user.gender,new Date(),
            // user.language,user.city,user.province,user.country,user.avatarUrl])
            mysql.insertUser([user.openId,user.nickName,user.gender,new Date(),
                user.language,user.city,user.province,user.country,user.avatarUrl])
        }
        
    }
}
