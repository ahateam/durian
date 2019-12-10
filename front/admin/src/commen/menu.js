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
			path: '/goodsType',
			title: '商品分类管理',
		},{
			path: '/goodsList',
			title: '商品管理',
		},{
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
		},{
			path: '/userList',
			title: '普通用户管理',
		},{
			path: '/interUserList',
			title: '管理员管理',
		}]
	},
	{
		title: '任务管理',
		icon: 'course_tongzhi1',
		child: [{
			path: '/taskList',
			title: '任务列表'
		}],
	},
	{
		title: '审核管理',
		icon: 'course_user',
		child: [{
			path: '/interexamine',
			title: '中介资质审核'
		}, {
			path: '/contentExamine',
			title: '文章审核'
		}]
	},
	{
		title: '平台币管理',
		icon: 'course_jilu',
		child: [{
			path: '/investList',
			title: '充值列表'
		},{
			path: '/virtualcoinList',
			title: '平台币列表'
		}]
	}, 
	{
		title: '帮助中心',
		icon: 'course_908caidan_anpai',
		child: [{
			path: '/homeTag',
			title: '测试'
		}, {
			path: '/tagGroup',
			title: '测试'
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



export default {
	menu,
}
