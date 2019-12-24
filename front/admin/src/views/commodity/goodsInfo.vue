<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				商品详情
			</el-col>
		</el-row>
		<el-row class="row-title">
			<h1>基本信息：</h1>
			<p>商品id：{{goodsId}}</p>
			<p>发布者id：{{senderId}}</p>
			<p>商品名称：{{goodsName}}</p>
			<p>商品类型：{{goodsType}}</p>
			<p>商品关键字：{{keyword}}</p>
			<p>库存：{{stock}}</p>
			<p>商品价格：{{goodsPrice}}</p>
			<p>商品描述：{{goodsDescribe}}</p>
			<p>商品图片：<img :src="goodsData" width="5%" /></p>
			<p>商品状态：{{goodsStatus}}</p>
			<p>创建时间：{{createTime}}</p>
			<p>获取方式：{{isOnline}}</p>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "userInfo",
		data() {
			return {
				goodsId:'',
				senderId:'',
				goodsName:'',
				goodsType:'',
				keyword:'',
				stock:'',
				goodsPrice:'',
				goodsDescribe:'',
				goodsData:[],
				goodsStatus:'',
				createTime:'',
				isOnline:''
				// userTypeList: this.$constData.userTypeList
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
			userTypeFliter(val) {
				let userTypeList = this.userTypeList
				for(let i = 0; i< userTypeList.length; i++) {
					if(userTypeList[i].value == val) {
						return userTypeList[i].name
					}
				}
			}
		},
		mounted() {
			let info = this.$route.params.info
			console.log(info)
			this.createTime = this.timeFliter(info.createTime)
			this.goodsId = info.goodsId
			this.senderId = info.senderId
			this.goodsName = info.goodsName
			this.goodsType = info.goodsType
			this.keyword = info.keyword 
			this.stock = info.stock
			this.goodsPrice = info.goodsPrice
			this.goodsDescribe = info.goodsDescribe
			this.goodsData = info.goodsData
			this.goodsStatus = info.goodsStatus
			this.isOnline = info.isOnline
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
