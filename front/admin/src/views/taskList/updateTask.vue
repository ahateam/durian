<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="基本信息" name="first">
			<div>
				<el-row class="row-title">
					<el-col :span="12">
						<h1>基本信息：</h1>
						<p>任务id：{{taskId}}</p>
						<p>发布者id：{{publishUserId}}</p>
						<p>发布者头像：<img width="5%" :src="userInfo.publishUser.userHead" /></p>
						<p>发布者名称：{{userInfo.publishUser.userName}}</p>
						<div v-if="pickUpUserId">
							<p>接受者id：{{pickUpUserId}}</p>
							<p>接受者头像：<img width="5%" :src="userInfo.pickUpUser.userHead" /></p>
							<p>接受者名称：{{userInfo.pickUpUser.userName}}</p>
						</div>
					</el-col>
					<el-col :span="12">
						<p>任务类型：{{taskType}}</p>
						<p>任务状态：{{taskStatus}}</p>
						<p>任务名称：{{taskName}}</p>
						<p>接收者所需资质：{{qualifications}}</p>
						<p>任务描述：{{taskDescribe}}</p>
						<p>其他说明：{{otherDescribe}}</p>
						<p>任务预算金额：{{taskBudget}}</p>
						<p>创建时间：{{taskCreateTime}}</p>
						<p>完成时间：{{finishDate}}</p>
					</el-col>
				</el-row>
			</div>
		</el-tab-pane>
		<el-tab-pane label="文件管理" name="second">
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange"
			 :file-list="fileList" :http-request="uploadRequest">
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
			<el-table :data="tableData" style="width: 100%" size="medium">
				<el-table-column label="" width="50">
					<template slot-scope="scope">
						<i class="el-icon-tickets"></i>
					</template>
				</el-table-column>
				<el-table-column label="文件名">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p>文件大小: {{ scope.row.size }}</p>
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="mini" @click="handleview(scope.$index, scope.row)">下载/预览</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
		<el-dialog title="预览" :visible.sync="showImg" width="60%">
			<iframe :src="url" style="height: 450px;width: 100%;"></iframe>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showImg = false">取 消</el-button>
			</span>
		</el-dialog>
	</el-tabs>
</template>

<script>
	import ossAuth from '@/commen/oss/ossAuth.js'
	let client = ossAuth.client
	export default {
		name: "updateTask",
		data() {
			return {
				showImg: false,
				url: '',
				fileList: [],
				tableData: [],
				activeName: 'second',
				region: '',
				regionName: '',
				taskId: '',
				publishUserId: '',
				userInfo: {
					"publishUser": {
						"userHead": ''
					},
					"pickUpUser": {
						"userHead": ''
					}
				},
				pickUpUserId: '',
				taskType: '',
				taskName: '',
				qualifications: '',
				taskDescribe: '',
				otherDescribe: '',
				taskBudget: '',
				taskCreateTime: '',
				finishDate: '',
				taskTypeList: this.$constData.taskTypeList,
				taskStatus: this.$constData.taskStatus
			}
		},
		methods: {
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-3);
			},
			handleDelete(index, row) {
				this.tableData.splice(index)
				this.updateTaskFile(this.tableData)
			},
			handleview(index, row) {
				let num = row.name.lastIndexOf(".");
				let suffix = row.name.substring(num + 1);
				if(!(suffix == 'docx' || suffix == 'doc' ||suffix == 'pdf')){
					this.showImg = true
				}
				let url = client.signatureUrl(row.url);
				this.url = url
			},
			timeFliter(val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			taskTypeFliter(val) {
				let taskTypeList = this.taskTypeList
				for (let i = 0; i < taskTypeList.length; i++) {
					if (taskTypeList[i].value == val) {
						return taskTypeList[i].name
					}
				}
			},
			taskStatusFliter(val) {
				let taskStatus = this.taskStatus
				for (let i = 0; i < taskStatus.length; i++) {
					if (taskStatus[i].value == val) {
						return taskStatus[i].name
					}
				}
			},
			getUserByTaskId(id) {
				let cnt = {
					taskId: id, // Long 任务id
				};
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.userInfo = this.$util.tryParseJson(res.data.c)
						this.tableData = JSON.parse(this.userInfo.publishUser.fileData)
					} else {

					}
				})
			},
			getFileByTaskId(id) {
				let cnt = {
					taskId: id, // Long 任务id
				};
				this.$api.getUserByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let info = this.$util.tryParseJson(res.data.c)
						this.tableData = JSON.parse(info.publishUser.fileData)
					}
				})
			},
			getfilesize(size) {
				if (!size)
					return "";
				let num = 1024.00; //byte
				if (size < num)
					return size + "B";
				if (size < Math.pow(num, 2))
					return (size / num).toFixed(2) + "K"; //kb
				if (size < Math.pow(num, 3))
					return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
				if (size < Math.pow(num, 4))
					return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
				return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
			},
			uploadRequest(op) {
				let file = op.file
				this.doUpload(file)
			},
			doUpload(file) {
				let date = new Date()
				this.size = file.size
				let tmpName = this.publishUserId + '/' + date.getFullYear() + '' + (1 * date.getMonth() + 1) + '' + date.getDate() +
					'/' +
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
							let refile = {
								name: upFile.name,
								url: upName,
								size: this.getfilesize(upFile.size),
							}
							this.addTaskFile(refile)

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
			updateTaskFile() {
				let cnt = {
					taskId: this.taskId,
					fileData: this.tableData, //上传文件地址
				};
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {

					} else {

					}
				})
			},
			addTaskFile(obj) {
				this.tableData.push(obj)
				let cnt = {
					taskId: this.taskId,
					fileData: this.tableData, //上传文件地址
				};
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getFileByTaskId(this.taskId)
					} else {

					}
				})
			}
		},
		mounted() {
			let info = this.$route.params.info
			this.taskId = info.taskId
			this.publishUserId = info.publishUserId
			this.pickUpUserId = info.pickUpUserId
			this.taskType = this.taskTypeFliter(info.taskType)
			this.taskStatus = this.taskStatusFliter(info.taskStatus)
			this.taskName = info.taskName
			this.qualifications = info.qualifications
			this.taskDescribe = info.taskDescribe
			this.otherDescribe = info.otherDescribe
			this.taskBudget = info.taskBudget
			this.taskCreateTime = this.timeFliter(info.taskCreateTime)
			this.finishDate = this.timeFliter(info.finishDate)
			this.tableData = JSON.parse(info.fileData)
			this.getUserByTaskId(info.taskId)
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
		margin-bottom: 15px;
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

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}
</style>
