const mysql = require('../../tools/sql');

module.exports = {
    
    get: async ctx => {
    },
    // 信道将信息传输过来的时候
    post: async ctx => {
        var openid = ctx.request.body.openid
        let stock_code = ctx.request.body.stock_code

        var MyDate = new Date()
        var month = MyDate.getMonth()+1

        var Date_now = MyDate.getFullYear() + '-'+ month + '-' + MyDate.getDate()

        var user = await mysql.selectFromOpenId(openid)
        var test_times = user[0].times    
        
        var record = await mysql.selectRecords_two([user[0].user_id,Date_now]) 

        for(var i=0;i<record.length;i++){
            var code = JSON.parse(record[i].content).stock_code
            console.log(code)
            if(stock_code === code){
                ctx.body={
                    code:1,
                    msg:'用户今日测过该股，可直接查询该股信息'
                }
                return
            }else{
                continue
            }
        }

        if(test_times>0){
            ctx.body={
                code:0,
                msg:'用户测股次数不为零，可以测股'
            }
        }else{
            ctx.body={
                code:-1,
                msg:'用户侧股次数已用完'
            }
        }
        console.log(test_times)
     
    }

}