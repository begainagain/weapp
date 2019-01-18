const mysql = require('../../tools/sql');



module.exports = {
    
    get: async ctx => {
    
    },
    // 信道将信息传输过来的时候
    post: async ctx => {
        let openid = ctx.request.body.openid
        // let user_name = ctx.request.body.user_name
        // let content_time = ctx.request.body.content_time

        var user = await mysql.selectFromOpenId(openid)


        var MyDate = new Date()
        var year = MyDate.getFullYear()
        var month = MyDate.getMonth()+1
        var day = MyDate.getDate()

        var date = year+"-"+month+"-"+day
        console.log(date)             

        var record_group = await mysql.selectRecords_history(user[0].user_id)

        var record = []
        for(var i=0;i<record_group.length;i++){
            record[i]=JSON.parse(record_group[i].content)
        }

        ctx.body={
            record
        }
        

    }

} 