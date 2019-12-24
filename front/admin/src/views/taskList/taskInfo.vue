<template>
	<div>
		<el-row class="row-title">
			<el-col :span="12">
				<h1>基本信息：</h1>
				<p>任务id：{{taskId}}</p>
				<p>发布者id：{{publishUserId}}</p>
				<p>发布者头像：<img width="5%" :src="setUrl(userInfo.publishUser.userHead)" /></p>
				<p>发布者名称：{{userInfo.publishUser.userName}}</p>
				<div v-if="pickUpUserId">
					<p>接受者id：{{pickUpUserId}}</p>
					<p>接受者头像：<img width="5%" :src="setUrl(userInfo.pickUpUser.userHead)" /></p>
					<p>接受者名称：{{userInfo.pickUpUser.userName}}</p>
				</div>
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
		<el-row style="margin-bottom: 100px;">
			<div>
				<el-steps direction="vertical" :active="active" finish-status="success">
					<el-step :title="item.stepName" :description="timeFliter(item.changeTime)" v-for="(item,index) in stepList" :key="index"></el-step>
				</el-steps>
			</div>
			<el-button style="margin-top: 12px;" @click="readyNext" v-if="false">下一步</el-button>
		</el-row>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<el-button style="margin-bottom: 8px;" :type="stepCurr == index?'primary':'text'" size="mini" round @click="changeType(index)"
			 v-for="(item,index) in stepTypeList">{{item.name}}</el-button>
			<el-select v-model="region" placeholder="请选择活动步骤描述" filterable clearable @change="stepListValueFun">
				<el-option :label="item.stepName" :value="item.stepId" v-for="(item,index) in explainList" :key="index" :disabled="item.disabled"></el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="next">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "contetnInfo",
		data() {
			return {
				userInfo: {
					"publishUser": {
						"userHead": ''
					},
					"pickUpUser": {
						"userHead": ''
					}
				},
				type: 0,
				stepCurr: 0,
				dialogVisible: false,
				region: '',
				regionName: '',
				stepList: [{
					"stepName": "生成任务"
				}, {
					"stepName": "创建任务完成"
				}],
				explainList: [{
					"stepId": 1,
					"stepName": "签证已递交"
				}, {
					"stepId": 2,
					"stepName": "签证申请补材料清单已发"
				}, {
					"stepId": 3,
					"stepName": "签证申请补材料已发"
				}],
				active: 2,
				taskId: '',
				publishUserId: '',
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
				taskStatus: this.$constData.taskStatus,
				stepTypeList: this.$constData.stepTypeList
			}
		},
		methods: {
			setUrl(val){
				return this.$constData.httpurl+val
			},
			// 时间格式转换
			timeFliter(val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			changeType(e) {
				this.stepCurr = e
				this.type = e
				this.getTaskStepsList()
			},
			stepListValueFun(val) {
				let obj = {};
				obj = this.explainList.find((item) => {
					return item.stepId === val;
				});
				let getName = ''
				getName = obj.stepName;
				this.regionName = getName
			},
			readyNext() {
				if (this.active++ > 1) {
					this.dialogVisible = true
				}
			},
			next() {
				if (this.region == '') {
					this.$message({
						message: '请选择一个活动步骤描述',
						type: 'warning'
					});
					return
				}
				this.dialogVisible = false
				if (this.active++ > 1) {
					let step = {
						text: this.regionName
					}
					//增加记录
					let cnt = {
						stepId: this.region, // Long 步骤id
						taskId: this.taskId, // Long 任务id
					};
					this.$api.createChangeRecord(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.$message({
								message: '成功',
								type: 'success'
							});
						} else {
							this.$message({
								message: '发生错误',
								type: 'error'
							});
						}
					})
					this.stepList.push(step)
					this.getChangeRecordList(this.taskId)
					this.region = ''
				}
			},
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
			getTaskStepsList() {
				let cnt = {
					stepType: this.type,
					count: 400,
					offset: 0,
				};
				this.$api.getTaskStepsList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.explainList = this.comparison(this.stepList, this.$util.tryParseJson(res.data.c))
					} else {
						this.tableData = []
					}
				})
			},
			getChangeRecordList(id) {
				let cnt = {
					taskId: id, // Long 任务id
					count: 400, // Integer 
					offset: 0, // Integer 
				};
				this.$api.getChangeRecordList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.stepList = this.$util.tryParseJson(res.data.c)
						this.active = this.stepList.length
						this.explainList = this.comparison(this.stepList, this.explainList)
					} else {
						this.tableData = []
					}
				})
			},
			comparison(stepArr, expArr) {
				for (let i = 0; i < stepArr.length; i++) {
					for (let j = 0; j < expArr.length; j++) {
						if (stepArr[i].stepId == expArr[j].stepId) {
							expArr[j].disabled = true
						}
					}
				}
				return expArr
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
			this.getChangeRecordList(info.taskId)
			this.getTaskStepsList(info.taskId)
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
