<template>
	<div>
		<el-row class="title-box">
			任务步骤条描述配置
		</el-row>
		<el-row class="content-box">
			<el-button type="primary" round @click="dialogVisible = true">创建</el-button>
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData">
				<el-table-column prop="stepName" label="描述" width="180">
				</el-table-column>
				<el-table-column prop="stepType" label="类型" width="180" :formatter="stepTypeListFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="upBtn(scope.row)" type="text" size="small">修改</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<el-button :type="stepCurr == index?'primary':'text'" size="mini" round @click="changeType(index)" v-for="(item,index) in stepTypeList">{{item.name}}</el-button>
			<el-input v-model="inputStep" placeholder="请输入描述"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addStep">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="showUp" width="30%">
			<el-button style="margin-bottom: 8px;" :type="stepCurr == index?'primary':'text'" size="mini" round @click="changeType(index)"
			 v-for="(item,index) in stepTypeList">{{item.name}}</el-button>
			<el-input v-model="inputUpStep" placeholder="请输入描述"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showUp = false">取 消</el-button>
				<el-button type="primary" @click="upStep">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				stepCurr: 0,
				inputUpStep: '',
				stepInfo: {
					"stepId": '',
					"stepName": '',
					"stepType": ''
				},
				inputStep: '',
				dialogVisible: false,
				showUp: false,
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
				stepTypeList: this.$constData.stepTypeList
			}
		},
		methods: {
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			stepTypeListFliter(row, col, val) {
				let list = this.stepTypeList
				for (let i = 0; i < list.length; i++) {
					if (list[i].value == val) {
						return list[i].name
					}
				}
			},
			changeType(e) {
				this.stepCurr = e
				this.type = e
				this.stepInfo.stepType = e
			},
			addStep() {
				let cnt = {
					stepName: this.inputStep,
					stepType: this.stepCurr,
				};
				this.$api.createTaskSteps(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							count: this.count,
							offset: (this.page - 1) * this.count
						};
						this.getContents(cnt)
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.dialogVisible = false
					} else {
						this.$message({
							message: '出现错误',
							type: 'error'
						});
					}
				})
			},
			upBtn(info) {
				this.showUp = true
				this.stepInfo = info
			},
			delBtn(info) {
				let cnt = {
					stepId: info.stepId,
				};
				this.$api.deleteTaskSteps(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							count: this.count,
							offset: (this.page - 1) * this.count
						};
						this.getContents(cnt)
						this.$message({
							message: '操作成功',
							type: 'success'
						});
					} else {
						this.$message({
							message: '出现错误',
							type: 'error'
						});
					}
				})
			},
			upBtn(info) {
				this.showUp = true
				this.stepInfo = info
				this.stepCurr = info.stepType
				this.inputUpStep = info.stepName
			},
			upStep() {
				let cnt = {
					stepId: this.stepInfo.stepId, // Long 步骤id
					stepName: this.inputUpStep, // String <选填> 步骤名称
					stepType: this.stepCurr, // Byte <选填> 步骤类型
				};
				this.$api.editTaskSteps(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							count: this.count,
							offset: (this.page - 1) * this.count
						};
						this.getContents(cnt)
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.showUp = false
					} else {
						this.$message({
							message: '出现错误',
							type: 'error'
						});
					}
				})
			},
			changePage(e) {
				if (e) {
					this.page += 1
				} else {
					this.page -= 1
				}
				//获取内容列表
				let cnt = {
					count: this.count,
					offset: (this.page - 1) * this.count
				}
				this.getContents(cnt)
			},
			getContents(cnt) {
				this.$api.getTaskStepsList(cnt, (res) => {
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
		},
		mounted() {
			let cnt = {
				// stepType: stepType, // Byte <选填> 步骤类型
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
</style>
