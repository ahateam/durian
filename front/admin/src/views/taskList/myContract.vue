<template>
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		<el-tab-pane label="创建合同" name="first">
			<el-select v-model="contractType" placeholder="请选择合同模版" style="width: 120px;">
				<el-option v-for="item in contractTypeList" :key="item.value" :label="item.name" :value="item.value">
				</el-option>
			</el-select>
			<el-row v-if="isnext">
				<p>甲方Party A:</p>
				<el-col :span="8">
					委托人Client：<el-input v-model="clientName" placeholder="请输入内容"></el-input>
					其他申请人名字：<el-input v-model="deputyApplicantName" placeholder="请输入内容"></el-input>
					地址Address：<el-input v-model="address" placeholder="请输入内容"></el-input>
					联系电话Contact Number：<el-input v-model="phone" placeholder="请输入内容"></el-input>
					联系电邮 Email：<el-input v-model="interEmail" placeholder="请输入内容"></el-input>
					<p>
						递交申请时申请人所在地 Location of the applicants：
						<el-input v-model="onAddress" placeholder="请输入内容"></el-input>
						<el-radio v-model="onshore" label="澳洲境内">澳洲境内 Onshore</el-radio>
						<el-radio v-model="onshore" label="澳洲境外">澳洲境外 Offshore</el-radio>
					</p>
				</el-col>
				<el-col :span="8" style="margin-left: 15px;">
					乙方Party B：<el-input v-model="intermediary" placeholder="请输入内容"></el-input>
					代理号 MARN ：<el-input v-model="marn" placeholder="请输入内容"></el-input>
					签证申请：<el-input v-model="visasType" placeholder="请输入内容"></el-input>
					咨询代理费总额：<el-input v-model="contractMoney" placeholder="请输入内容"></el-input>
					第一次付款在签完本委托书时支付澳元：<el-input v-model="oneMoney" placeholder="请输入内容"></el-input>
					行政管理费<el-input v-model="adminMoney" placeholder="请输入内容"></el-input>
					第二次付款在提交签证申请时支付：<el-input v-model="twoMoney" placeholder="请输入内容"></el-input>
					电子邮件：<el-input v-model="Email" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="5" style="margin-left: 15px;" v-if="contractType==1">
					澳洲注册教育咨询师号 PIER：<el-input v-model="pier" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
			<hr />
			<el-row v-if="contractType==1">
				<el-col>
					<el-table :data="schoolList" style="width: 100%">
						<el-table-column prop="item" label="学校" width="180">
						</el-table-column>
						<el-table-column prop="major" label="申请" width="180">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="8">
					学校Institute<el-input v-model="school" placeholder="请输入学校"></el-input>
				</el-col>
				<el-col :span="8">
					申请Major<el-input v-model="major" placeholder="请输入申请"></el-input>
					<el-button type="success" @click="addSchool">添加</el-button>
				</el-col>
			</el-row>
			<hr />
			<el-button type="primary" @click="addContract" style="margin-bottom: 100px;">创建合同</el-button>
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
				<el-radio v-model="radio" :label="item.autographUrl" v-for="item in autographList" :key="item.auId" v-if="!isshow">
					<img :src="setUrl(item.autographUrl)" width="50%" border="1px solid red" />
				</el-radio>
				<div v-if="isshow">
					<a :href="url" target="_blank">
						<el-button type="primary">预览</el-button>
					</a>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addsubContract">确 定</el-button>
				</span>
			</el-dialog>
		</el-tab-pane>
		<el-tab-pane label="待签" name="second">
			<el-row class="table-box">
				<el-table border style="width: 100%" :data="tableData">
					<el-table-column prop="clientName" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" :formatter="timeFliter">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<a :href="setUrl(scope.row.fileUrl)" title="预览" target="_blank">详情</a>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row style="height: 80px;">
				当前页数：{{page}}
				<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0,0)">上一页</el-button>
				<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1,0)">下一页</el-button>
			</el-row>
		</el-tab-pane>
		<el-tab-pane label="我的合同" name="third">
			<el-row class="table-box">
				<el-table border style="width: 100%" :data="tableDataover">
					<el-table-column prop="clientName" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" :formatter="timeFliter">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<a :href="setUrl(scope.row.fileUrl)" title="预览" target="_blank">详情</a>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row style="height: 80px;">
				当前页数：{{page}}
				<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0,1)">上一页</el-button>
				<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1,1)">下一页</el-button>
			</el-row>
		</el-tab-pane>
		<el-tab-pane label="学生临时测试页面" name="st">
			<el-row class="table-box">
				<el-table border style="width: 100%" :data="tableData">
					<el-table-column prop="clientName" label="名称" width="180">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" :formatter="timeFliter">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="primary" size="small" @click="addst(scope.row.conId)">学生签名</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row style="height: 80px;">
				当前页数：{{page}}
				<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0,0)">上一页</el-button>
				<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1,0)">下一页</el-button>
			</el-row>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				pier: 'PIER_123456',
				school: '',
				major: '',
				schoolList: [],
				tableData: [],
				tableDataover: [],
				isshow: false,
				url: '',
				adminMoney: '50',
				twoMoney: '400',
				oneMoney: '500',
				autographList: [],
				radio: '',
				dialogVisible: false,
				isnext: true,
				activeName: 'first',
				interEmail: '12344@163.com',
				marn: 'marn_0203',
				advance: '',
				loading: '',
				intermediaryId: JSON.parse(localStorage.getItem("loginUser")).userId, // Long 中介编号
				userId:JSON.parse(localStorage.getItem("loginUser")).userId,
				studentId: '', // Long 学生编号
				clientName: '张画画', // String 当事人姓名
				deputyApplicantName: '历小名', // String 副申请人姓名
				intermediary: '中介',
				address: '贵州', // String 家庭住址
				phone: '15812361236', // String 手机号
				Email: '16551655@163.com', // String Email地址
				onAddress: '澳大利亚', // String onAddress
				onshore: '澳洲境外', // String 境内/澳洲境外
				visasType: '留学', // String 申请签证类型
				contractMoney: 1200.50, // Double 合同金额
				contractType: 0, // Byte 合同分类
				fileUrl: 'url', // String <选填> 文件地址
				collectionItems: '', // JSONArray 代收项目
				count: 10,
				page: 1,
				pageOver: true,
				conType: 0,
				contractTypeList: this.$constData.contractTypeList
			};
		},
		methods: {
			addSchool() {
				if (this.school == '' || this.major == '' || this.schoolList > 4) return
				let item = {
					item: this.school,
					major: this.major
				}
				this.schoolList.push(item)
				this.school = ''
				this.major = ''
			},
			addst(conId) {
				const loading = this.$loading({
					lock: true,
					text: '学生签名生成中...Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let cnt = {
					studentId: 403022498109672, // Long 学生编号
					contractId: conId, // Long 合同编号
					url: 'http://durian-file.oss-ap-southeast-2.aliyuncs.com/403022498109672/autograph/test.png', // String 学生签名图片地址
				};
				this.$api.setStudentAutograph(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						loading.close();
						this.isshow = true
						this.url = this.setUrl(this.$util.tryParseJson(res.data.c).fileUrl)
						this.$message({
							message: 'ok',
							type: 'success'
						});
					}
				})
			},
			handleClick(tab, event) {
				this.tableData = []
				let cnt = {
					intermediaryId: this.userId,
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				if (tab.name == 'third') {
					cnt.status = 1
					this.getContractList(cnt)
				} else if (tab.name == 'second') {
					cnt.status = 0
					this.getContractList(cnt)
				} else if (tab.name == 'st') {
					cnt.status = 0
					this.getContractList(cnt)
				}
			},
			changePage(e, val) {
				if (e) {
					this.page += 1
				} else {
					this.page -= 1
				}
				let cnt = {
					intermediaryId: this.userId,
					status: val,
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				this.getContractList(cnt)
			},
			getContractList(cnt) {
				this.$api.getContractList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						console.log(this.$util.tryParseJson(res.data.c))
						if (cnt.status == 0) {
							this.tableData = this.$util.tryParseJson(res.data.c)
						} else {
							this.tableDataover = this.$util.tryParseJson(res.data.c)
						}
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
			setpPDF(id) {
				const loading = this.$loading({
					lock: true,
					text: '生成合同中...Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let cnt = {
					id: id,
					interautoImg: this.setUrl(this.radio)
				};
				this.$api.setpPDF(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						loading.close();
						this.isshow = true
						this.url = this.setUrl(this.$util.tryParseJson(res.data.c).fileUrl)
						this.$message({
							message: 'ok',
							type: 'success'
						});
					} else {

					}
				})
			},
			getAutograph() {
				let cnt = {
					userId: 403022498109672
				};
				this.$api.getAutographList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.autographList = this.$util.tryParseJson(res.data.c)
					} else {

					}
				})
			},
			addContract() {
				this.dialogVisible = true
				this.getAutograph()
			},
			addsubContract() {
				if(this.radio == ''){
					this.$message.error('请选择有一个签名')
					return
				}
				let cnt = {
					intermediaryId: this.intermediaryId, // Long 中介编号
					studentId: this.studentId, // Long 学生编号
					clientName: this.clientName, // String 当事人姓名
					deputyApplicantName: this.deputyApplicantName, // String 副申请人姓名
					intermediary: this.intermediary,
					address: this.address, // String 家庭住址
					phone: this.phone, // String 手机号
					Email: this.Email, // String Email地址
					interEmail: this.interEmail,
					onAddress: this.onAddress, // String onAddress
					onshore: this.onshore, // String 境内/澳洲境外
					visasType: this.visasType, // String 申请签证类型
					contractMoney: this.contractMoney, // Double 合同金额
					adminMoney: this.adminMoney,
					twoMoney: this.twoMoney,
					oneMoney: this.oneMoney,
					contractType: this.contractType, // Byte 合同分类
					fileUrl: 'url', // String <选填> 文件地址
					collectionItems: this.schoolList, // JSONArray 代收项目
				};
				if (this.contractType == 1) {
					cnt.pier = this.pier
				}
				this.$api.createContract(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.setpPDF(this.$util.tryParseJson(res.data.c).conId)
					} else {

					}
				})
			},
		}
	}
</script>

<style>
	input {
		margin-bottom: 15px;
	}
</style>
