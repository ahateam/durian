<template>
	<div>
		<el-row class="title-box">
			用户管理
		</el-row>
		<el-row class="content-box">
			<el-col :span="10" style="margin-bottom: 15px;">
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入用户名或手机号" v-model="userName" class="input-with-select">
						<el-select v-model="isPublishUser" slot="prepend" placeholder="请选择" width="30%">
							<el-option label="发布者" value="true"></el-option>
							<el-option label="接受者" value="false"></el-option>
						</el-select>
						<el-button slot="append" icon="el-icon-search" @click="getTaskListByUserName"></el-button>
					</el-input>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="block">
					<span style="font-size: 15px;">请选择时间范围</span>
					<el-date-picker v-model="timeRange" value-format="yyyyMMddHHmmss" type="datetimerange" :picker-options="pickerOptions"
					 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" @change="getTimeRange" @blur="loseFocus">
					</el-date-picker>
				</div>
			</el-col>
		</el-row>
		<el-row class="table-box">
			<el-table border style="width: 100%" :data="tableData">
				<el-table-column prop="taskName" label="任务名称" width="180">
				</el-table-column>
				<el-table-column prop="taskStatus" label="状态" width="180" :formatter="taskStatusFliter" :filters="[{ text: '等待接收', value: 0 }, { text: '进行中/已分配', value: 1 }, { text: '完成未付/收款', value: 2}, { text: '已付/收款', value: 3}]"
				 :filter-method="filterTag">
				</el-table-column>
				<el-table-column prop="taskCreateTime" label="创建时间" :formatter="timeFliter">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click="infoBtn(scope.row)" type="text" size="small">详情</el-button>
						<el-button @click="updateBtn(scope.row)" type="text" size="small">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>

		<el-dialog title="提示" :visible.sync="isUserInfo" width="30%">
			<p>1111</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="isUserInfo = false">取 消</el-button>
				<el-button type="primary" @click="isUserInfo = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isPublishUser: '',
				userName: '',
				isUserInfo: false,
				dialogVisible: false,
				tableData: [],
				count: 10,
				page: 1,
				pageOver: true,
				taskStatus: this.$constData.taskStatus,
				timeRange: '',
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},
		methods: {
			// 发布者或接受者昵称模糊查询
			getTaskListByUserName() {
				if (this.isPublishUser.length == 0 || this.userName.length == 0) {
					this.$alert('请选择类别并输入数据', '搜索有误')
				} else {
					let cnt = {
						userName: this.userName,
						isPublishUser: this.isPublishUser,
						count: 10,
						offset: 0
					}
					this.$api.getTaskListByUserName(cnt, (res) => {
						this.tableData = this.$util.tryParseJson(res.data.c)
						console.log(this.tableData)
					})
				}
			},
			// 状态筛选
			filterTag(value, row) {
				return row.taskStatus === value
			},
			// 时间格式转换
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			taskStatusFliter(row, col, val) {
				let statusList = this.taskStatus
				for (let i = 0; i < statusList.length; i++) {
					if (statusList[i].value == val) {
						return statusList[i].name
					}
				}
			},
			adduser() {

			},
			changePage(e) {
				if (e) {
					this.page += 1
				} else {
					this.page -= 1
				}
				let cnt = {
					count: this.count,
					offset: (this.page - 1) * this.count
				};
				this.getContents(cnt)
			},
			getContents(cnt) {
				this.$api.getTaskList(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						console.log(this.tableData)
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
			infoBtn(info) {
				this.$router.push({
					path: '/taskInfo',
					name: 'taskInfo',
					params: {
						info: info
					}
				})
			},
			updateBtn(info) {
				this.$router.push({
					path: '/updateTask',
					name: 'updateTask',
					params: {
						info: info
					}
				})
			},
			// 时间范围筛选
			getTimeRange() {
				let cnt = {
					startTime: this.timeRange[0],
					endTime: this.timeRange[1],
					count: 10,
					offset: 0
				}
				this.$api.getTaskListByTime(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
					}
				})
			},
			// 失去焦点
			loseFocus() {
				if (this.timeRange == null || this.timeRange == "") {
					let cnt = {
						count: 10,
						offset: 0
					}
					this.getContents(cnt)
				}
			}
		},
		mounted() {
			let cnt = {
				count: this.count,
				offset: (this.page - 1) * this.count
			};
			this.getContents(cnt)
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

	.el-select .el-input {
		width: 100px;
	}
</style>
