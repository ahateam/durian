import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import login from './views/login'
// 咨询管理
const addContent = () => import('./views/content/addContent')
const contentList = () => import('./views/content/contentList')
const ReplyList = () => import('./views/content/ReplyList')
const contentInfo = () => import('./views/content/contentInfo')
// 商品列表
const goodsType = () => import('./views/commodity/goodsType')
const goodsList = () => import('./views/commodity/goodsList')
const orderList = () => import('./views/commodity/orderList')
//用户管理
const adminLIst = () => import('./views/user/adminLIst')
const userList = () => import('./views/user/userList')
const interUserList = () => import('./views/user/interUserList')
//任务管理
const taskList = () => import('./views/taskList/taskList')
//审核管理
const interExamine = () => import('./views/examine/interExamine')
const contentExamine = () => import('./views/examine/contentExamine')
const goodsExamine = () => import('./views/examine/goodsExamine')
//平台币管理
const investList = () => import('./views/currency/investList')
const virtualcoinList = () => import('./views/currency/virtualcoinList')
//帮助中心
const tagGroup = () => import('./views/helpCenter/tagGroup')
const homeTag = () => import('./views/helpCenter/homeTag')

//数据统计
const interestTagList = () => import('./views/dataStatistics/interestTagList')
const enrollList = () => import('./views/dataStatistics/enrollList')

Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'login',
			component: login,
		},
		{
			path: '/content',
			name: 'home',
			component: home,
			children: [
			{
				path: '/contentList',
				name: 'contentList',
				component: contentList
			},
			{
				path: '/contentInfo',
				name: 'contentInfo',
				component: contentInfo
			}
			,
			{
				path: '/addContent',
				name: 'addContent',
				component: addContent
			}, {
				path: '/ReplyList',
				name: 'ReplyList',
				component: ReplyList
			},  {
				path: '/goodsType',
				name: 'goodsType',
				component: goodsType
			},  {
				path: '/goodsList',
				name: 'goodsList',
				component: goodsList
			},   {
				path: '/orderList',
				name: 'orderList',
				component: orderList
			},  {//用户管理
				path: '/adminLIst',
				name: 'adminLIst',
				component: adminLIst
			}, {
				path: '/userList',
				name: 'userList',
				component: userList
			}, {
				path: '/interUserList',
				name: 'interUserList',
				component: interUserList
			}, { //任务管理
				path: '/taskList',
				name: 'taskList',
				component: taskList
				
			}, { //审核管理
				path: '/interExamine',
				name: 'interExamine',
				component: interExamine
				
			}, { 
				path: '/contentExamine',
				name: 'contentExamine',
				component: contentExamine
				
			}, {
				path: '/goodsExamine',
				name: 'goodsExamine',
				component: goodsExamine
			}, { //平台币管理
				path: '/investList',
				name: 'investList',
				component: investList
				
			},  { 
				path: '/virtualcoinList',
				name: 'virtualcoinList',
				component: virtualcoinList
			},   { //帮助中心
				path: '/homeTag',
				name: 'homeTag',
				component: homeTag
				
			},  { 
				path: '/tagGroup',
				name: 'tagGroup',
				component: tagGroup
			},   { //数据统计
				path: '/interestTagList',
				name: 'interestTagList',
				component: interestTagList
				
			},  { 
				path: '/enrollList',
				name: 'enrollList',
				component: enrollList
			}, 
			
			    ]
		},
		{
			path: '/login',
			name: 'login',
			component: login
		}


	]
})
