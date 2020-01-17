import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import login from './views/login'
// 咨询管理
const addContent = () => import('./views/content/addContent')
const contentList = () => import('./views/content/contentList')
const ReplyList = () => import('./views/content/ReplyList')
const contentInfo = () => import('./views/content/contentInfo')
const replyInfo = () => import('./views/content/replyInfo')
const secretLetterInfo = () => import('./views/content/secretLetterInfo')
// 商品列表
const goodsType = () => import('./views/commodity/goodsType')
const goodsList = () => import('./views/commodity/goodsList')
const orderList = () => import('./views/commodity/orderList')
const addGoods = () => import('./views/commodity/addGoods')
const orderInfo = () => import('./views/commodity/orderInfo')
//用户管理
const adminList = () => import('./views/user/adminList')
const userList = () => import('./views/user/userList')
const interUserList = () => import('./views/user/interUserList')
const userInfo = () => import('./views/user/userInfo')
const addAdmin = () => import('./views/user/addAdmin')
const updateAdmin = () => import('./views/user/updateAdmin')
//任务管理
const taskList = () => import('./views/taskList/taskList')
const taskInfo = () => import('./views/taskList/taskInfo')
const stepList = () => import('./views/taskList/stepList')
const updateTask = () => import('./views/taskList/updateTask')
const addTask = () => import('./views/taskList/addTask')
const myTask = () => import('./views/taskList/myTask')
const myContract = () => import('./views/taskList/myContract')
const moneyProportion = () => import('./views/taskList/moneyProportion')

//审核管理
const interExamine = () => import('./views/examine/interExamine')
const contentExamine = () => import('./views/examine/contentExamine')
const goodsExamine = () => import('./views/examine/goodsExamine')
const goodsInfo = () => import('./views/examine/goodsInfo')
const taskExamine = () => import('./views/examine/taskExamine')
const replyExamine = () => import('./views/examine/replyExamine')

//平台币管理
const investList = () => import('./views/currency/investList')
const virtualcoinList = () => import('./views/currency/virtualcoinList')
//帮助中心
const tagGroup = () => import('./views/helpCenter/tagGroup')
const homeTag = () => import('./views/helpCenter/homeTag')
const helpInfo = () => import('./views/helpCenter/helpInfo')
const platformPush = () => import('./views/helpCenter/platformPush')
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
			children: [{
					path: '/contentList',
					name: 'contentList',
					component: contentList
				},
				{
					path: '/contentInfo',
					name: 'contentInfo',
					component: contentInfo
				},
				{
					path: '/addContent',
					name: 'addContent',
					component: addContent
				}, {
					path: '/ReplyList',
					name: 'ReplyList',
					component: ReplyList
				}, {
					path: '/replyInfo',
					name: 'replyInfo',
					component: replyInfo
				}, {
					path: '/secretLetterInfo',
					name: 'secretLetterInfo',
					component: secretLetterInfo
				}, {
					path: '/goodsType',
					name: 'goodsType',
					component: goodsType
				}, {
					path: '/addGoods',
					name: 'addGoods',
					component: addGoods
				}, {
					path: '/goodsList',
					name: 'goodsList',
					component: goodsList
				}, {
					path: '/orderList',
					name: 'orderList',
					component: orderList
				}, {
					path: '/orderInfo',
					name: 'orderInfo',
					component: orderInfo
				}, { //用户管理
					path: '/adminList',
					name: 'adminList',
					component: adminList
				}, {
					path: '/userList',
					name: 'userList',
					component: userList
				}, {
					path: '/interUserList',
					name: 'interUserList',
					component: interUserList
				}, {
					path: '/userInfo',
					name: 'userInfo',
					component: userInfo
				}, {
					path: '/addAdmin',
					name: 'addAdmin',
					component: addAdmin
				}, {
					path: '/updateAdmin',
					name: 'updateAdmin',
					component: updateAdmin
				}, { //任务管理
					path: '/taskList',
					name: 'taskList',
					component: taskList
				}, {
					path: '/taskInfo',
					name: 'taskInfo',
					component: taskInfo
				}, {
					path: '/stepList',
					name: 'stepList',
					component: stepList
				}, {
					path: '/updateTask',
					name: 'updateTask',
					component: updateTask
				}, {
					path: '/addTask',
					name: 'addTask',
					component: addTask
				}, {
					path: '/myTask',
					name: 'myTask',
					component: myTask
				}, {
					path: '/myContract',
					name: 'myContract',
					component: myContract
				}, {
					path: '/moneyProportion',
					name: 'moneyProportion',
					component: moneyProportion
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
				}, {
					path: '/goodsInfo',
					name: 'goodsInfo',
					component: goodsInfo
				}, {
					path: '/taskExamine',
					name: 'taskExamine',
					component: taskExamine
				}, {
					path: '/replyExamine',
					name: 'replyExamine',
					component: replyExamine
				}, { //平台币管理
					path: '/investList',
					name: 'investList',
					component: investList

				}, {
					path: '/virtualcoinList',
					name: 'virtualcoinList',
					component: virtualcoinList
				}, { //帮助中心
					path: '/homeTag',
					name: 'homeTag',
					component: homeTag

				}, {
					path: '/tagGroup',
					name: 'tagGroup',
					component: tagGroup
				}, {
					path: '/helpInfo',
					name: 'helpInfo',
					component: helpInfo
				}, {
					path: '/platformPush',
					name: 'platformPush',
					component: platformPush
				}, { //数据统计
					path: '/interestTagList',
					name: 'interestTagList',
					component: interestTagList

				}, {
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
