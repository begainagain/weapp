var mysql = require('mysql');
var config = require('../config.js')

var pool  = mysql.createPool({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.pass,
    database : config.mysql.db
  });
  
  let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  
  }

let selectSessionInfo = function (){//查询微信储存的用户信息
    let _sql = "select user_info FROM cSessionInfo"
    // let data = await query(_sql)
    return query(_sql)
}

let selectNameinGroup = function (){//查询群组名
  let _sql = "select group_name FROM groups"
  // let data = await query(_sql)
  return query(_sql)
}

let selectGroupWithName = function (value){//通过群组名查询群组信息
  let _sql = "select * FROM groups WHERE group_name=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupWithId = function (value){//通过群id查询群组信息
  let _sql = "select * FROM groups WHERE group_id=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupInId = function (value){//
  let _sql = "select * FROM groups WHERE group_id In (?)"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupFromCreate = function (value){//通过群主id查询群组信息
  let _sql = "select * FROM groups WHERE create_userid=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupAndUserid = function (values){//通过群组id和群主id查询群组信息
  let _sql = "select * FROM groups WHERE create_userid=? and group_id=?"
  // let data = await query(_sql)
  return query(_sql,values)
}

let selectFromOpenId = function (value){//通过openid查询用户信息
    let _sql = "select * FROM user WHERE openid=?"
    // let data = await query(_sql)
    return query(_sql,value)
}

let selectFromUserId = function (value){//通过用户id查询用户信息
  let _sql = "select * FROM user WHERE user_id=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let updateAllTimes = function (){//更新用户测股次数为两次
  let _sql = "UPDATE user SET times=2"
  // let data = await query(_sql)
  return query(_sql)
}

let selectRecordsWithDay = function ( values ){//查询用户某天的测股数据
  let _sql = "select * FROM group_record WHERE user_id=? and content_type='test' and dates=?"
  // let data = await query(_sql )
  return query(_sql,values)
}

let selectRecordsWithContent = function ( values ){//通过日期和内容查询群组聊天数据
  let _sql = "select * FROM group_record WHERE content=? and dates=?"
  // let data = await query(_sql)
  return query(_sql,values)
}

let selectRecords_test = function ( values ){//通过群id和日期查询群聊天记录
  // let _sql = "select * FROM group_record WHERE group_id like ? and ((content_type='test' and dates=?) or content_type='normal') ORDER BY content_time DESC LIMIT 20"
  let _sql = "select * FROM group_record WHERE group_id like ? and dates=? ORDER BY content_time ASC LIMIT 20"
  // let data = await query(_sql)
  return query(_sql,values) 
}

let selectRecords_normal = function ( value ){//查询普通聊天记录
  let _sql = "select * FROM group_record WHERE content_type='normal' and group_id=? ORDER BY content_time DESC"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectRecords_history = function ( value ){//查询用户去重后的前五条测股数据
  let _sql = "select distinct h.content from (select content FROM group_record WHERE user_id=? and content_type='test' ORDER BY content_time DESC LIMIT 5) h"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectRecords_two = function ( values ){//通过用户id和日期查询指定日期的测股记录
  let _sql = "select content FROM group_record WHERE user_id=? and dates=? and content_type='test' ORDER BY content_time DESC LIMIT 10"
  // let data = await query(_sql)
  return query(_sql,values)
}


let insertUser = function( values ) {
    let _sql = 'insert into user(openid,user_name,gender,last_visit_time,language,city,province,country,head_img) VALUES(?,?,?,?,?,?,?,?,?)'
    return query(_sql, values)
}

let insertGroups = function( values ) {
    let _sql = 'insert into groups(group_name,test,test_all,member,create_userid) VALUES(?,?,?,?,?)'
    return query(_sql, values)
}

let insertGroup_record = function( values ) {
  let _sql = 'insert into group_record(user_id,user_name,group_id,content,content_type,content_time,dates,head_img) VALUES(?,?,?,?,?,?,?,?)'
  return query(_sql, values)
}

let updateUser = function(values){//通过用户id更新用户群组信息
  let _sql = 'update user set groups=? where user_id=?'
  return query(_sql, values)
}

let updateUserWithTimes = function(values){//根据用户id更新用户测股次数
  let _sql = 'update user set times=? where user_id=?'
  return query(_sql, values)
}

let updateGroup_test = function(){
  let _sql = 'update groups a set a.test=a.test_all'
  return query(_sql)
}

let updateGroups = function( values ) {//更新群组中测股信息记录
  let _sql = 'update groups set test=?,test_all=?,member=? where group_id=?'
  return query(_sql, values)
}

let updateGroups_Name = function( values ) {//更新群组名
  let _sql = 'update groups set group_name=? where group_id=?'
  return query(_sql, values)
}

let reduceGroups_test = function(value){//更新群组已用侧股次数
  let _sql = 'update groups a set a.test=a.test+1 where find_in_set(?,member); '
  return query(_sql, value)
}

let updateGroup_idInRecord = function(values){//根据用户id更新测股信息的所属群组
  let _sql ="update group_record a set a.group_id=? where a.content_type='test' and a.user_id=?"
  return query(_sql, values)
}

module.exports = {
    query,
    selectSessionInfo,
    insertUser,
    selectNameinGroup,
    selectFromOpenId,
    selectGroupWithName,
    insertGroups,
    selectGroupFromCreate,
    selectGroupAndUserid,
    updateGroups,
    updateGroups_Name,
    insertGroup_record,
    selectGroupWithId,
    selectFromUserId,
    updateUser,
    selectRecordsWithDay,
    updateUserWithTimes,
    selectRecordsWithContent,
    selectRecords_normal,
    selectRecords_test,
    selectGroupInId,
    selectRecords_history,
    selectRecords_two,
    updateAllTimes,
    updateGroup_test,
    reduceGroups_test,
    updateGroup_idInRecord
}