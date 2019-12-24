<template>
	<div>
		<el-row class="title-box">
			商品审核
		</el-row>
		<el-switch v-model="openAudit" active-text="开启审核" inactive-text="关闭审核" @change="toOpenAudit">
		</el-switch>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="createTime" label="发布日期" width="180" :formatter="timeFliter">
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称" width="180">
				</el-table-column>
				<el-table-column prop="goodsDescribe" label="商品描述">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button>
						<el-button @click="updateBtn(scope.row)" type="text" size="small">通过</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small" style="color: red;">不通过</el-button>
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
				auditType: 1,
				tableData: [],
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
			// 页面跳转，查看待审核商品详情
			infoBtn(info) {
				this.$router.push({
					path: '/goodsInfo',
					name: 'goodsInfo',
					params: {
						info: info
					}
				})
			},
			// 待审核商品不通过审核
			delBtn(info) {
				let cnt = {
					goodsId: info.goodsId,
					goodsStatus: 1
				}
				this.$api.setGoodsStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getGoodsList()
						console.log("未通过审核")
					}
				})
			},
			// 待审核商品通过审核
			updateBtn(info) {
				let cnt = {
					goodsId: info.goodsId,
					goodsStatus: 0
				}
				this.$api.setGoodsStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getGoodsList()
						console.log("通过审核")
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
					this.getGoodsList()
				} else {
					// 上一页
					this.page -= 1
					this.offset = (this.page - 1) * this.count
					this.getGoodsList()
				}
				// localStorage.setItem("page_contentList", this.page)
			},
			// 获取待审核商品
			getGoodsList() {
				let cnt = {
					goodsType: 0,
					goodsStatus: 2,
					count: this.count,
					offset: this.offset
				}
				this.$api.getGoodsList(cnt, (res) => {
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
			// 获取是否需要审核
			getAuditStatus() {
				let cnt = {
					auditType: this.auditType
				}
				this.$api.getAuditStatus(cnt, (res) => {
					if(res.data.rc == this.$util.RC.SUCCESS) {
						this.openAudit = this.$util.tryParseJson(res.data.c).isNeedAudit
						console.log(this.$util.tryParseJson(res.data.c))
					}
				})
			}
		},
		mounted() {
			this.getGoodsList()
			this.getAuditStatus()
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
