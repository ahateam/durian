<template>
	<div>
		<el-row class="row-title">
			<h1>基本信息：</h1>
			<p>商品id：{{goodsId}}</p>
			<p>发布者id：{{senderId}}</p>
			<p>商品名称：{{goodsName}}</p>
			<p>商品分类id：{{goodsClassifyId}}</p>
			<p>库存：{{stock}}</p>
			<p>商品价格：{{goodsPrice}}</p>
			<p>商品描述：{{goodsDescribe}}</p>
			<p>商品图片：<img style="width: 50px;height: 50px;" v-for="(item,index) in goodsData" :key="index" :src="item"/></p>
			<p>商品状态：{{goodsStatus}}</p>
			<p>创建时间：{{createTime}}</p>
			<p>是否在线商品：{{isOnline}}</p>
			<hr />
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "contetnInfo",
		data() {
			return {
				goodsId:'',
				senderId:'',
				goodsName:'',
				goodsClassifyId:'',
				stock:'',
				goodsPrice:'',
				goodsDescribe:'',
				goodsData:[],
				goodsStatus:'',
				createTime:'',
				isOnline:'',
				goodsStatusList: this.$constData.goodsStatusList,
				isOnlineList: this.$constData.isOnlineList,
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
			goodsStatusFliter(val) {
				let goodsStatusList = this.goodsStatusList
				for(let i = 0; i< goodsStatusList.length; i++) {
					if(goodsStatusList[i].value == val) {
						return goodsStatusList[i].name
					}
				}
			},
			isOnlineFliter(val) {
				let isOnlineList = this.isOnlineList
				for(let i = 0; i<isOnlineList.length; i++) {
					if(isOnlineList[i].value == val) {
						return isOnlineList[i].name
					}
				}
			}
		},
		mounted() {
			let info = this.$route.params.info
			console.log(info)
			console.log(info.goodsData)
			this.goodsId = info.goodsId
			this.senderId = info.senderId
			this.goodsName = info.goodsName
			this.goodsClassifyId = info.goodsClassifyId
			this.stock = info.stock
			this.goodsPrice = info.goodsPrice
			this.goodsDescribe = info.goodsDescribe
			this.goodsData = this.$util.tryParseJson(info.goodsData)
			this.goodsStatus = this.goodsStatusFliter(info.goodsStatus)
			this.createTime = this.timeFliter(info.createTime)
			this.isOnline = this.isOnlineFliter(info.isOnline)
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
