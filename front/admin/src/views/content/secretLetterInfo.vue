<template>
	<div>
		<el-row class="title-box">
			密信
		</el-row>
		<el-row class="content-box">
		</el-row>
		<el-row class="table-box">
			<el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
				<el-table-column prop="reply.upUserName" label="用户名" width="200">
				</el-table-column>
				<el-table-column prop="reply.text" label="密信">
				</el-table-column>
				<el-table-column prop="reply.createTime" label="发布日期" :formatter="timeFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="delBtn(scope.row)" type="text" style="color: red;" size="small">删除</el-button>
						<el-button @click="infoBtn(scope.row)" type="text" size="small">查看回复</el-button>
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

		<el-dialog title="回复" :visible.sync="dialogTableVisible">
			<el-table :data="tableData1" style="width: 100%;margin-bottom: 20px;">
				<el-table-column prop="commentInfo.upUserName" label="用户名" width="200">
				</el-table-column>
				<el-table-column prop="commentInfo.text" label="评论">
				</el-table-column>
				<!-- <el-table-column prop="appraiseCount" label="点赞数">
				</el-table-column> -->
				<el-table-column prop="commentInfo.createTime" label="发布日期" :formatter="timeFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="delCommentBtn(scope.row,scope.$index)" type="text" style="color: red;" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				replyInfo: '',
				tableData: [],
				tableData1: [],
				dialogTableVisible: false,
				count: 10,
				page: 1,
				pageOver: true,
			}
		},
		methods: {
			infoBtn(info) {
				this.tableData1 = info.comment
				this.dialogTableVisible = true
				// console.log(this.tableData1)
			},
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			/*获取密信列表*/
			getContents(cnt) {
				this.$api.getSecretLetter(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						if(this.tableData[0].reply == null){
							this.tableData = []
						}
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
					postingId: this.replyInfo.postingId,
					count: this.count,
					offset: (this.page - 1) * this.count
				}
				this.getContents(cnt)
			},
			//删除回复
			delCommentBtn(info, index) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(info)
					console.log(info.commentInfo.sequenceId)
					let cnt = {
						letterId: info.commentInfo.sequenceId,
					}
					this.$api.deleteSecretLetter(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.tableData1.splice(index, 1)
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!'
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
			/* 删除内容*/
			delBtn(info) {
				console.log(info)
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let cnt = {
						letterId: info.sequenceId,
					}
					this.$api.deleteSecretLetter(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							let cnt = {
								postingId: this.replyInfo.postingId,
								count: this.count,
								offset: (this.page - 1) * this.count
							}
							this.getContents(cnt)
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!'
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
		},
		mounted() {
			let info = this.$route.params.info.posting
			console.log("=============")
			console.log(info)
			console.log("=============")
			this.replyInfo = info
			let cnt = {
				postingId: info.postingId,
				count: this.count,
				offset: (this.page - 1) * this.count
			}
			this.getContents(cnt)
		}
	}
</script>

<style>
</style>
