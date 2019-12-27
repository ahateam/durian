<template>
	<div>
		<el-row class="title-box">
			商品管理
		</el-row>
		<el-row class="content-box">
			<el-button type="primary" round @click="createGoods">发布商品</el-button>
		</el-row>
		<div style="margin-top: 15px; width: 50%; margin-left: 20px;">
			<el-input placeholder="请输入商品名称" v-model="title" class="input-with-select" @input="getDefault">
				<el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
			</el-input>
		</div>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="createTime" label="发布日期" width="180" :formatter="timeFliter">
				</el-table-column>
				<el-table-column prop="goodsType" label="商品类型" width="180" :formatter="goodsTypeFliter" :filters="[{ text: '自由交易', value: 0 }, { text: '平台币商品', value: 1 }]" 
					:filter-method="filterTag">
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称" width="180">
				</el-table-column>
				<el-table-column prop="goodsDescribe" label="商品描述">
				</el-table-column>
				<el-table-column prop="isOnline" label="商品标签" :formatter="isOnlineFliter" :filters="[{ text: '实物', value: 0 }, { text: '虚拟', value: 1 }, { text: '兑换', value: 2 }]" 
					:filter-method="filterTag2">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button>
						<el-button @click="upperShelf(scope.row)" type="text" size="small" v-if="scope.row.goodsStatus === 1">上架</el-button>
						<el-button @click="lowerShelf(scope.row)" type="text" size="small" style="color: red;" v-if="scope.row.goodsStatus === 0">下架</el-button>
						<el-button type="text" size="small" style="color: red;" v-if="scope.row.goodsStatus === 2">未审核</el-button>
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
				tableData: [],
				moduleId: 1190,
				count: 10,
				offset: 0,
				sort: false,
				page: 1,
				pageOver: false,
				loading: true,
				title: '',
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
			// 搜索栏清空重新获取
			getDefault(){
				if(this.title == ''){
					this.page = 1
					this.offset = 0
					this.pageOver = false
					this.loading = true
					this.getGoodsList()
				}
			},
			// 商品名称搜索
			toSearch() {
				if(this.title == '') {
					return
				}
				this.page = 1
				this.offset = 0
				this.pageOver = false
				this.loading = true
				this.getByGoodsName()
			},
			// 根据商品名称查询
			getByGoodsName() {
				let cnt = {
					goodsName: this.title,
					count: this.count,
					offset: this.offset
				}
				this.$api.getByGoodsName(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						this.loading = false
						if (this.tableData.length < this.count) {
							this.pageOver = true
						} else {
							this.pageOver = false
						}
						console.log(this.pageOver)
					}
				})
			},
			// 页面跳转，查看待审核文章详情
			infoBtn(info) {
				this.$router.push({
					path: '/goodsInfo',
					name: 'goodsInfo',
					params: {
						info: info
					}
				})
			},
			// 下架商品
			lowerShelf(info) {
				let cnt = {
					goodsId: info.goodsId,
					goodsStatus: 1
				}
				this.$api.setGoodsStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getGoodsList()
						console.log("下架商品")
					}
				})
			},
			// 上架商品
			upperShelf(info) {
				let cnt = {
					goodsId: info.goodsId,
					goodsStatus: 0
				}
				this.$api.setGoodsStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getGoodsList()
						console.log("上架商品")
					}
				})
			},
			// 商品标签筛选
			filterTag2(value, row){
				return row.isOnline === value
			},
			// 商品类型筛选
			filterTag(value, row) {
				return row.goodsType === value
			},
			// 将时间戳转化为中国时间
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			// 将商品类型转为文字
			goodsTypeFliter(row, col, val) {
				let goodsTypeList = this.goodsTypeList
				for (let i = 0; i < goodsTypeList.length; i++) {
					if (goodsTypeList[i].value == val) {
						return goodsTypeList[i].name
					}
				}
			},
			// 商品标签转文字
			isOnlineFliter(row, col, val) {
				let isOnlineList = this.isOnlineList
				for (let i = 0; i < isOnlineList.length; i++) {
					if (isOnlineList[i].value == val) {
						return isOnlineList[i].name
					}
				}
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
			getGoodsList() {
				let cnt = {
					count: this.count,
					offset: this.offset,
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
			}
		},
		mounted() {
			this.getGoodsList()
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
