<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="基本信息" name="first">
			<div>
				<el-row class="row-title">
					<el-col :span="12">
						<h1>基本信息：</h1>
						<p>任务id：{{taskId}}</p>
						<p>发布者id：{{publishUserId}}</p>
						<p>发布者头像：<img width="5%" :src="userInfo.publishUser.userHead"/></p>
						<p>发布者名称：{{userInfo.publishUser.userName}}</p>
						<p>接受者id：{{pickUpUserId}}</p>
						<p>接受者头像：<img width="5%" :src="userInfo.pickUpUser.userHead" /></p>
						<p>接受者名称：{{userInfo.pickUpUser.userName}}</p>
					</el-col>
					<el-col :span="12">
						<p>任务类型：{{taskType}}</p>
						<p>任务状态：{{taskStatus}}</p>
						<p>任务名称：{{taskName}}</p>
						<p>接收者所需资质：{{qualifications}}</p>
						<p>任务描述：{{taskDescribe}}</p>
						<p>其他说明：{{otherDescribe}}</p>
						<p>任务预算金额：{{taskBudget}}</p>
						<p>创建时间：{{taskCreateTime}}</p>
						<p>完成时间：{{finishDate}}</p>
					</el-col>
				</el-row>
			</div>
		</el-tab-pane>
		<el-tab-pane label="文件管理" name="second">
			4444
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		name: "updateTask",
		data() {
			return {
				activeName: 'second',
				region: '',
				regionName: '',
				taskId: '',
				publishUserId: '',
				userInfo:{
					"publishUser":{
						"userHead":''
					},
					"pickUpUser":{
						"userHead":''
					}
				},
				pickUpUserId: '',
				taskType: '',
				taskName: '',
				qualifications: '',
				taskDescribe: '',
				otherDescribe: '',
				taskBudget: '',
				taskCreateTime: '',
				finishDate: '',
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
				for (let i = 0; i < taskStatus.length; i++) {
					if (taskStatus[i].value == val) {
						return taskStatus[i].name
					}
				}
			},
			getUserByTaskId(id) {
				let cnt = {
					taskId: id, // Long 任务id
				};
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.userInfo = this.$util.tryParseJson(res.data.c)
					} else {
						this.tableData = []
					}
				})
			}
		},
		mounted() {
			let info = this.$route.params.info
			this.taskId = info.taskId
			this.publishUserId = info.publishUserId
			this.pickUpUserId = info.pickUpUserId
			this.taskType = this.taskTypeFliter(info.taskType)
			this.taskStatus = this.taskStatusFliter(info.taskStatus)
			this.taskName = info.taskName
			this.qualifications = info.qualifications
			this.taskDescribe = info.taskDescribe
			this.otherDescribe = info.otherDescribe
			this.taskBudget = info.taskBudget
			this.taskCreateTime = this.timeFliter(info.taskCreateTime)
			this.finishDate = this.timeFliter(info.finishDate)
			this.getUserByTaskId(info.taskId)
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
		margin-bottom: 15px;
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
