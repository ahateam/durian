<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				订单详情
			</el-col>
		</el-row>
		<el-row class="row-title">
			<h1>基本信息：</h1>
			<p>订单id：{{orderId}}</p>
			<p>订单类型：{{orderType}}</p>
			<p>订单状态：{{orderStatus}}</p>
			<p>买家id：{{buyerId}}</p>
			<p>卖家id：{{sellerId}}</p>
			<p>地址：{{address}}</p>
			<p>商品id：{{goodsId}}</p>
			<p>商品名称：{{goodsName}}</p>
			<p>商品数量：{{goodsNumber}}</p>
			<p>支付金额：{{payment}}</p>
			<p>支付方式：{{payWay}}</p>
			<p>订单创建时间：{{createTime}}</p>
			<p v-if="!payTime">支付时间：{{payTime}}</p>
			<p v-if="!sendGoodsTime">发货时间：{{sendGoodsTime}}</p>
			<p v-if="!receivingGoodsTime">收货时间：{{receivingGoodsTime}}</p>
			<p v-if="!updateTime">更改时间：{{updateTime}}</p>
			<p v-if="orderStatus != 0">快递公司：{{courierCompany}}</p>
			<p v-if="orderStatus != 0">快递单号：{{courierNumber}}</p>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "userInfo",
		data() {
			return {
				courierCompany: '',
				courierNumber: '',
				orderId: '',
				orderType: '',
				orderStatus: '',
				buyerId: '',
				sellerId: '',
				address: '',
				goodsId: '',
				goodsName: '',
				goodsNumber: '',
				payWay: '',
				payment: '',
				createTime: '',
				payTime: '',
				sendGoodsTime: '',
				receivingGoodsTime: '',
				updateTime: '',
				orderStatusList: this.$constData.orderStatusList,
				orderTypeList: this.$constData.orderTypeList
			}
		},
		methods: {
			timeFliter(val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			// 将订单状态转为文字
			orderStatusFliter(val) {
				let orderStatusList = this.orderStatusList
				for (let i = 0; i < orderStatusList.length; i++) {
					if (orderStatusList[i].value == val) {
						return orderStatusList[i].name
					}
				}
			},
			// 将订单类型转为文字
			orderTypeFliter(val) {
				let orderTypeList = this.orderTypeList
				for (let i = 0; i < orderTypeList.length; i++) {
					if (orderTypeList[i].value == val) {
						return orderTypeList[i].name
					}
				}
			},
			// getReceivingAddressById(addressId) {
			// 	let cnt = {
			// 		addressId: addressId
			// 	}
			// 	this.$api.getReceivingAddressById(cnt, (res) => {
			// 		if (res.data.rc == this.$util.RC.SUCCESS) {
			// 			this.address = this.$util.tryParseJson(res.data.c).address
			// 		}
			// 	})
			// }
		},
		mounted() {
			let info = this.$route.params.info
			console.log(info)
			this.createTime = this.timeFliter(info.createTime)
			this.orderId = info.orderId
			this.orderType = this.orderTypeFliter(info.orderType)
			this.orderStatus = this.orderStatusFliter(info.orderStatus)
			this.buyerId = info.buyerId
			this.sellerId = info.sellerId
			this.goodsId = info.goodsId
			this.goodsName = info.goodsName
			this.goodsNumber = info.goodsNumber
			this.payWay = info.payWay
			this.payment = info.payment
			this.payTime = this.timeFliter(info.payTime)
			this.sendGoodsTime = this.timeFliter(info.sendGoodsTime)
			this.receivingGoodsTime = this.timeFliter(info.receivingGoodsTime)
			this.updateTime = this.timeFliter(info.updateTime)
			this.address = info.addressName
			this.courierCompany = this.$util.tryParseJson(info.shippingInfo).name
			this.courierNumber = this.$util.tryParseJson(info.shippingInfo).id
			// this.getReceivingAddressById(info.addressId)
		}
	}
</script>

<style scoped>
	.row-box {
		background: #fff;
		padding: 15px;
		font-size: 3rem;
		color: #666;
		border-left: 4px solid #67C23A;
	}

	.row-title {
		background: #fff;
		padding-left: 15px;
		font-size: 16px;
		color: #666;
		border-left: 4px solid #67C23A;
		margin-bottom: 100px;
	}

	.row-box1 {
		margin-top: 40px;
		text-align: center;
		padding-bottom: 80px;
	}

	.textInfo>>>table {
		border-top: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}

	.textInfo>>>table td,
	table th {
		border-bottom: 1px solid #ccc;
		border-right: 1px solid #ccc;
		padding: 3px 5px;
	}

	.textInfo>>>table th {
		border-bottom: 2px solid #ccc;
		text-align: center;
	}

	/* blockquote 样式 */
	.textInfo>>>blockquote {
		display: block;
		border-left: 8px solid #d0e5f2;
		padding: 5px 10px;
		margin: 10px 0;
		line-height: 1.4;
		font-size: 100%;
		background-color: #f1f1f1;
	}

	/* code 样式 */
	.textInfo>>>code {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		background-color: #f1f1f1;
		border-radius: 3px;
		padding: 3px 5px;
		margin: 0 3px;
	}

	.textInfo>>>pre code {
		display: block;
	}

	/* ul ol 样式 */
	.textInfo>>>ul,
	ol {
		margin: 10px 0 10px 20px;
	}
</style>
