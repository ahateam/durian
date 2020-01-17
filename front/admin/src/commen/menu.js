/*左侧导航栏菜单生成的内容*/
const menu = [{

		title: '资讯管理',
		icon: 'course_guanli1',
		child: [{
				path: '/addContent',
				title: '发布帖子',
			},
			{
				path: '/ContentList',
				title: '帖子列表'
			},
			{
				path: '/ReplyList',
				title: '评论管理'
			}
		]
	},
	{
		title: '商品管理',
		icon: 'course_xueyuanpeizhi',
		child: [{
			path: '/goodsList',
			title: '商品管理',
		}, {
			path: '/orderList',
			title: '订单管理',
		}]
	},
	{
		title: '用户管理',
		icon: 'course__zhuanzhengongzuoliang',
		child: [{
			path: '/adminList',
			title: '管理员管理',
		}, {
			path: '/userList',
			title: '中介用户管理',
		}, {
			path: '/interUserList',
			title: '学生管理',
		}]
	},
	{
		title: '任务管理',
		icon: 'course_tongzhi1',
		child: [{
			path: '/addTask',
			title: '添加任务'
		}, {
			path: '/taskList',
			title: '任务列表'
		}, {
			path: '/myTask',
			title: '我的任务'
		}, {
			path: '/myContract',
			title: '我的合同'
		}, {
			path: '/stepList',
			title: '任务步骤配置'
		}, {
			path: '/moneyProportion',
			title: '抽成比例'
		}],
	},
	{
		title: '审核管理',
		icon: 'course_user',
		child: [{
			path: '/interExamine',
			title: '中介资质审核'
		}, {
			path: '/contentExamine',
			title: '帖子审核'
		}, {
			path: '/goodsExamine',
			title: '商品审核'
		}, {
			path: '/taskExamine',
			title: '任务审核'
		}, {
			path: 'replyExamine',
			title: '评论审核'
		}]

	},
	{
		title: '平台币管理',
		icon: 'course_jilu',
		child: [{
			path: '/investList',
			title: '充值列表'
		}, {
			path: '/virtualcoinList',
			title: '平台币列表'
		}]
	},
	{
		title: '帮助中心',
		icon: 'course_908caidan_anpai',
		child: [{
			path: '/homeTag',
			title: '帮助文案'
		}, {
			path: '/tagGroup',
			title: '智能客服'
		}, {
			path: '/platformPush',
			title: '平台推送'
		}]
	},
	{
		title: '数据统计',
		icon: 'course_tongji',
		child: [{
				path: '/interestTagList',
				title: '测试'
			},
			{
				path: '/enrollList',
				title: '测试'
			}
		]
	},
]
const insiderMenu = [{
	title: '任务管理',
	icon: 'course_tongzhi1',
	child: [{
		path: '/addTask',
		title: '添加任务'
	}, {
		path: '/taskList',
		title: '任务列表'
	}, {
		path: '/myTask',
		title: '我的任务'
	}, {
		path: '/myContract',
		title: '我的合同'
	}],
}]


export default {
	menu,
	insiderMenu
}
