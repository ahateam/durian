<template>
	<div>
		<el-row class="row-box">
			<el-col :span="24">
				用户详情
			</el-col>
		</el-row>
		<el-row class="row-title">
			<h1>基本信息：</h1>
			<p>用户头像：<img :src="userHead" width="5%" /> </p>
			<p>用户名称：{{userName}}</p>
			<p v-if="sex">性别：{{sex}}</p>
			<p>电话：{{phone}}</p>
			<p v-if="brithday">生日：{{brithday}}</p>
			<p>创建时间：{{createTime}}</p>
			<p>平台币余额：{{currency}}</p>
			<p>密码：{{pwd}}</p>
			<p v-if="updateTime">信息更改时间：{{updateTime}}</p>
			<p>状态：{{userStatus}}</p>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "userInfo",
		data() {
			return {
				brithday: '',
				createTime: '',
				currency: '',
				phone: '',
				pwd: '',
				sex: '',
				updateTime: '',
				userHead: '',
				userId: '',
				userName: '',
				userSig: '',
				userSigCreateTime: '',
				userStatus: '',
				userType: '',
				userTypeList: this.$constData.userTypeList
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
			if(info.brithday != null) {
				this.brithday = this.timeFliter(info.brithday)
			}
			this.createTime = this.timeFliter(info.createTime)
			this.currency = info.currency
			this.phone = info.phone
			this.pwd = info.pwd
			this.sex = info.sex
			if(info.updateTime != null) {
				this.updateTime = this.timeFliter(info.updateTime)
			}
			this.userHead = info.userHead
			this.userId = info.userId
			this.userName = info.userName
			this.userStatus = this.userTypeFliter(info.userStatus)
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
