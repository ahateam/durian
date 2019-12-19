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
	util.call(baseUrl+'	/task/getTaskListByTime', cnt, callback)
}

export default api

