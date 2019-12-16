<template>
	<div>
		<el-row class="title-box">
			发帖列表
		</el-row>
		<el-row class="content-box">
			<el-button type="primary" round @click="goCreatePosting">我要发帖</el-button>
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData" v-loading="loading">
				<el-table-column prop="posting.postingTextDate" label="标题" width="180">
				</el-table-column>
				<el-table-column prop="posting.postingPageView" label="浏览量" width="180">
				</el-table-column>
				<el-table-column prop="posting.postingCreateTime" label="创建时间" :formatter="timeFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
						<el-button @click="updateBtn(scope.row)" type="text" size="small">修改</el-button>
						<el-button @click="delBtn(scope.row)" type="text" size="small" style="color: red;">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>

		<el-dialog title="帖子修改" :visible.sync="dialogVisible" width="50%">
			<el-row>
				<el-col :span="20">
					<span class="title-box"> 内容：</span>
					<el-input placeholder="请输入标题" v-model="text" type="textarea" :rows="6"></el-input>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-upload class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="tempFileList"
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
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateSubBte">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import ossAuth from '@/commen/oss/ossAuth.js'
	let client = ossAuth.client
	export default {
		data() {
			return {
				id:'',
				text: '',
				show: '',
				fileList: [],
				tempFileList: [],
				showList: this.$constData.showList,
				typeList: this.$constData.typeList,
				loading: true,
				dialogVisible: false,
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
			}
		},
		methods: {
			goCreatePosting() {
				this.$router.push('/addContent')
			},
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			infoBtn(info) {
				this.$router.push({
					path: '/contentInfo',
					name: 'contentInfo',
					params: {
						info: info
					}
				})
			},
			updateBtn(info) {
				this.dialogVisible = true
				this.tempFileList = []
				this.id = info.posting.postingId
				this.text = info.posting.postingTextDate
				this.show = info.posting.showRange
				this.fileList = JSON.parse(info.posting.postingDate)
				for (let i = 0; i < this.fileList.length; i++) {
					let temp = {
						name: i,
						url: this.fileList[i]
					}
					this.tempFileList.push(temp)
				}

			},
			updateSubBte() {
				this.fileList = []
				for (let i = 0; i < this.tempFileList.length; i++) {
					this.fileList.push(this.tempFileList[i].url)
				}
				let cnt = {
					id:this.id,
					show: this.show,
					text: this.text, // String <选填> 文本
					data: this.fileList, // String <选填> 其他图片视频数据
				};
				this.$api.updatePosting(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
						this.dialogVisible = false
						this.getContentsDefault()
					} else {
						this.$message({
							message: res.data.rm,
							type: 'error'
						});
					}
				})
			},
			delBtn(info) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let cnt = {
						moduleId: this.$constData.module,
						id: info.posting.postingId,
					}
					this.$api.delPosting(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getContentsDefault()
						} else {
							this.$message({
								type: 'error',
								message: '删除失败!'
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			
			},
			getContents(cnt) {
				this.$api.getPostingList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						this.loading = false
					} else {
						this.tableData = []
					}
					if (this.tableData.length < this.count) {
						this.pageOver = true
					} else {
						this.pageOver = false
					}
				})
			},
			changePage(e) {
				this.loading = true
				if (e) {
					console.log(e)
					this.page += 1
				} else {
					console.log(e)
					this.page -= 1
				}
				localStorage.setItem("page_contentList", this.page)
				//获取内容列表
				this.getContentsDefault()
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
				this.tempFileList = fileList
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
							let temp = {
								name: src.substring(10, 8),
								url: src
							}
							this.tempFileList.push(temp)
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
			getContentsDefault(){
				let cnt = {
					moduleId: this.$constData.module,
					sort: true, // boolean 是否倒序
					isShowShare: 2,
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				this.getContents(cnt)
			}
		},
		mounted() {
			this.getContentsDefault()
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
