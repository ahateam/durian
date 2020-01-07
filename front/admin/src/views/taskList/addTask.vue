<template>
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
				<el-button type="success" plain @click="subBtn(1)">发布任务</el-button>
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
						和接收者共享的图片文件
						<el-upload class="upload-demo" action="" :file-list="fileList" :http-request="uploadRequestImg">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</p>
					<p>
						其他文件
						<el-upload class="upload-demo" action="" :file-list="fileList" :http-request="uploadRequest">
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
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
</template>

<script>
	import ossAuth from '@/commen/oss/ossAuth.js'
	let client = ossAuth.client
	export default {
		data() {
			return {
				pageNumber:'',
				taskCategory:'',
				LanguageList:[],
				Language1:403447297493087,
				Language2:403447297519712,
				qualificationList: [],
				applicantAge: '',
				applicantNationality: '',
				applyNumber: '',
				finishDate: "2019-12-25 07:00:00",
				imgData: '',
				otherDescribe: "特别提醒",
				publishUserId: JSON.parse(localStorage.getItem("loginUser")).userId,
				qualName: "MARN号",
				qualifications: 403025201823662,
				taskBudget: "100",
				taskDescribe: "任务描述",
				taskName: "任务名称",
				viceApplicantAge: '',
				fileData: [],
				imgData: [],
				fileList:[],
				size: '',
				pictureCard: [],
				taskType: '0',
				addTaskList: this.$constData.addTaskList,
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}]
				},
				dialogVisible: false,
				dialogImageUrl: '',
			}
		},
		methods: {
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
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleChange(file, fileData) {
				this.fileData = fileData.slice(-3);
			},
			uploadRequest(op, e) {
				let file = op.file
				this.doUpload(file, 1)
			},
			uploadRequestImg(op) {
				let file = op.file
				this.doUpload(file, 0)
			},
			doUpload(file, e) {
				let date = new Date()
				this.size = file.size
				let tmpName = this.publishUserId + '/' + date.getFullYear() + '' + (1 * date.getMonth() + 1) + '' + date.getDate() +
					'/' +
					encodeURIComponent(file.name)
				this.multipartUpload(tmpName, file, e)
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
							this.imgData.push(upName)
						} else if (val == 1) {
							let re = {
								name: upFile.name,
								url: upName,
								size: this.getfilesize(upFile.size),
							}
							console.log(re)
							this.fileData.push(re)
							console.log(this.fileData)
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
			subBtn(e) {
				let cnt = {
					taskType: this.taskType, // Byte 任务类型
					// pickUpUserId: pickUpUserId, // Long <选填> 接收者用户id
					publishUserId: this.publishUserId, // Long 发布者id
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
					isDrafts: e==0?true:false, // Boolean <选填> 是否存入草稿箱
					finishDate: this.finishDate, // Date <选填> 任务完成时间
				};
				this.$api.createTask(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.$router.push({
							path: '/taskList',
							name: 'taskList',
						})
						this.$message({
							message: '已发布',
							type: 'success'
						});
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
			getLanguage(){
				let cnt = {
					count: 400,
					offset: 0,
				};
				this.$api.getLanguage(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.LanguageList= this.$util.tryParseJson(res.data.c)
						console.log(this.LanguageList)
					} else {
				
					}
				})
			}
		},
		mounted() {
			this.getByQualId()
			this.getLanguage()
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

	.input-suffix {
		font-size: 15px;
	}
</style>
