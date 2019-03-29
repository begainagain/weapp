const schedule = require("node-schedule");
const userModer = require('../tools/sql');

schedule.scheduleJob('0 0 0 * * *',async function(){
  await userModer.updateAllTimes()
  await userModer.updateGroup_test()
  console.log("成功")
  }); 