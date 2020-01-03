<template>
	<div>
		<el-row class="title-box">
			帮助
		</el-row>
		<el-row class="content-box" style="margin: 0px; padding: 0 0 0 20px;">
			<el-button type="primary" round @click="dialogFormVisible1 = true">添加帮助</el-button>
		</el-row>
		<div style="margin-top: 15px; width: 50%; margin-left: 20px;">
			<el-input placeholder="请输入帮助问题" v-model="title" class="input-with-select" @input="getDefault">
				<el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
			</el-input>
		</div>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="tag" label="问题" width="180">
				</el-table-column>
				<el-table-column prop="context" label="相关帮助">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button>
						<el-button type="text" size="small" @click="dialogFormVisible = true, form = scope.row">修改</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<!-- 帮助添加 -->
		<el-dialog title="帮助添加" :visible.sync="dialogFormVisible1">
			<el-form v-model="form1">
				<el-form-item label="问题" :label-width="formLabelWidth">
					<el-input v-model="form1.tag" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="相关帮助" :label-width="formLabelWidth">
					<el-input v-model="form1.context" autocomplete="off" type="textarea" autosize></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="canCreate">取 消</el-button>
				<el-button type="primary" @click="createHelp(form1)">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 帮助修改 -->
		<el-dialog title="帮助修改" :visible.sync="dialogFormVisible">
			<el-form v-model="form">
				<el-form-item label="问题" :label-width="formLabelWidth">
					<el-input v-model="form.tag" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="相关帮助" :label-width="formLabelWidth">
					<el-input v-model="form.context" autocomplete="off" type="textarea" autosize></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="updateBtn(form)">确 定</el-button>
			</div>
		</el-dialog>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				count: 10,
				offset: 0,
				page: 1,
				pageOver: false,
				loading: true,
				title: '',
				tag: '',
				context: '',
				dialogFormVisible: false,
				dialogFormVisible1: false,
				form: {
					autoReplyId: '',
					tag: '',
					context: '',
				},
				form1: {
					autoReplyId: '',
					tag: '',
					context: '',
				},
				formLabelWidth: '120px'
			}
		},
		methods: {
			// 添加帮助
			createHelp(info) {
				console.log(info)
				let cnt = {
					tag: info.tag,
					context: info.context,
					type: 0
				}
				this.$api.createAutoReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getAutoReplyList()
						this.$message({
							type: 'success',
							message: '添加成功!'
						});
						this.dialogFormVisible1 = false
						this.form1 = ''
					} else {
						this.$message({
							message: '请输入问题和相关帮助',
							type: 'warning'
						});
					}
				})
			},
			// 点击取消添加
			canCreate() {
				this.$message({
					type: 'info',
					message: '添加已取消'
				});
				this.dialogFormVisible1 = false
				this.form1 = ''
			},
			// 点击取消修改
			cancel() {
				this.$message({
					type: 'info',
					message: '修改已取消'
				});
				this.dialogFormVisible = false
			},
			// 搜索栏清空重新获取
			getDefault() {
				if (this.title == '') {
					this.page = 1
					this.offset = 0
					this.pageOver = true
					this.loading = true
					this.getAutoReplyList()
				}
			},
			// 文章标题搜索
			toSearch() {
				if (this.title == '') {
					return
				}
				this.page = 1
				this.offset = 0
				this.pageOver = true
				this.loading = true
				this.getAutoReplyList()
			},
			// 页面跳转，查看待审核文章详情
			infoBtn(info) {
				this.$router.push({
					path: '/helpInfo',
					name: 'helpInfo',
					params: {
						info: info
					}
				})
			},
			// 删除帮助文案
			delBtn(info) {
				this.$confirm('此操作将永久删除该帮助文案, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(info)
					let cnt = {
						autoReplyId: info.autoReplyId
					}
					this.$api.delAutoReply(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.getAutoReplyList()
							this.$message({
								type: 'success',
								message: '删除成功!'
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
			// 修改帮助文案
			updateBtn(info) {
				let cnt = {
					autoReplyId: info.autoReplyId,
					tag: info.tag,
					context: info.context
				}
				this.$api.editAutoReply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getAutoReplyList()
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						this.dialogFormVisible = false
					}
				})
			},
			// 上下翻页点击事件
			changePage(e) {
				this.loading = true
				if (e == 1) {
					// 下一页
					this.page += 1
					this.offset = (this.page - 1) * this.count
					this.getAutoReplyList()
				} else {
					// 上一页
					this.page -= 1
					this.offset = (this.page - 1) * this.count
					this.getAutoReplyList()
				}
				// localStorage.setItem("page_contentList", this.page)
			},
			// 获取帮助
			getAutoReplyList() {
				let cnt = {
					tag: this.title,
					count: this.count,
					offset: this.offset,
					type: 0
				}
				this.$api.getAutoReplyList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						this.loading = false
						if (this.tableData.length < this.count) {
							this.pageOver = true
						} else {
							this.pageOver = false
						}
						console.log(this.$util.tryParseJson(res.data.c))
					}
				})
			}
		},
		mounted() {
			this.getAutoReplyList()
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
