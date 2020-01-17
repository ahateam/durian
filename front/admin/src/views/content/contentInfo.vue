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
			<p>发布者头像：<img style="width: 50px;height: 50px;" :src="userHead" /> </p>
			<p>图片：
				<div class="demo-image">
					<img v-for="item in postingDate"  :key="item" style="width: 100px; height: 100px" :src="ossurl+item"/>
				</div>
			</p>
			<hr />
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "contetnInfo",
		data() {
			return {
				postingDate: [],
				contentInfo: '',
				postingId: '',
				postingTextDate: '',
				postingCreateTime: '',
				postingExt: '',
				postingPageView: '',
				postingShareNumber: '',
				postingStatus: '',
				postingTags: '',
				postingType: '',
				postingUpdateTime: '',
				userId: '',
				userName: '',
				userHead: '',
				statusList: this.$constData.statusList,
				typeList: this.$constData.typeList,
				ossurl:this.$constData.httpurl,
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
			this.postingDate = JSON.parse(info.postingDate)
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
			this.userHead = this.$constData.httpurl + info.userHead
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
