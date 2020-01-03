<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				{{contentInfo.title}}
			</el-col>
		</el-row>
		<el-row class="row-title">
			<h1>基本信息：</h1>
			<p>内容id：{{postingId}}</p>
			<p>标题：{{postingTextDate}}</p>
			<p>创建时间：{{postingCreateTime}}</p>
			<p>扩展信息：{{postingExt}}</p>
			<p>浏览量：{{postingPageView}}</p>
			<p>分享数：{{postingShareNumber}}</p>
			<p>状态：{{postingStatus}}</p>
			<p>标签：{{postingTags}}</p>
			<p>类型：{{postingType}}</p>
			<p>修改时间：{{postingUpdateTime}}</p>
			<p>发布者id ：{{userId}}</p>
			<p>发布者名称 ：{{userName}}</p>
			<p>发布者头像：<img style="width: 50px;height: 50px;" :src="userHead"/> </p>
			<hr />
		</el-row>

		<!-- <div v-if="contentInfo.type != '3'">
			<div v-for="(item,index) in textList" :key="index">
				<div v-html="item.value" v-if="item.type == 'textarea'" style="padding: 20px;" class="textInfo"></div>
				<img :src="item.value" v-else>
			</div>
		</div>

		<div v-else style="width: 100%">
			<video width="576" height="324" style="margin: 0 auto;display: block" controls>
				<source :src="JSON.parse(contentInfo.data).url" type="video/mp4">
				您的浏览器不支持html5的video标签
			</video>
			<div style="font-size: 20px;font-weight: bold;margin-left:50px">
				封面图：
				<img :src="JSON.parse(contentInfo.data).imgSrc">
			</div>
		</div>

		<el-col :span="24" class="row-box1">
			<el-button @click="goBack()">返回上一层</el-button>
		</el-col> -->
	</div>
</template>

<script>
	export default {
		name: "contetnInfo",
		data() {
			return {
				contentInfo:'',
				postingId:'',
				postingTextDate:'',
				postingCreateTime:'',
				postingExt:'',
				postingPageView:'',
				postingShareNumber:'',
				postingStatus:'',
				postingTags:'',
				postingType:'',
				postingUpdateTime:'',
				userId:'',
				userName:'',
				userHead:'',
				statusList: this.$constData.statusList,
				typeList: this.$constData.typeList,
			}
		},
		methods: {
			timeFliter(val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			statusFliter(val) {
				let statusList = this.statusList
				for (let i = 0; i < statusList.length; i++) {
					if (statusList[i].value == val) {
						return statusList[i].name
					}
				}
			},
			typeFliter(val) {
				let typeList = this.typeList
				for (let i = 0; i < typeList.length; i++) {
					if (typeList[i].value == val) {
						return typeList[i].name
					}
				}
			}
		},
		mounted() {
			this.contentInfo = this.$route.params.info
			let info = this.$route.params.info.posting
			console.log(info)
			this.postingId = info.postingId
			this.postingTextDate = info.postingTextDate
			this.postingCreateTime = this.timeFliter(info.postingCreateTime)
			this.postingExt = info.postingExt
			this.postingPageView = info.postingPageView
			this.postingShareNumber = info.postingShareNumber
			this.postingStatus = this.statusFliter(info.postingStatus)
			this.postingTags = info.postingTags
			this.postingType = this.typeFliter(info.postingType)
			this.postingUpdateTime = this.timeFliter(info.postingUpdateTime)
			this.userId = info.userId
			this.userName = info.userName
			this.userHead = this.$constData.httpurl+info.userHead
		}
	}
</script>

<style scoped>
	.row-box {
		background: #fff;
		padding: 15px;
		font-size: 3rem;
		color: #666;
		border-left: 4px solid #67C23A;
	}

	.row-title {
		background: #fff;
		padding-left: 15px;
		font-size: 16px;
		color: #666;
		border-left: 4px solid #67C23A;
	}

	.row-box1 {
		margin-top: 40px;
		text-align: center;
		padding-bottom: 80px;
	}

	.textInfo>>>table {
		border-top: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}

	.textInfo>>>table td,
	table th {
		border-bottom: 1px solid #ccc;
		border-right: 1px solid #ccc;
		padding: 3px 5px;
	}

	.textInfo>>>table th {
		border-bottom: 2px solid #ccc;
		text-align: center;
	}

	/* blockquote 样式 */
	.textInfo>>>blockquote {
		display: block;
		border-left: 8px solid #d0e5f2;
		padding: 5px 10px;
		margin: 10px 0;
		line-height: 1.4;
		font-size: 100%;
		background-color: #f1f1f1;
	}

	/* code 样式 */
	.textInfo>>>code {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		background-color: #f1f1f1;
		border-radius: 3px;
		padding: 3px 5px;
		margin: 0 3px;
	}

	.textInfo>>>pre code {
		display: block;
	}

	/* ul ol 样式 */
	.textInfo>>>ul,
	ol {
		margin: 10px 0 10px 20px;
	}
</style>
