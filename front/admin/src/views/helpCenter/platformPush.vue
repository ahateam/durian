<template>
	<div>
		<el-row class="title-box">
			商品管理
		</el-row>
		<el-row class="content-box">
			<el-button type="primary" round @click="createPlatformPush">发布商品</el-button>
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="pushDate" label="发布日期" :formatter="timeFliter">
				</el-table-column>
				<el-table-column prop="pushTitle" label="推送标题">
				</el-table-column>
				<el-table-column prop="pushText" label="推送内容">
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
				tableData: [],
				count: 10,
				offset: 0,
				page: 1,
				pageOver: false,
				loading: true,
				goodsTypeList: this.$constData.goodsTypeList,
				isOnlineList: this.$constData.isOnlineList
			}
		},
		methods: {
			// 发布商品
			createGoods() {
				this.$router.push({
					path: '/addGoods',
					name: 'addGoods',
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
					if(this.title == '') {
						this.getGoodsList()
					}else {
						this.getByGoodsName()
					}
				} else {
					// 上一页
					this.page -= 1
					this.offset = (this.page - 1) * this.count
					if(this.title == '') {
						this.getGoodsList()
					}else {
						this.getByGoodsName()
					}
				}
			},
			// 获取所有通过审核的商品
			getPlatformPushList() {
				let cnt = {
					count: this.count,
					offset: this.offset,
				}
				this.$api.getPlatformPushList(cnt, (res) => {
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
			this.getPlatformPushList()
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
		padding: 20px;
	}

	.table-box {
		padding: 20px;

	}
</style>

