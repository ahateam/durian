//全局静态常量

const constData = {}

constData.module = 1190,
	constData.httpurl = 'http://durian-file.oss-ap-southeast-2.aliyuncs.com/',
	/* 帖子状态*/
	constData.statusList = [{
			name: '草稿箱',
			value: 1,
		},
		{
			name: '未通过审核',
			value: 2,
		}, {
			name: '已关闭',
			value: 3,
		}, {
			name: '已发布',
			value: 4,
		},
	]
constData.typeList = [{
		name: '纯文本',
		value: '0'
	},
	{
		name: '图文',
		value: 1
	},
	{
		name: '视频',
		value: 2
	},
	{
		name: '音频',
		value: 3
	}
]
/*商品状态*/
constData.goodsStatusList = [{
		name: '正常',
		value: 0
	},
	{
		name: '禁用',
		value: 1
	},
	{
		name: '待审核',
		value: 2
	}
]
/*是否在线商品*/
constData.isOnlineList = [{
		name: 'AUD',
		value: 0
	},
	{
		name: '平台币',
		value: 1
	},
]
/*任务类型*/
constData.taskTypeList = [{
		name: '全案助理',
		value: 0
	},
	{
		name: '翻译',
		value: 1
	},
	{
		name: '表格填写',
		value: 2
	},
	{
		name: '撰写文书',
		value: 3
	},
	{
		name: '其他',
		value: 4
	}
]
/*任务状态*/
constData.taskStatus = [{
		name: '等待接收',
		value: 0
	},
	{
		name: '进行中/已分配',
		value: 1
	},
	{
		name: '完成未付/收款',
		value: 2
	},
	{
		name: '已付/收款',
		value: 3
	}
]
/*任务步骤类型*/
constData.stepTypeList = [{
		name: '留学',
		value: 0
	},
	{
		name: '移民',
		value: 1
	}
]
/*用户状态*/
constData.userTypeList = [{
			name: '正常',
			value: 0
		},
		{
			name: '禁言',
			value: 1
		}
	]
/*商品类型*/
constData.goodsTypeList = [{
		name: '自由交易',
		value: 0
	},
	{
		name: '平台币商品',
		value: 1
	}
]
/*添加任务类型*/
constData.addTaskList = [{
		name: '全案助理',
		value: '0'
	},
	{
		name: '翻译',
		value: 1
	},
	{
		name: '表格填写',
		value: 2
	},
	{
		name: '撰写文书',
		value: 3
	},
	{
		name: '其他',
		value: 4
	}
]
/*订单状态*/
constData.orderStatusList = [{
		name: '待发货',
		value: 0
	},
	{
		name: '已发货',
		value: 1
	},
	{
		name: '已收货',
		value: 2
	}
]
/*订单类型*/
constData.orderTypeList = [{
		name: '商品',
		value: 0
	},
	{
		name: '打赏',
		value: 1
	},
	{
		name: '任务',
		value: 2
	}
]
export default constData
