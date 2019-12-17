<template>
	<div>
		<el-row class="row-title">
			<h1>基本信息：</h1>
			<p>任务id：{{taskId}}</p>
			<p>发布者id：{{publishUserId}}</p>
			<p>任务类型：{{taskType}}</p>
			<p>任务状态：{{taskStatus}}</p>
			<p>任务名称：{{taskName}}</p>
			<p>接收者所需资质：{{qualifications}}</p>
			<p>任务描述：{{taskDescribe}}</p>
			<p>其他说明：{{otherDescribe}}</p>
			<p>任务预算金额：{{taskBudget}}</p>
			<p>创建时间：{{taskCreateTime}}</p>
			<p>完成时间：{{finishDate}}</p>
			<hr />
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "contetnInfo",
		data() {
			return {
				taskId: '',
				publishUserId: '',
				taskType: '',
				taskName: '',
				qualifications: '',
				taskDescribe: '',
				otherDescribe: '',
				taskBudget: '',
				taskCreateTime: '',
				finishDate:'',
				taskTypeList: this.$constData.taskTypeList,
				taskStatus: this.$constData.taskStatus
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
			taskTypeFliter(val) {
				let taskTypeList = this.taskTypeList
				for (let i = 0; i < taskTypeList.length; i++) {
					if (taskTypeList[i].value == val) {
						return taskTypeList[i].name
					}
				}
			},
			taskStatusFliter(val) {
				let taskStatus = this.taskStatus
				for (let i = 0; i< taskStatus.length; i++) {
					if (taskStatus[i].value == val) {
						return taskStatus[i].name
					}
				}
			}
		},
		mounted() {
			let info = this.$route.params.info
			console.log(info)
			console.log(info.taskName)
			this.taskId = info.taskId
			this.publishUserId = info.publishUserId
			this.taskType = this.taskTypeFliter(info.taskType)
			this.taskStatus = this.taskStatusFliter(info.taskStatus)
			this.taskName = info.taskName
			this.qualifications = info.qualifications
			this.taskDescribe = info.taskDescribe
			this.otherDescribe = info.otherDescribe
			this.taskBudget = info.taskBudget
			this.taskCreateTime = this.timeFliter(info.taskCreateTime)
			this.finishDate = this.timeFliter(info.finishDate)
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
