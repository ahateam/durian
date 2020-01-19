<template>
	<div>
		<el-row class="title-box">
			中介资质审核
		</el-row>
		<el-row class="table-box">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="PIER号">
								<span style="margin-right: 10px;">{{ props.row.fierNumber }}</span>
								<span style="color: #f56c6c;" v-if="props.row.fierStatus == '0'">未通过</span>
								<span style="color: #67c23a;" v-if="props.row.fierStatus == 1">已通过</span>
								<span v-if="props.row.fierStatus == 2">
									<el-button type="success" plain size="mini" @click="updateBtn(props.row.userId,'PIER',true)">审核通过</el-button>
									<el-button type="danger" plain size="mini" @click="updateBtn(props.row.userId,'PIER',false)">审核不通过</el-button>
								</span>
							</el-form-item>
							<el-form-item label="MARN号">
								<span style="margin-right: 10px;">{{ props.row.marnNumber }}</span>
								<span style="color: #f56c6c;" v-if="props.row.marnStatus == '0'">未通过</span>
								<span style="color: #67c23a;" v-if="props.row.marnStatus == 1">已通过</span>
								<span v-if="props.row.marnStatus == 2">
									<el-button type="success" plain size="mini" @click="updateBtn(props.row.userId,'MARN',true)">审核通过</el-button>
									<el-button type="danger" plain size="mini" @click="updateBtn(props.row.userId,'MARN',false)">审核不通过</el-button>
								</span>
							</el-form-item>
							<el-form-item label="NAATI号">
								<span style="margin-right: 10px;">{{ props.row.naatiNumber }}</span>
								<span style="color: #f56c6c;" v-if="props.row.naatiStatus == '0'">未通过</span>
								<span style="color: #67c23a;" v-if="props.row.naatiStatus == 1">已通过</span>
								<span v-if="props.row.naatiStatus == 2">
									<el-button type="success" plain size="mini" @click="updateBtn(props.row.userId,'NAATI',true)">审核通过</el-button>
									<el-button type="danger" plain size="mini" @click="updateBtn(props.row.userId,'NAATI',false)">审核不通过</el-button>
								</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column label="ID" prop="userId">
				</el-table-column>
				<el-table-column label="用户名称" prop="userName">
				</el-table-column>
				<el-table-column label="修改时间" prop="updateTime" :formatter="timeFliter">
				</el-table-column>
			</el-table>
		</el-row>
		<el-row style="height: 80px;">
			当前页数：{{page}}
			<el-button type="primary" size="small" :disabled="page==1" @click="changePage(0)">上一页</el-button>
			<el-button type="primary" size="small" :disabled="pageOver" @click="changePage(1)">下一页</el-button>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				moduleId: 1190,
				count: 10,
				offset: 0,
				sort: false,
				page: 1,
				pageOver: false,
				loading: true,
				title: '',
			}
		},
		methods: {
			// 通过审核
			updateBtn(info, val, e) {
				let cnt = {
					userId: info
				}
				if (val == 'PIER') {
					cnt.fier = e ? 1 : 0

				}
				if (val == 'MARN') {
					cnt.marn = e ? 1 : 0

				}
				if (val == 'NAATI') {
					cnt.naati = e ? 1 : 0

				}
				console.log(cnt)
				this.$api.updateUserByExin(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.getUserByExin()
					}
				})
			},
			// 将时间戳转化为中国时间
			timeFliter(row, col, val) {
				let timer = new Date(val)
				let dataTime = timer.toLocaleDateString() + ' ' + timer.toLocaleTimeString('chinese', {
					hour12: false
				})
				return dataTime
			},
			// 上下翻页点击事件
			changePage(e) {
				this.loading = true
				if (e == 1) {
					// 下一页
					this.page += 1
					this.offset = (this.page - 1) * this.count
					this.getUserByExin()
				} else {
					// 上一页
					this.page -= 1
					this.offset = (this.page - 1) * this.count
					this.getUserByExin()
				}
			},
			// 获取待审核中介
			getUserByExin() {
				let cnt = {
					count: this.count,
					offset: this.offset,
				}
				this.$api.getUserByExin(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.tableData = this.$util.tryParseJson(res.data.c)
						console.log(this.tableData)
						this.loading = false
						if (this.tableData.length < this.count) {
							this.pageOver = true
						} else {
							this.pageOver = false
						}
					}
				})
			}
		},
		mounted() {
			this.getUserByExin()
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

	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
