<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="任务步骤" name="first">
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
				<el-row style="height: 80px;margin-bottom: 50px;">
					当前页数：{{page}}
					<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
					<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
				</el-row>

				<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
					<el-select v-model="stepCurr" placeholder="请选择">
						<el-option v-for="item in tableData1" :key="item.stepTypeId" :label="item.stepTypeName" :value="item.stepTypeId">
						</el-option>
					</el-select>
					<el-input v-model="inputStep" placeholder="请输入描述"></el-input>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button type="primary" @click="addStep">确 定</el-button>
					</span>
				</el-dialog>
				<el-dialog title="修改" :visible.sync="showUp" width="30%">
					<el-select v-model="stepCurr" placeholder="请选择">
						<el-option v-for="item in tableData1" :key="item.stepTypeId" :label="item.stepTypeName" :value="item.stepTypeId">
						</el-option>
					</el-select>
					<el-input v-model="inputUpStep" placeholder="请输入描述"></el-input>
					<span slot="footer" class="dialog-footer">
						<el-button @click="showUp = false">取 消</el-button>
						<el-button type="primary" @click="upStep">确 定</el-button>
					</span>
				</el-dialog>
			</div>
		</el-tab-pane>
		<el-tab-pane label="任务步骤类型" name="second">
			<el-row>
				<el-col :span="6">
					<el-input v-model="typeName" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button style="margin-left: 10px;" type="success" plain @click="addstepType">提交</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-table border style="width: 100%" :data="tableData1">
					<el-table-column prop="stepTypeName" label="类型名称" width="180">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button @click="upBtnType(scope.row)" type="text" size="small">修改</el-button>
							<el-button @click="delBtnType(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row style="height: 80px;margin-bottom: 50px;">
				当前页数：{{page}}
				<el-button type="primary" size="small" :disabled="page1==1" @click="changePageType(0)">上一页</el-button>
				<el-button type="primary" size="small" :disabled="pageOver1" @click="changePageType(1)">下一页</el-button>
			</el-row>
		</el-tab-pane>
		<el-dialog title="修改类型名称" :visible.sync="showUpType" width="30%">
			<el-input v-model="inputUpStepType" placeholder="输入类型名称"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showUpType = false">取 消</el-button>
				<el-button type="primary" @click="upStepType">确 定</el-button>
			</span>
		</el-dialog>
	</el-tabs>
</template>

<script>
	export default {
		data() {
			return {
				inputUpStepType: '',
				showUpType: false,
				typeName: '',
				stepCurr: '',
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
				tableData1: [],
				count: 10,
				page: 1,
				pageOver: true,
				count1: 10,
				page1: 1,
				pageOver1: true,
				stepTypeList: [],
				activeName: 'first',
				StepTypeId: '',
			}
		},
		methods: {
			upStepType(info) {
				let cnt = {
					stepId: this.StepTypeId,
					stepName: this.inputUpStepType
				}
				this.$api.editTaskStepType(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getTaskStepsTypeList()
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
					this.showUpType = false
				})
			},
			upBtnType(info) {
				this.showUpType = true
				this.inputUpStepType = info.stepTypeName
				this.StepTypeId = info.stepTypeId
			},
			delBtnType(info) {
				this.$confirm('此操作将永久删除及该类型下的所有步骤, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let cnt = {
						stepId: info.stepTypeId
					}
					this.$api.deleteTaskStepType(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.getTaskStepsTypeList()
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
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			getTaskStepsTypeList() {
				let cnt = {
					count: this.count1,
					offset: (this.page1 - 1) * this.count1
				}
				this.$api.getTaskStepsTypeList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData1 = this.$util.tryParseJson(res.data.c)
					} else {
						this.tableData1 = []
					}
					if (this.tableData1.length < this.count1) {
						this.pageOver1 = true
					} else {
						this.pageOver1 = false
					}
				})
			},
			addstepType() {
				let cnt = {
					stepName: this.typeName
				}
				this.$api.createTaskStepType(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getTaskStepsTypeList()
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
			handleClick(tab, event) {
				if (tab.name == 'second') this.getTaskStepsTypeList()
			},
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			stepTypeListFliter(row, col, val) {
				let list = this.tableData1
				for (let i = 0; i < list.length; i++) {
					if (list[i].stepTypeId == val) {
						return list[i].stepTypeName
					}
				}
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
			changePageType(e) {
				if (e) {
					this.page1 += 1
				} else {
					this.page1 -= 1
				}
				this.getTaskStepsTypeList()
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
			this.getTaskStepsTypeList()
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
