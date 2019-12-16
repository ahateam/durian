<template>
	<div>
		<el-row class="title-box">
			发帖列表
		</el-row>
		<el-row class="content-box">
			<el-button type="primary" round @click="dialogVisible = true">我要发帖</el-button>
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="posting.postingTextDate" label="标题" width="180">
				</el-table-column>
				<el-table-column prop="posting.postingPageView" label="浏览量" width="180">
				</el-table-column>
				<el-table-column prop="posting.postingCreateTime" label="创建时间" :formatter="timeFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
						<el-button @click="updateBtn(scope.row)" type="text" size="small">修改</el-button>
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
		<el-dialog title="帖子详情" :visible.sync="dialogVisible" width="30%">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading:true,
				dialogVisible: false,
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
			}
		},
		methods: {
			adduser() {

			},
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			infoBtn(info){
				this.$router.push({
					path: '/contentInfo',
					name: 'contentInfo',
					params: {
						info: info
					}
				})
			},
			getContents(cnt) {
				this.$api.getPostingList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						this.loading = false
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
			changePage(e) {
				this.loading = true
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
					moduleId: this.$constData.module,
					sort: true, // boolean 是否倒序
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				this.getContents(cnt)
			},
		},
		mounted() {
			let cnt = {
				moduleId: this.$constData.module,
				sort: true, // boolean 是否倒序
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
