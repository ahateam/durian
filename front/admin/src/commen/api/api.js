import util from 'ahaapi'
import baseUrl from './url'


let api = {};
console.log('开始调用ctrl');

/** 内容相关*/
//获取内容列表
api.getPostingList = function (cnt, callback) {
    util.call(baseUrl + '/posting/getPostingList', cnt, callback)
}
//删除帖子
api.delPosting = function (cnt, callback) {
    util.call(baseUrl + '/posting/delPosting', cnt, callback)
}

// 获取帖子
api.getPostingList = function (cnt, callback) {
	util.call(baseUrl+'/posting/getPostingList', cnt, callback)
}

// 修改帖子
api.updatePosting = function (cnt, callback) {
	util.call(baseUrl+'/posting/updatePosting', cnt, callback)
}

// 查询商品
api.getGoodsList = function (cnt, callback) {
	util.call(baseUrl+'/goods/getGoodsList', cnt, callback)
}

// 修改商品状态
api.setGoodsStatus = function (cnt, callback) {
	util.call(baseUrl+'/goods/setGoodsStatus', cnt, callback)
}
// 用户
api.getUserList = function (cnt, callback) {
	util.call(baseUrl+'/user/getUserList', cnt, callback)
}
// 查询任务
api.getTaskList = function (cnt, callback) {
	util.call(baseUrl+'/task/getTaskList', cnt, callback)
}
//创建任务步骤	
api.createTaskSteps = function (cnt, callback) {
	util.call(baseUrl+'/task/createTaskSteps', cnt, callback)
}
//查询任务步骤
api.getTaskStepsList = function (cnt, callback) {
	util.call(baseUrl+'/task/getTaskStepsList', cnt, callback)
}
//删除任务步骤	
api.deleteTaskSteps = function (cnt, callback) {
	util.call(baseUrl+'/task/deleteTaskSteps', cnt, callback)
}
//修改任务步骤	
api.editTaskSteps = function (cnt, callback) {
	util.call(baseUrl+'/task/editTaskSteps', cnt, callback)
}
//查询任务完成记录
api.getChangeRecordList = function (cnt, callback) {
	util.call(baseUrl+'/task/getChangeRecordList', cnt, callback)
}
//创建任务步骤完成记录	
api.createChangeRecord = function (cnt, callback) {
	util.call(baseUrl+'/task/createChangeRecord', cnt, callback)
}
//根据任务id任务发布者和接受者	
api.getUserByTaskId = function (cnt, callback) {
	util.call(baseUrl+'/task/getUserByTaskId', cnt, callback)
}
// 时间范围查询
api.getTaskListByTime = function (cnt, callback) {
	util.call(baseUrl+'/task/getTaskListByTime', cnt, callback)
}
// 发布者或接受者昵称模糊查询
api.getTaskListByUserName = function (cnt, callback) {
	util.call(baseUrl+'/task/getTaskListByUserName', cnt, callback)
}
// 修改任务
api.updateTaskByTaskId = function (cnt, callback) {
	util.call(baseUrl+'/task/updateTaskByTaskId', cnt, callback)
}
// 添加管理员
api.createUser = function (cnt, callback) {
	util.call(baseUrl+'/user/createUser', cnt, callback)
}
// 删除用户
api.deleteUser = function (cnt, callback) {
	util.call(baseUrl+'/user/deleteUser', cnt, callback)
}
// 封禁/解封用户
api.closeUserComont = function (cnt, callback) {
	util.call(baseUrl+'/user/closeUserComont', cnt, callback)
}
// 用户名或手机号模糊查询
api.getUserByNameORPhone = function (cnt, callback) {
	util.call(baseUrl+'/user/getUserByNameORPhone', cnt, callback)
}
// 修改用户信息
api.updateUser = function (cnt, callback) {
	util.call(baseUrl+'/user/updateUser', cnt, callback)
}
// 查询商品
api.getGoodsList = function (cnt, callback) {
	util.call(baseUrl+'/goods/getGoodsList', cnt, callback)
}
// 设置商品状态
api.setGoodsStatus = function (cnt, callback) {
	util.call(baseUrl+'/goods/setGoodsStatus', cnt, callback)
}
// 根据商品名称查询
api.getByGoodsName = function (cnt, callback) {
	util.call(baseUrl+'/goods/getByGoodsName', cnt, callback)
}
// 获取用户信息
api.getUserInfo = function (cnt, callback) {
	util.call(baseUrl+'/user/getUserInfo', cnt, callback)
}
// 创建商品
api.createGoods = function (cnt, callback) {
	util.call(baseUrl+'/goods/createGoods', cnt, callback)
}
// 修改审核状态
api.editAuditStatus = function (cnt, callback) {
	util.call(baseUrl+'/task/editAuditStatus', cnt, callback)
}
// 查看审核状态
api.getAuditStatus = function (cnt, callback) {
	util.call(baseUrl+'/task/getAuditStatus', cnt, callback)
}
// 查询所有订单
api.getAllOrder = function (cnt, callback) {
	util.call(baseUrl+'/goods/getAllOrder', cnt, callback)
}
export default api

