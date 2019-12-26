<template>
	<div>
		<el-row class="title-box">
			评论管理
		</el-row>
		<div style="margin-top: 15px; width: 50%; margin-left: 20px;">
			<el-input placeholder="请输入文章标题" v-model="title" class="input-with-select" @input="getDefault">
				<el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
			</el-input>
		</div>
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
						<!-- <el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button> -->
						<el-button @click="viewReply(scope.row)" type="text" size="small">查看评论</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
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
				openAudit: true,
				auditType: 0,
				tableData: [],
				moduleId: 1190,
				count: 10,
				offset: 0,
				sort: false,
				page: 1,
				pageOver: false,
				loading: true,
				title: '',
			}
		},
		methods: {
			// 搜索栏清空重新获取
			getDefault(){
				if(this.title == ''){
					this.page = 1
					this.offset = 0
					this.pageOver = true
					this.loading = true
					this.getPostingList()
				}
			},
			// 文章标题搜索
			toSearch() {
				if(this.title == '') {
					return
				}
				this.page = 1
				this.offset = 0
				this.pageOver = true
				this.loading = true
				this.getPostingList()
			},
			// 页面跳转，查看通过审核文章详情
			infoBtn(info) {
				this.$router.push({
					path: '/contentInfo',
					name: 'contentInfo',
					params: {
						info: info
					}
				})
			},
			// 查看一级评论
			viewReply(info) {
				this.$router.push({
					path: '/replyInfo',
					name: 'replyInfo',
					params: {
						info: info
					}
				})
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
			// 获取通过审核文章
			getPostingList() {
				let cnt = {
					moduleId: this.moduleId,
					sort: this.sort,
					status: 4,
					count: this.count,
					offset: this.offset,
					text: this.title,
					// isShowShare: 1
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
			},
		},
		mounted() {
			this.getPostingList()
			// this.getAuditStatus()
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
