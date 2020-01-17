<template>
	<div>
		<el-row style="padding: 20px">
			<el-col :span="20">
				<span class="title-box"> 商品名称：</span>
				<el-input placeholder="请输入名称" v-model="goodsName"></el-input>
			</el-col>
			<el-col :span="8">
				<span class="title-box"> 价格：</span>
				<el-input placeholder="请输入价格" v-model.number="goodsPrice"></el-input>
			</el-col>
			<el-col :span="5" style="margin-left: 25px;">
				<span class="title-box"> 商品类型：</span>
				<el-form label-width="80px">
					<el-select v-model="goodsType" placeholder="请选择" style="margin-right: 10px;">
						<el-option label="自由交易" value="0"></el-option>
						<el-option label="平台币商品" value="1"></el-option>
					</el-select>
				</el-form>
			</el-col>
			<el-col :span="5" style="margin-left: 15px;">
				<span class="title-box"> 库存：</span>
				<el-input placeholder="请输入库存" v-model.number="stock"></el-input>
			</el-col>
			<el-col :span="20">
				<span class="title-box"> 商品描述：</span>
				<el-input placeholder="描述一下吧" v-model="goodsDescribe" type="textarea" :rows="10"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-upload class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
				 list-type="picture" :http-request="uploadRequest">
					<el-button size="small" type="primary">点击上传图片</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
				</el-upload>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px">
			<el-col :span="12">
				<el-button type="primary" @click="subBtn" style="margin: 0 auto 100px auto;display: block;padding: 15px 50px">提交
				</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import ossAuth from '@/commen/oss/ossAuth.js'
	let client = ossAuth.client
	export default {

		data() {
			return {
				goodsName: '',
				goodsPrice: '',
				goodsType: '',
				stock: '',
				goodsDescribe: '',
				show: '',
				fileList: [],
				userId: JSON.parse(localStorage.getItem("loginUser")).userId,
				showList: this.$constData.showList,
				typeList: this.$constData.typeList,
			}
		},
		methods: {
			subBtn() {
				if(this.goodsType == ''){
					this.$message.error('请选择商品类型')
					return
				}
				let cnt = {
					goodsName: this.goodsName,
					senderId: this.userId,
					goodsType: this.goodsType,
					stock: this.stock,
					goodsPrice: this.goodsPrice,
					goodsDescribe: this.goodsDescribe,
					goodsData: this.fileList
				};
				this.$api.createGoods(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
					} else {
						this.$message({
							message: res.data.rm,
							type: 'error'
						});
					}
				})

			},
			subBtnByDraft() {

			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			uploadRequest(op) {
				let file = op.file
				this.doUpload(file)
			},
			doUpload(file) {
				let date = new Date()
				this.size = file.size
				let tmpName = 'durianData/image/' + date.getFullYear() + '' + (1 * date.getMonth() + 1) + '' + date.getDate() + '/' +
					encodeURIComponent(file.name)
				this.multipartUpload(tmpName, file, 0)
			},
			multipartUpload(upName, upFile, val) {
				//Vue中封装的分片上传方法（详见官方文档）
				let _this = this
				try {
					let result = client.multipartUpload(upName, upFile, {
						meta: {
							year: 2017,
							people: 'test'
						}
					}).then(res => {
						//取出存好的url
						let address = res.res.requestUrls[0]
						let _index = address.indexOf('?')
						let src = ''
						if (_index == -1) {
							src = address
						} else {
							src = address.substring(0, _index)
						}
						if (val == 0) {
							this.fileList.push(upName)
						}
					}).catch(err => {
						console.log(err)
					})
				} catch (e) {
					// 捕获超时异常
					if (e.code === 'ConnectionTimeoutError') {
						console.log("Woops,超时啦!");
					}
					console.log(e)
				}
			},
		},
		mounted() {}
	}
</script>

<style>
</style>
