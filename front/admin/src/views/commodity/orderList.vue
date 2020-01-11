<template>
	<div>
		<el-row class="title-box">
			订单管理
		</el-row>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="待发货" name="0">
				<el-row class="table-box">
					<el-table border style="width: 100%" :data="tableData" v-loading="loading">
						<el-table-column prop="createTime" label="订单创建时间" width="180" :formatter="timeFliter">
						</el-table-column>
						<el-table-column prop="goodsName" label="商品名称" width="180">
						</el-table-column>
						<el-table-column prop="goodsNumber" label="商品数量" width="180">
						</el-table-column>
						<el-table-column prop="orderStatus" label="订单状态" :formatter="orderStatusFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button>
								<el-button @click="dialogFormVisible = true, rowVal=scope.row" type="text" size="small" v-if="scope.row.orderStatus === 0">发货</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="已发货" name="1">
				<el-row class="table-box">
					<el-table border style="width: 100%" :data="tableData" v-loading="loading">
						<el-table-column prop="createTime" label="订单创建时间" width="180" :formatter="timeFliter">
						</el-table-column>
						<el-table-column prop="goodsName" label="商品名称" width="180">
						</el-table-column>
						<el-table-column prop="goodsNumber" label="商品数量" width="180">
						</el-table-column>
						<el-table-column prop="orderStatus" label="订单状态" :formatter="orderStatusFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button>
								<el-button @click="dialogFormVisible = true, rowVal=scope.row" type="text" size="small" v-if="scope.row.orderStatus === 0">发货</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="已收货" name="2">
				<el-row class="table-box">
					<el-table border style="width: 100%" :data="tableData" v-loading="loading">
						<el-table-column prop="createTime" label="订单创建时间" width="180" :formatter="timeFliter">
						</el-table-column>
						<el-table-column prop="goodsName" label="商品名称" width="180">
						</el-table-column>
						<el-table-column prop="goodsNumber" label="商品数量" width="180">
						</el-table-column>
						<el-table-column prop="orderStatus" label="订单状态" :formatter="orderStatusFliter">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button @click="infoBtn(scope.row)" type="text" size="small">查看详情</el-button>
								<el-button @click="dialogFormVisible = true, rowVal=scope.row" type="text" size="small" v-if="scope.row.orderStatus === 0">发货</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		<!-- 添加快递信息 -->
		<el-dialog title="请添加快递信息" :visible.sync="dialogFormVisible">
			<el-form :model="form" :rules="rules">
				<el-form-item label="快递公司" :label-width="formLabelWidth" prop="name">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="快递单号" :label-width="formLabelWidth" prop="id">
					<el-input v-model="form.id" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="deliverGoods(form)">确认发货</el-button>
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
				activeName: 0,
				rowVal: '',
				dialogFormVisible: false,
				tableData: [],
				status: 1,
				count: 10,
				offset: 0,
				sort: false,
				page: 1,
				pageOver: false,
				loading: true,
				orderStatusList: this.$constData.orderStatusList,
				form: {
					name: '',
					id: ''
				},
				formLabelWidth: '120px',
				rules: {
					name: [{
						required: true,
						message: '请输入快递公司',
						trigger: 'blur'
					}],
					id: [{
						required: true,
						message: '请输入快递单号',
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			// 选择标签页
			handleClick() {
				this.getOrderByStatus()
			},
			// 取消发货
			cancel() {
				this.$message('发货取消');
				this.dialogFormVisible = false
				this.form = ''
			},
			// 发货
			deliverGoods(info) {
				let cnt = {
					orderId: this.rowVal.orderId,
					status: 1,
					shippingInfo: JSON.stringify(info)
				}
				this.$api.setOrderStatus(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '发货成功',
							type: 'success'
						});
						this.dialogFormVisible = false
						this.form = ''
						this.getOrderByStatus()
					} else {
						this.$message.error('请输入快递信息');
					}
				})
			},
			// 页面跳转，查看待审核文章详情
			infoBtn(info) {
				this.$router.push({
					path: '/orderInfo',
					name: 'orderInfo',
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
			// 将订单状态转为文字
			orderStatusFliter(row, col, val) {
				let orderStatusList = this.orderStatusList
				for (let i = 0; i < orderStatusList.length; i++) {
					if (orderStatusList[i].value == val) {
						return orderStatusList[i].name
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
					this.getOrderByStatus()
				} else {
					// 上一页
					this.page -= 1
					this.offset = (this.page - 1) * this.count
					this.getOrderByStatus()
				}
			},
			// 获取所有订单
			getOrderByStatus() {
				let cnt = {
					orderStatus: this.activeName,
					count: this.count,
					offset: this.offset,
				}
				this.$api.getOrderByStatus(cnt, (res) => {
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
			this.getOrderByStatus()
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
