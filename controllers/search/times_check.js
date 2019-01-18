const mysql = require('../../tools/sql');

module.exports = {
    
    get: async ctx => {
    },
    // 信道将信息传输过来的时候
    post: async ctx => {
        var openid = ctx.request.body.openid
        let stock_code = ctx.request.body.stock_code
        let market = ctx.request.body.market
        let stock_name = ctx.request.body.stock_name

        var content_test = "{\"stock_name\":"+"\""+stock_name+"\","+"\"stock_code\":"+"\""+
        stock_code+"\","+"\"market\":"+"\""+market+"\"}"

        var MyDate = new Date()
        var year = MyDate.getFullYear()
        var month = MyDate.getMonth()+1
        var day = MyDate.getDate()

        var date = year+"-"+month+"-"+day

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
            await mysql.insertGroup_record([user[0].user_id,user[0].user_name,user[0].groups,content_test,"test",new Date(),date,user[0].head_img])
            await mysql.updateUserWithTimes([user[0].times-1,user[0].user_id])
            await mysql.reduceGroups_test(["%"+user[0].user_id+"%"])
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