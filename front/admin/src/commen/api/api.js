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

// 获取待审核帖子
api.getPostingList = function (cnt, callback) {
	util.call(baseUrl+'/posting/getPostingList', cnt, callback)
}
// 创建帖子
api.createPosting = function (cnt, callback) {
	util.call(baseUrl+'/posting/createPosting', cnt, callback)
}
// 修改帖子
api.updatePosting = function (cnt, callback) {
	util.call(baseUrl+'/posting/updatePosting', cnt, callback)
}
// 查询用户
api.getUserList = function (cnt, callback) {
	util.call(baseUrl+'/user/getUserList', cnt, callback)
}
export default api

