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

let selectSessionInfo = function (){
    let _sql = "select user_info FROM cSessionInfo"
    // let data = await query(_sql)
    return query(_sql)
}

let selectNameinGroup = function (){
  let _sql = "select group_name FROM groups"
  // let data = await query(_sql)
  return query(_sql)
}

let selectGroupWithName = function (value){
  let _sql = "select * FROM groups WHERE group_name=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupWithId = function (value){
  let _sql = "select * FROM groups WHERE group_id=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupInId = function (value){
  let _sql = "select * FROM groups WHERE group_id In (?)"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupFromCreate = function (value){
  let _sql = "select * FROM groups WHERE create_userid=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectGroupAndUserid = function (values){
  let _sql = "select * FROM groups WHERE create_userid=? and group_id=?"
  // let data = await query(_sql)
  return query(_sql,values)
}

let selectFromOpenId = function (value){
    let _sql = "select * FROM user WHERE openid=?"
    // let data = await query(_sql)
    return query(_sql,value)
}

let selectFromUserId = function (value){
  let _sql = "select * FROM user WHERE user_id=?"
  // let data = await query(_sql)
  return query(_sql,value)
}

let updateAllTimes = function (){
  let _sql = "UPDATE user SET times=2"
  // let data = await query(_sql)
  return query(_sql)
}

let selectRecordsWithDay = function ( values ){
  let _sql = "select * FROM group_record WHERE user_id=? and content_type='test' and dates=?"
  // let data = await query(_sql )
  return query(_sql,values)
}

let selectRecordsWithContent = function ( values ){
  let _sql = "select * FROM group_record WHERE content=? and dates=?"
  // let data = await query(_sql)
  return query(_sql,values)
}

let selectRecords_test = function ( values ){
  // let _sql = "select * FROM group_record WHERE group_id like ? and ((content_type='test' and dates=?) or content_type='normal') ORDER BY content_time DESC LIMIT 20"
  let _sql = "select * FROM group_record WHERE group_id like ? and dates=? ORDER BY content_time ASC LIMIT 20"
  // let data = await query(_sql)
  return query(_sql,values) 
}

let selectRecords_normal = function ( value ){
  let _sql = "select * FROM group_record WHERE content_type='normal' and group_id=? ORDER BY content_time DESC"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectRecords_history = function ( value ){
  let _sql = "select distinct h.content from (select content FROM group_record WHERE user_id=? and content_type='test' ORDER BY content_time DESC LIMIT 5) h"
  // let data = await query(_sql)
  return query(_sql,value)
}

let selectRecords_two = function ( values ){
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

let updateUser = function(values){
  let _sql = 'update user set groups=? where user_id=?'
  return query(_sql, values)
}

let updateUserWithTimes = function(values){
  let _sql = 'update user set times=? where user_id=?'
  return query(_sql, values)
}

let updateGroup_test = function(){
  let _sql = 'update groups a set a.test=a.test_all'
  return query(_sql)
}

let updateGroups = function( values ) {
  let _sql = 'update groups set test=?,test_all=?,member=? where group_id=?'
  return query(_sql, values)
}

let updateGroups_Name = function( values ) {
  let _sql = 'update groups set group_name=? where group_id=?'
  return query(_sql, values)
}

let reduceGroups_test = function(value){
  let _sql = 'update groups a set a.test=a.test+1 where find_in_set(?,member); '
  return query(_sql, value)
}

let updateGroup_idInRecord = function(values){
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