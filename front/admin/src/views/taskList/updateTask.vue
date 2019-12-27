<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="信息修改" name="first">
			<div>
				请先选择任务分类
				<el-select v-model="taskType" placeholder="请选择">
					<el-option v-for="item in addTaskList" :key="item.value" :label="item.name" :value="item.value">
					</el-option>
				</el-select>
				<el-row v-if="taskType">
					<el-col :span="12" style="margin-right: 40px;">
						<div class="input-suffix">
							<p>
								任务名称
								<el-input placeholder="请输入内容" v-model="taskName">
								</el-input>
							</p>
							<p v-if="taskType == 1">
								页数
								<el-input placeholder="请输入内容" v-model="pageNumber">
								</el-input>
								<el-select v-model="Language1" placeholder="请选择">
									<el-option v-for="item in LanguageList" :key="item.languageId" :label="item.languageName" :value="item.languageName">
									</el-option>
								</el-select>
								<i class="el-icon-refresh"></i>
								<el-select v-model="Language2" placeholder="请选择">
									<el-option v-for="item in LanguageList" :key="item.languageId" :label="item.languageName" :value="item.languageName">
									</el-option>
								</el-select>
							</p>
							<p v-if="taskType == 0">
								申请人数
								<el-input placeholder="请输入内容" v-model="applyNumber">
								</el-input>
							</p>
							<p v-if="taskType == 2">
								表格类别
								<el-input placeholder="请输入内容" v-model="taskCategory">
								</el-input>
							</p>
							<p v-if="taskType == 3">
								文书类别
								<el-input placeholder="请输入内容" v-model="taskCategory">
								</el-input>
							</p>
							<p v-if="taskType == 0">
								主申请人国籍
								<el-input placeholder="请输入内容" v-model="applicantNationality">
								</el-input>
							</p>
							<p v-if="taskType == 0">
								主申请人年龄
								<el-input placeholder="请输入内容" v-model="applicantAge">
								</el-input>
							</p>
							<p v-if="taskType == 0">
								低于18岁副申请人人数
								<el-input placeholder="请输入内容" v-model="viceApplicantAge">
								</el-input>
							</p>
						</div>
						<el-button type="success" plain @click="subBtn(1)">修改并发布任务</el-button>
						<el-button plain @click="subBtn(0)">保存为草稿箱</el-button>
					</el-col>
					<el-col :span="9">
						<div class="input-suffix">
							<p>
								任务者所需资质</br>
								<el-select v-model="qualifications" placeholder="请选择">
									<el-option v-for="item in qualificationList" :key="item.qualId" :label="item.qualName" :value="item.qualId">
									</el-option>
								</el-select>
							</p>
							<p>
								任务描述
								<el-input placeholder="请输入内容" v-model="taskDescribe">
								</el-input>
							</p>
							<p>
								特别提醒
								<el-input placeholder="请输入内容" v-model="otherDescribe">
								</el-input>
							</p>
							<p>
								你给多少钱
								<el-input placeholder="请输入内容" v-model="taskBudget">
								</el-input>
							</p>
							<p>
								完成时间
								<el-date-picker v-model="finishDate" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions">
								</el-date-picker>
							</p>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-tab-pane>
		<el-tab-pane label="文件管理" name="second">
			<el-upload class="upload-demo" action="" :file-list="fileList" :http-request="uploadRequest">
				<el-button size="small" type="primary">点击上传</el-button>
				<el-button type="success" plain @click="addTaskFile">确定提交</el-button>
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
				activeName: 'first',
				activeNameRouter: '',
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
				applyNumber: '',
				applicantAge: '',
				applicantNationality: '',
				pickUpUserId: '',
				pickerOptions: '',
				viceApplicantAge: '',
				taskType: '0',
				taskName: '',
				qualifications: '',
				taskDescribe: '',
				otherDescribe: '',
				taskBudget: '',
				taskCreateTime: '',
				finishDate: '',
				qualificationList: [],
				LanguageList: [],
				Language1: '',
				Language2: '',
				addTaskList: this.$constData.addTaskList,

				List: this.$constData.taskTypeList,
				taskStatus: this.$constData.taskStatus
			}
		},
		methods: {
			subBtn(e) {
				let cnt = {
					taskId:this.taskId,
					taskType: this.taskType, // Byte 任务类型
					// pickUpUserId: pickUpUserId, // Long <选填> 接收者用户id
					publishUserId: 403022498109672, // Long 发布者id
					taskName: this.taskName, // String 任务名称
					taskCategory:  this.taskCategory, // String <选填> （表格、文书）具体类别
					oldLanguage: this.Language1, // String <选填> 翻译任务原语种
					newLanguage: this.Language2, // String <选填> 翻译任务目标语种
					qualifications: this.qualifications, // Long 任务接收者所需资质
					taskDescribe: this.taskDescribe, // String 任务描述
					otherDescribe: this.otherDescribe, // String 其他说明
					applyNumber: this.applyNumber, // Integer <选填> 申请人数
					applicantNationality: this.applicantNationality, // String <选填> 主申请人国籍
					applicantAge: this.applicantAge, // Integer <选填> 主申请人年龄
					viceApplicantAge: this.viceApplicantAge, // Integer <选填> 低于18岁副申请人年龄
					pageNumber:  this.pageNumber, // Integer <选填> 页数
					// Taskcontent: Taskcontent, // String <选填> 内容
					fileData: this.fileData, // String <选填> 上传文件地址
					imgData: this.imgData, // String <选填> 图片地址
					taskBudget: this.taskBudget, // Double 任务预算金额
					// payPrice: payPrice, // Double <选填> 付款金额
					status: e==0?2:3, // Boolean <选填> 是否存入草稿箱
					finishDate: this.finishDate, // Date <选填> 任务完成时间
				};
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$router.push({
							path: '/taskList',
							name: 'taskList',
						})
						this.$message({
							message: '操作成功',
							type: 'success'
						});
					} else {
			
					}
				})
			},
			getLanguage() {
				let cnt = {
					count: 400,
					offset: 0,
				};
				this.$api.getLanguage(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.LanguageList = this.$util.tryParseJson(res.data.c)
						console.log(this.LanguageList)
					} else {

					}
				})
			},
			getByQualId() {
				let cnt = {
					count: 400,
					offset: 0,
				};
				this.$api.getByQualId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.qualificationList = this.$util.tryParseJson(res.data.c)

					} else {

					}
				})
			},
			setUrl(val) {
				return this.$constData.httpurl + val
			},
			handleDelete(index, row) {
				this.tableData.splice(index)
				this.updateTaskFile(this.tableData)
			},
			handleview(index, row) {
				let num = row.name.lastIndexOf(".");
				let suffix = row.name.substring(num + 1);
				if (!(suffix == 'docx' || suffix == 'doc' || suffix == 'pdf')) {
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
							this.tableData.push(refile)
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
			addStep() {
				//增加记录
				let cnt = {
					stepId: 403664102698373, // Long 步骤id
					taskId: this.taskId, // Long 任务id
				};
				this.$api.createChangeRecord(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$message({
							message: '成功',
							type: 'success'
						});
					} else {
						this.$message({
							message: '发生错误',
							type: 'error'
						});
					}
				})
			},
			addTaskFile() {
				let cnt = {
					taskId: this.taskId,
					fileData: this.tableData, //上传文件地址
				};
				if (this.activeNameRouter == "second") {
					cnt.taskStatus = this.$constData.taskStatus[2].value
				}
				this.$api.updateTaskByTaskId(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getFileByTaskId(this.taskId)
						this.addStep()
					} else {

					}
				})
			}
		},
		mounted() {
			let info = this.$route.params.info
			console.log(info)
			this.pageNumber = info.pageNumber
			this.taskId = info.taskId
			this.Language1 = info.oldLanguage
			this.Language2 = info.newLanguage
			this.publishUserId = info.publishUserId
			this.pickUpUserId = info.pickUpUserId
			this.applyNumber = info.applyNumber
			this.taskCategory = info.taskCategory
			this.applicantNationality = info.applicantNationality
			this.applicantAge = info.applicantAge
			this.viceApplicantAge = info.viceApplicantAge
			// this.taskType = this.taskTypeFliter(info.taskType)
			this.taskType = info.taskType+''
			console.log(this.taskType)
			this.taskStatus = this.taskStatusFliter(info.taskStatus)
			this.taskName = info.taskName
			this.qualifications = info.qualifications
			this.taskDescribe = info.taskDescribe
			this.otherDescribe = info.otherDescribe
			this.taskBudget = info.taskBudget
			this.taskCreateTime = this.timeFliter(info.taskCreateTime)
			this.finishDate = this.timeFliter(info.finishDate)
			this.tableData = JSON.parse(info.fileData)
			this.activeNameRouter = info.activeName
			this.getUserByTaskId(info.taskId)
			this.getByQualId()
			this.getLanguage()
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
