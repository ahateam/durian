<template>
	<div>
		<el-row class="title-box">
			管理员管理
		</el-row>
		<el-row class="content-box">
			<el-button type="primary" round @click="addUser">创建管理员</el-button>
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData">
				<el-table-column prop="userName" label="用户名" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="180">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" :formatter="timeFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
						<el-button @click="updateBtn(scope.row)" type="text" size="small">修改</el-button>
						<el-button @click="deleteBtn(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>

		<el-dialog title="提示" :visible.sync="isUserInfo" width="30%">
			<p>1111</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="isUserInfo = false">取 消</el-button>
				<el-button type="primary" @click="isUserInfo = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isUserInfo: false,
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
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
			// 添加管理员
			addUser() {
				this.$router.push({
					path: '/addAdmin',
					name: 'addAdmin',
				})
			},
			changePage(e) {
				if (e) {
					console.log(e)
					this.page += 1
				} else {
					console.log(e)
					this.page -= 1
				}
				localStorage.setItem("page_contentList", this.page)
				//获取内容列表
				let cnt = {
					count: this.count,
					offset: (this.page - 1) * this.count
				}
				this.getContents(cnt)
			},
			getContents(cnt) {
				this.$api.getUserList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						console.log(this.tableData)
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
					path: '/userInfo',
					name: 'userInfo',
					params: {
						info: info
					}
				})
			},
			deleteBtn(info) {
				this.$confirm('是否删除该管理员', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let cnt = {
						userId: info.userId
					}
					this.$api.deleteUser(cnt, (res) => {
						if(res.data.rc == this.$util.RC.SUCCESS) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							let cnt = {
								type: 0, // Byte <选填> 用户类型
								count: this.count,
								offset: (this.page - 1) * this.count
							};
							this.getContents(cnt)
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 修改管理员信息
			updateBtn(info) {
				this.$router.push({
					path: '/updateAdmin',
					name: 'updateAdmin',
					params: {
						info: info
					}
				})
			}
		},
		mounted() {
			let cnt = {
				type: 0, // Byte <选填> 用户类型
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
