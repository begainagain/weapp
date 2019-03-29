/**
 * ajax 服务路由集合
 */
// const router = require('koa-router')({
//     prefix: '/weapp'
// })

const Router = require('koa-router')

const router = new Router()

router.prefix('/weapp')


const controllers = require('../controllers')
const search = require('../controllers/search')
const group = require('../controllers/group')
const messagea = require('../controllers/messagea')
const sharesList = require('../controllers/sharesList')

var express = require('express');


// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// post
router.post('/c', async(ctx, next) => {

    console.log("-----------body-----",ctx.request.body);

    console.log("-----------userName-----",ctx.request.body.userName);
    console.log("-----------nickName-----",ctx.request.body.nickName);
    // ctx.body = 'Hello World';
  
   // 发送到页面
     // return  await ctx.render('index')
})

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)


router.post('/demo', controllers.demo.post)

// router.post('/demo', controllers.demo.post)

router.get('/invite', group.invite.get)

router.post('/invite', group.invite.post)

router.get('/create_group', group.create_group.get)

router.post('/create_group', group.create_group.post)

router.post('/rename_group', group.rename_group.post)

router.post('/list_group', group.list_group.post)

//核查测股次数
router.post('/times_check',search.times_check.post)

//核查测股次数
router.get('/times_check',search.times_check.get)

//关键字搜索股票  POST
router.post('/search_key', search.search_key.post)

//用来确认搜索的关键字只能唯一确定一只股票  POST
router.post('/search_only', search.search_only.post)

//个股热度  POST
router.post('/search_one', search.search_one.post)

//群组中个股热度查询  POST
router.post('/search_group', search.search_group.post)

//个人搜索历史  POST
router.post('/search_history', search.search_history.post)

//最近交易该股  POST
router.post('/recent_deal', search.recent_deal.post)

//个人走势图  POST
router.post('/person_trend', search.person_trend.post)

//赛事进度页  POST
router.post('/schedule', search.schedule.post)

//最新调仓  POST
router.post('/new_operation', search.new_operation.post)

//API
router.post('/shenjianAPI', search.shenjianAPI.get)

//发送信息  POST
router.post('/send', messagea.send.post)

//刷新信息  POST
router.post('/refresh_message', messagea.refresh_message.post)

//月收益榜  POST
router.post('/month_list', sharesList.month_list.post)

//连续达标榜  POST
router.post('/series_list', sharesList.series_list.post)

//累计收益榜  POST
router.post('/total_list', sharesList.total_list.post)

//稳健盘手榜  POST
router.post('/steady_list', sharesList.steady_list.post)

module.exports = router