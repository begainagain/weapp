const schedule = require("node-schedule");

schedule.scheduleJob('0/1 * * * * ?', function(){
    console.log("1111111111111")
  });