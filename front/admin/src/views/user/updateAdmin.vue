<template>
	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="用户名" prop="userName">
			<el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="手机号" prop="phone">
			<el-input v-model.number="ruleForm.phone" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			var checkUserName = (rule, value, callback) => {
				if (value === '') {
					return callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var checkPhone = (rule, value, callback) => {
				if (value === '') {
					return callback(new Error('手机号不能为空'));
				} else {
					if (!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						callback();
					}
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				userId: this.$route.params.info.userId,
				ruleForm: {
					userName: this.$route.params.info.userName,
					phone: +this.$route.params.info.phone,
					pass: '',
					checkPass: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}],
					userName:[{
						validator: checkUserName,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm)
						let cnt = {
							userId: this.userId,
							userName: this.ruleForm.userName,
							phone: this.ruleForm.phone.toString(),
							pwd: this.ruleForm.pass
						}
						this.$api.updateUser(cnt, () => {
							this.$message({
								type: 'success',
								message: '修改成功!'
							});
							this.$router.push({
								path: '/adminList',
								name: 'adminList',
							})
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
