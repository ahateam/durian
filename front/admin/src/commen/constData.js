//全局静态常量

const constData = {}

constData.module = 1190,


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
		name:'正常',
		value: 0
	},
	{
		name:'禁用',
		value: 1
	},
	{
		name:'待审核',
		value: 2
	}
]
/*是否在线商品*/
constData.isOnlineList = [{
		name:'是',
		value: 0
	},
	{
		name:'否',
		value: 1
	},
]
export default constData
