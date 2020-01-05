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
//创建任务
api.createTask = function (cnt, callback) {
	util.call(baseUrl+'/task/createTask', cnt, callback)
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
//接取任务
api.acceptTask = function (cnt, callback) {
	util.call(baseUrl+'/task/acceptTask', cnt, callback)
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
// 查询资质
api.getByQualId = function (cnt, callback) {
	util.call(baseUrl+'/task/getByQualId', cnt, callback)
}
// 查询语言
api.getLanguage = function (cnt, callback) {
	util.call(baseUrl+'/task/getLanguage', cnt, callback)
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
// 后台登录
api.login = function (cnt, callback) {
	util.call(baseUrl+'/user/loginByadmin', cnt, callback)
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
// 修改订单状态
api.setOrderStatus = function (cnt, callback) {
	util.call(baseUrl+'/goods/setOrderStatus', cnt, callback)
}
// 查询所有订单
api.getAllOrder = function (cnt, callback) {
	util.call(baseUrl+'/goods/getAllOrder', cnt, callback)
}
// 地址id查询地址
api.getReceivingAddressById = function (cnt, callback) {
	util.call(baseUrl+'/goods/getReceivingAddressById', cnt, callback)
}
// 创建合同
api.createContract = function (cnt, callback) {
	util.call(baseUrl+'/contract/createContract', cnt, callback)
}
// pdf合同
api.setpPDF = function (cnt, callback) {
	util.call(baseUrl+'/contract/setpPDF', cnt, callback)
}
// 查询用户签名列表
api.getAutographList = function (cnt, callback) {
	util.call(baseUrl+'/autograph/getAutographList', cnt, callback)
}
// 查询合同列表
api.getContractList = function (cnt, callback) {
	util.call(baseUrl+'/contract/getContractList', cnt, callback)
}
//学生合同签名
api.setStudentAutograph = function (cnt, callback) {
	util.call(baseUrl+'/contract/setStudentAutograph', cnt, callback)
}
// 获取评论
api.getReplys = function (cnt, callback) {
	util.call(baseUrl+'/posting/getReplys', cnt, callback)
}
// 获取二级评论
api.getComments = function (cnt, callback) {
	util.call(baseUrl+'/posting/getComments', cnt, callback)
}
// 删除一级评论
api.delReply = function (cnt, callback) {
	util.call(baseUrl+'/reply/delReply', cnt, callback)
}
// 删除二级评论
api.delComments = function (cnt, callback) {
	util.call(baseUrl+'/reply/delComments', cnt, callback)
}
// 发布帖子
api.createPosting = function (cnt, callback) {
	util.call(baseUrl+'/posting/createPosting', cnt, callback)
}
// 根据状态获取评论
api.getReplyByStatus = function (cnt, callback) {
	util.call(baseUrl+'/posting/getReplyByStatus', cnt, callback)
}
// 修改评论状态
api.examineReply = function (cnt, callback) {
	util.call(baseUrl+'/reply/examineReply', cnt, callback)
}
// 撤回发布的任务
api.withdrawTask = function (cnt, callback) {
	util.call(baseUrl+'/task/withdrawTask', cnt, callback)
}
// 删除发布的任务
api.deletDurianTaskByTaskId = function (cnt, callback) {
	util.call(baseUrl+'/task/deletDurianTaskByTaskId', cnt, callback)
}
// 获取密信
api.getSecretLetter = function (cnt, callback) {
	util.call(baseUrl+'/secret/getSecretLetter', cnt, callback)
}
// 删除密信
api.deleteSecretLetter = function (cnt, callback) {
	util.call(baseUrl+'/secret/deleteSecretLetter', cnt, callback)
}
// 获取帮助文案
api.getAutoReplyList = function (cnt, callback) {
	util.call(baseUrl+'/help/getAutoReplyList', cnt, callback)
}
// 根据id查询帮助文案详情
api.getAutoReply = function (cnt, callback) {
	util.call(baseUrl+'/help/getAutoReply', cnt, callback)
}
// 创建帮助文案
api.createAutoReply = function (cnt, callback) {
	util.call(baseUrl+'/help/createAutoReply', cnt, callback)
}
// 修改帮助文案
api.editAutoReply = function (cnt, callback) {
	util.call(baseUrl+'/help/editAutoReply', cnt, callback)
}
// 删除帮助文案
api.delAutoReply = function (cnt, callback) {
	util.call(baseUrl+'/help/delAutoReply', cnt, callback)
}
// 根据帖子编号查看帖子信息
api.getPosting = function (cnt, callback) {
	util.call(baseUrl+'/posting/getPosting', cnt, callback)
}
// 根据一级评论编号查看评论详情
api.getReplyById = function (cnt, callback) {
	util.call(baseUrl+'/reply/getReplyById', cnt, callback)
}
// 查询包含评论的帖子
api.getPostingsWithReply = function (cnt, callback) {
	util.call(baseUrl+'/posting/getPostingsWithReply', cnt, callback)
}
// 查询抽成配置	
api.getProportions = function (cnt, callback) {
	util.call(baseUrl+'/proportion/getProportions', cnt, callback)
}
// 修改抽成配置	
api.updateProportion = function (cnt, callback) {
	util.call(baseUrl+'/proportion/updateProportion', cnt, callback)
}
// 创建任务步骤类型
api.createTaskStepType = function (cnt, callback) {
	util.call(baseUrl+'/task/createTaskStepType', cnt, callback)
}
// 创建任务步骤类型
api.createTaskStepType = function (cnt, callback) {
	util.call(baseUrl+'/task/createTaskStepType', cnt, callback)
}
// 修改任务步骤类型
api.editTaskStepType = function (cnt, callback) {
	util.call(baseUrl+'/task/editTaskStepType', cnt, callback)
}
// 查询任务步骤类型
api.getTaskStepsTypeList = function (cnt, callback) {
	util.call(baseUrl+'/task/getTaskStepsTypeList', cnt, callback)
}
// 删除任务步骤类型
api.deleteTaskStepType = function (cnt, callback) {
	util.call(baseUrl+'/task/deleteTaskStepType', cnt, callback)
}
export default api


