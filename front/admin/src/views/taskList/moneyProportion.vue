<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="代理人抽成" name="first">
			<el-row>
				<el-col :span="6">
					<el-input v-model="interinput" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button style="margin-left: 10px;" type="success" plain @click="updateInter">提交</el-button>
				</el-col>
			</el-row>
		</el-tab-pane>
		<el-tab-pane label="学生抽成" name="second">
			<el-row>
				<el-col :span="6">
					<el-input v-model="studentinput" placeholder="请输入内容"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button style="margin-left: 10px;" type="success" plain @click="updateStudent">提交</el-button>
				</el-col>
			</el-row>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				studentinput: '',
				interinput: '',
				id: '',
			};
		},
		methods: {
			handleClick(tab, event) {
				if (tab.name == 'first') {
					this.getProportions(0)
				} else if (tab.name == 'second') {
					this.getProportions(1)
				}
			},
			updateInter() {
				let cnt = {
					id: this.id, // Long id
					money: this.interinput, // Double 比例数字
				};
				this.$api.updateProportion(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let d = this.$util.tryParseJson(res.data.c).monrypro
						if (type == 0) {
							this.interinput = d
						} else if (type == 1) {
							this.studentinput = d
						}
						this.$me
					}
				})
			},
			updateStudent() {
				let cnt = {
					id: this.id, // Long id
					money: this.studentinput, // Double 比例数字
				};
				this.$api.updateProportion(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let d = this.$util.tryParseJson(res.data.c).monrypro
						if (type == 0) {
							this.interinput = d
						} else if (type == 1) {
							this.studentinput = d
						}
					}
				})
			},
			getProportions(type) {
				let cnt = {
					type: type, // Byte 抽成类型
				};
				this.$api.getProportions(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let d = this.$util.tryParseJson(res.data.c).monrypro
						this.id = this.$util.tryParseJson(res.data.c).proId
						if (type == 0) {
							this.interinput = d
						} else if (type == 1) {
							this.studentinput = d
						}
					}
				})
			}
		},
		mounted() {
			this.getProportions(0)
		}
	};
</script>

<style>
</style>
