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
export default api

