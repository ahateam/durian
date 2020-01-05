<template>
	<div>
		<el-row class="title-box">
			评论审核
		</el-row>
		<el-switch v-model="openAudit" active-text="开启审核" inactive-text="关闭审核" @change="toOpenAudit">
		</el-switch>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="一级评论审核" name="1">
				<el-row class="table-box">
					<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
						<el-table-column prop="title" label="用户名" width="200">
						</el-table-column>
						<el-table-column prop="text" label="评论">
						</el-table-column>
						<el-table-column prop="createTime" label="发布日期" :formatter="timeFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="showContent1(scope.row)" type="text" size="small">查看原帖</el-button>
								<el-button @click="pass1(scope.row)" type="text" size="small">通过</el-button>
								<el-button @click="refuse1(scope.row)" type="text" size="small" style="color: red;">不通过</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row style="height: 80px;">
					<el-col :span="24">
						当前页数：{{page}}
						<el-button type="primary" size="small" :disabled="page==1" @click="changePage(page-1)">上一页</el-button>
						<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(page+1)">下一页</el-button>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="二级评论审核" name="0">
				<el-row class="table-box">
					<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
						<el-table-column prop="upUserName" label="用户名" width="200">
						</el-table-column>
						<el-table-column prop="text" label="评论">
						</el-table-column>
						<el-table-column prop="createTime" label="发布日期" :formatter="timeFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="showContent2(scope.row)" type="text" size="small">查看原帖</el-button>
								<el-button @click="pass2(scope.row)" type="text" size="small">通过</el-button>
								<el-button @click="refuse2(scope.row)" type="text" size="small" style="color: red;">不通过</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row style="height: 80px;">
					<el-col :span="24">
						当前页数：{{page}}
						<el-button type="primary" size="small" :disabled="page==1" @click="changePage(page-1)">上一页</el-button>
						<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(page+1)">下一页</el-button>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script>
	export default {
		name: "contentList",
		data() {
			return {
				auditType: 3,
				openAudit: true,
				replyInfo: '',
				dialogTableVisible: false,
				tableData: [],
				tableData1: [],
				count: 10,
				page: 1,
				sort: true,
				pageOver: true,
				activeName: '1'
			}
		},
		methods: {
			// 通过二级评论查看原帖
			showContent2(info) {
				console.log(info)
				console.log("来了吗")
				let cnt = {
					replyId: info.replyId
				}
				this.$api.getReplyById(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						let cnt = {
							id: this.$util.tryParseJson(res.data.c).ownerId,
							userId: JSON.parse(localStorage.getItem("loginUser")).userId,
							sort: this.sort,
							count: 1,
							offset: 0
						}
						this.$api.getPosting(cnt, (res) => {
							if (res.data.rc == this.$util.RC.SUCCESS) {
								console.log(this.$util.tryParseJson(res.data.c))
								this.$router.push({
									path: '/contentInfo',
									name: 'contentInfo',
									params: {
										info: this.$util.tryParseJson(res.data.c)[0]
									}
								})
							}
						})
					}
				})
			},
			// 通过一级评论查看原帖
			showContent1(info) {
				console.log(JSON.parse(localStorage.getItem("loginUser")))
				let cnt = {
					id: info.ownerId,
					userId: JSON.parse(localStorage.getItem("loginUser")).userId,
					sort: this.sort,
					count: 1,
					offset: 0
				}
				this.$api.getPosting(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						this.$router.push({
							path: '/contentInfo',
							name: 'contentInfo',
							params: {
								info: this.$util.tryParseJson(res.data.c)[0]
							}
						})
					}
				})
			},
			// 开启/关闭审核
			toOpenAudit() {
				console.log("点击")
				let cnt = {
					auditType: this.auditType,
					isNeedAudit: this.openAudit
				}
				this.$api.editAuditStatus(cnt, () => {
					console.log(this.openAudit)
				})
			},
			// 一级评论点击通过
			pass1(info) {
				let cnt = {
					ownerId: info.ownerId,
					status: 1,
					sequenceId: info.sequenceId
				}
				this.$api.examineReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							isReply: this.activeName,
							status: 0,
							sort: true,
							count: this.count,
							offset: (this.page - 1) * this.count
						}
						this.getContents(cnt)
					}
				})
			},
			// 一级评论点击不通过
			refuse1(info) {
				let cnt = {
					ownerId: info.ownerId,
					status: 2,
					sequenceId: info.sequenceId
				}
				this.$api.examineReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							isReply: this.activeName,
							status: 0,
							sort: true,
							count: this.count,
							offset: (this.page - 1) * this.count
						}
						this.getContents(cnt)
					}
				})
			},
			// 二级评论点击通过
			pass2(info) {
				let cnt = {
					replyId: info.replyId,
					status: 1,
					sequenceId: info.sequenceId
				}
				this.$api.examineReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							isReply: this.activeName,
							status: 0,
							sort: true,
							count: this.count,
							offset: (this.page - 1) * this.count
						}
						this.getContents(cnt)
					}
				})
			},
			// 二级评论点击不通过
			refuse2(info) {
				let cnt = {
					replyId: info.replyId,
					status: 2,
					sequenceId: info.sequenceId
				}
				this.$api.examineReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let cnt = {
							isReply: this.activeName,
							status: 0,
							sort: true,
							count: this.count,
							offset: (this.page - 1) * this.count
						}
						this.getContents(cnt)
					}
				})
			},
			handleClick() {
				let cnt = {
					isReply: this.activeName,
					status: 0,
					sort: true,
					count: this.count,
					offset: (this.page - 1) * this.count
				}
				this.getContents(cnt)
			},
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			/*获取评论列表*/
			getContents(cnt) {
				this.$api.getReplyByStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						console.log("让我康康你返回了啥")
						console.log(this.tableData)
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
			/* 分页*/
			changePage(page) {
				this.page = page
				//获取内容列表
				let cnt = {
					status: 0,
					sort: true,
					count: this.count,
					offset: (this.page - 1) * this.count
				}
				this.getContents(cnt)
			},
			infoBtn(info) {
				this.tableData1 = info.comment
				this.dialogTableVisible = true
				// console.log(this.tableData1)
			},
			// 获取是否需要审核
			getAuditStatus() {
				let cnt = {
					auditType: this.auditType
				}
				this.$api.getAuditStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.openAudit = this.$util.tryParseJson(res.data.c).isNeedAudit
						console.log(this.$util.tryParseJson(res.data.c))
					}
				})
			}
		},
		mounted() {
			this.getAuditStatus()
			let cnt = {
				isReply: this.activeName,
				status: 0,
				sort: true,
				count: this.count,
				offset: (this.page - 1) * this.count
			}
			console.log("啦啦啦，开始调试啦")
			this.getContents(cnt)
		}
	}
</script>

<style scoped lang="scss">
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
