<template>
	<div>
		<el-row class="title-box">
			文章审核
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="posting.postingUpdateTime" label="日期" width="180" :formatter="timeFliter">
				</el-table-column>
				<el-table-column prop="posting.userName" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="posting.postingTextDate" label="文本标题">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
						<el-button @click="updateBtn(scope.row)" type="text" size="small">通过</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small">不通过</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>
		<!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				tableData: [],
				count: 10,
				offset: 0,
				sort: false,
				page: 1,
				pageOver: false,
				loading: true
			}
		},
		methods: {
			// 页面跳转
			infoBtn(info) {
				this.$router.push({
					path: '/contentInfo',
					name: 'contentInfo',
					params: {
						info: info
					}
				})
			},
			// 查看待审核文章详情
			infoBtn() {

			},
			// 待审核文章不通过审核
			delBtn() {

			},
			// 待审核文章通过审核
			updateBtn() {

			},
			// 将时间戳转化为中国时间
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			// 上下翻页点击事件
			changePage(e) {
				this.loading = true
				if (e == 1) {
					// 下一页
					this.page += 1
					this.offset = (this.page - 1) * this.count
					this.getPostingList()
				} else {
					// 上一页
					this.page -= 1
					this.offset = (this.page - 1) * this.count
					this.getPostingList()
				}
				// localStorage.setItem("page_contentList", this.page)
			},
			// 获取待审核文章
			getPostingList() {
				let cnt = {
					moduleId: 1190,
					sort: this.sort,
					status: 1,
					count: this.count,
					offset: this.offset
				}
				this.$api.getPostingList(cnt, (res) => {
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
			this.getPostingList()
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
