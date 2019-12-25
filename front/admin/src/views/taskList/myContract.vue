<template>
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
		<el-tab-pane label="创建普通合同" name="first">
			<el-row v-if="isnext">
				<p>甲方Party A:</p>
				<el-col :span="10">
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
					第一次付款在签完本委托书时支付澳元：<el-input v-model="advance" placeholder="请输入内容"></el-input>
					行政管理费<el-input v-model="advance" placeholder="请输入内容"></el-input>
					第二次付款在提交签证申请时支付：<el-input v-model="advance" placeholder="请输入内容"></el-input>
					电子邮件：<el-input v-model="Email" placeholder="请输入内容"></el-input>
				</el-col>
			</el-row>
			<el-button type="primary" plain @click="addContract">创建合同</el-button>
		</el-tab-pane>
		<el-tab-pane label="待签" name="second">

		</el-tab-pane>
		<el-tab-pane label="我的合同" name="third">

		</el-tab-pane>
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				isnext: true,
				activeName: 'first',
				clientName: '',
				deputyApplicantName: '',
				address: '',
				phone: '',
				interEmail: '',
				onAddress: '',
				onshore: '',
				intermediary: '',
				marn: '',
				visasType: '',
				contractMoney: '',
				advance: '',
				Email: '',
				loading: '',
			};
		},
		methods: {
			openFullScreen2() {
				
			},

			handleClick(tab, event) {
				console.log(tab, event);
			},
			setpPDF(id) {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let cnt = {
					id: id
				};
				this.$api.setpPDF(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						loading.close();
						this.$message({
							message: 'ok',
							type: 'success'
						});
					} else {

					}
				})
			},
			addContract() {
				let item = [{
					item: '猫湖学校',
					money: 100
				}]
				let cnt = {
					intermediaryId: 403022498089447, // Long 中介编号
					studentId: 403029719057634, // Long 学生编号
					clientName: '张画画', // String 当事人姓名
					deputyApplicantName: '历小名', // String 副申请人姓名
					address: '贵州', // String 家庭住址
					phone: '15812361236', // String 手机号
					Email: '16551655@163.com', // String Email地址
					onAddress: '澳大利亚', // String onAddress
					onshore: '澳洲境外', // String 境内/澳洲境外
					visasType: '留学', // String 申请签证类型
					contractMoney: 1200.50, // Double 合同金额
					contractType: 1, // Byte 合同分类
					fileUrl: 'url', // String <选填> 文件地址
					collectionItems: item, // JSONArray 代收项目
				};
				this.openFullScreen2()
				this.$api.createContract(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.setpPDF(this.$util.tryParseJson(res.data.c).conId)
					} else {

					}
				})
			}
		}
	}
</script>

<style>
	input {
		margin-bottom: 15px;
	}
</style>
