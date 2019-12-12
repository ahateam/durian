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
export default constData
