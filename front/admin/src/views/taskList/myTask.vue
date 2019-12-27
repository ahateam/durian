<template>
	<div>
		<el-row class="title-box">
			我的任务
		</el-row>
		<el-row class="content-box">
			<el-col :span="24">
				<div class="block">
					<span style="font-size: 15px;">请选择时间范围</span>
					<el-date-picker v-model="timeRange" value-format="yyyyMMddHHmmss" type="datetimerange" range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="getTimeRange" @blur="loseFocus">
					</el-date-picker>
				</div>
			</el-col>
		</el-row>
		<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="我发布的" name="first">
				<el-row class="table-box">
					<el-table border style="width: 100%" :data="tableData">
						<el-table-column prop="taskName" label="任务名称" width="180">
						</el-table-column>
						<el-table-column prop="taskStatus" label="状态" width="180" :formatter="taskStatusFliter" :filters="[{ text: '等待接收', value: 0 }, { text: '进行中/已分配', value: 1 }, { text: '完成未付/收款', value: 2}, { text: '已付/收款', value: 3}]"
						 :filter-method="filterTag">
						</el-table-column>
						<el-table-column prop="taskCreateTime" label="创建时间" :formatter="timeFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
								<el-button @click="updateBtn(scope.row)" type="text" size="small" v-if="scope.row.taskStatus == 0">修改</el-button>
								<el-button @click="revokeBtn(scope.row)" type="text" size="small" v-if="scope.row.taskStatus == 0">撤销</el-button>
								<el-button @click="deleteBtn(scope.row)" type="text" size="small" v-if="scope.row.taskStatus == 0">删除</el-button>
								<el-button @click="pay(scope.row)" type="text" size="small" v-if="scope.row.taskStatus == 2">付款</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="我接收的" name="second">
				<el-row class="table-box">
					<el-table border style="width: 100%" :data="tableData">
						<el-table-column prop="taskName" label="任务名称" width="180">
						</el-table-column>
						<el-table-column prop="taskStatus" label="状态" width="180" :formatter="taskStatusFliter" :filters="[{ text: '等待接收', value: 0 }, { text: '进行中/已分配', value: 1 }, { text: '完成未付/收款', value: 2}, { text: '已付/收款', value: 3}]"
						 :filter-method="filterTag">
						</el-table-column>
						<el-table-column prop="taskCreateTime" label="创建时间" :formatter="timeFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
								<el-button @click="updateBtn(scope.row)" type="text" size="small" v-if="scope.row.taskStatus != 3">上传文件完成任务</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>
		<el-dialog title="提示" :visible.sync="msg" width="20%">
			<p>{{msgValue}}</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="msg = false">取 消</el-button>
				<el-button type="primary" @click="msg = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				msg: false,
				msgValue: '',
				dialogVisible: false,
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
				taskStatus: this.$constData.taskStatus,
				timeRange: '',
				publishUserId: 403022498109672, //发布者id
			}
		},
		methods: {
			// 撤销待接收的任务
			revokeBtn(info) {
				let cnt = {
					taskId: info.taskId
				}
				this.$api.withdrawTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '撤销成功',
							type: 'success'
						});
					} else {
						this.$message.error('撤销失败，请稍后再试');
					}
				})
			},
			// 删除待接收的任务
			deleteBtn(info) {
				let cnt = {
					taskId: info.taskId
				}
				this.$api.deletDurianTaskByTaskId(cnt, (res) => {
					if(res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					}else {
						this.$message.error('删除失败，请稍后再试');
					}
				})
			},
			handleClick() {
				let cnt = {
					status: 0,
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				this.getContents(cnt)
			},
			// 状态筛选
			filterTag(value, row) {
				return row.taskStatus === value
			},
			// 时间格式转换
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			taskStatusFliter(row, col, val) {
				let statusList = this.taskStatus
				for (let i = 0; i < statusList.length; i++) {
					if (statusList[i].value == val) {
						return statusList[i].name
					}
				}
			},
			changePage(e) {
				if (e) {
					this.page += 1
				} else {
					this.page -= 1
				}
				let cnt = {
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				this.getContents(cnt)
			},
			getContents(cnt) {
				if (this.activeName == 'first') {
					cnt.publishUserId = this.publishUserId
				} else {
					cnt.pickUpUserId = this.publishUserId
				}
				this.$api.getTaskList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						this.loading = false
					} else {
						this.tableData = []
					}
					if (this.tableData.length < this.count) {
						this.pageOver = true
					} else {
						this.pageOver = false
					}
				})
			},
			infoBtn(info) {
				this.$router.push({
					path: '/taskInfo',
					name: 'taskInfo',
					params: {
						info: info
					}
				})
			},
			// 修改待接收任务
			updateBtn(info) {
				info.activeName = this.activeName
				this.$router.push({
					path: '/updateTask',
					name: 'updateTask',
					params: {
						info: info
					}
				})
			},
			// 时间范围筛选
			getTimeRange() {
				let cnt = {
					startTime: this.timeRange[0],
					endTime: this.timeRange[1],
					count: 10,
					offset: 0
				}
				this.$api.getTaskListByTime(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
					}
				})
			},
			// 失去焦点
			loseFocus() {
				if (this.timeRange == null || this.timeRange == "") {
					let cnt = {
						count: 10,
						offset: 0
					}
					this.getContents(cnt)
				}
			},
			pay(info) {
				let cnt = {
					taskId: info.taskId,
					taskStatus: this.$constData.taskStatus[3].value,
				};
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							status: 0,
							count: this.count,
							offset: (this.page - 1) * this.count
						};
						this.getContents(cnt)
					} else {
						this.$message({
							message: '失败',
							type: 'error'
						});
					}
				})
			}
		},
		mounted() {
			let cnt = {
				status: 0,
				count: this.count,
				offset: (this.page - 1) * this.count
			};
			this.getContents(cnt)
		}
	}
</script>

<style>
	.title-box {
		font-size: 16px;
		color: #666;
		line-height: 50px;
		padding-left: 15px;
	}

	.content-box {
		margin-top: 20px;
		padding: 20px;
	}

	.table-box {
		padding: 20px;

	}

	.el-select .el-input {
		width: 100px;
	}
</style>
