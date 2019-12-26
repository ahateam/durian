<template>
	<div>
		<el-row style="padding: 20px">
			<el-col :span="20">
				<span class="title-box"> 内容：</span>
				<el-input placeholder="请输入标题" v-model="text" type="textarea" :rows="10"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-upload class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
				 list-type="picture" :http-request="uploadRequest">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
				</el-upload>
			</el-col>
			<el-col :span="8">
				<el-form label-width="80px">
					<el-form-item label="选择:">
						<el-select v-model="show" placeholder="请选择" style="margin-right: 10px;">
							<el-option v-for="item in showList" :key="item.value" :label="item.name" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row style="margin-top: 20px">
			<el-col :span="12">
				<el-button type="primary" @click="subBtn" style="margin: 0 auto 100px auto;display: block;padding: 15px 50px">提交
				</el-button>
			</el-col>
			<!-- <el-col :span="12">
				<el-button @click="subBtnByDraft" style="margin: 0 auto 100px auto;display: block;padding: 15px 50px">存入草稿箱
				</el-button>
			</el-col> -->
		</el-row>

	</div>
</template>

<script>
	import ossAuth from '@/commen/oss/ossAuth.js'
	let client = ossAuth.client
	export default {

		data() {
			return {
				text: '',
				show: '',
				fileList: [],
				showList: this.$constData.showList,
				typeList: this.$constData.typeList,
			}
		},
		methods: {
			subBtn() {
				let cnt = {
					moduleId: this.$constData.module, // String 模块编号
					type: this.typeList[1].value, // Byte 类型
					upUserId: 403022498089447, // Long 创建者用户编号
					show:this.show,
					postingStatus: 4,
					text: this.text, // String <选填> 文本
					data: this.fileList, // String <选填> 其他图片视频数据
				};
				this.$api.createPosting(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
					}else{
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
							this.fileList.push(src)
							console.log(this.fileList)
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
