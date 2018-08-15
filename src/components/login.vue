<template>
	<div id="login_info">
		<div class="container">
			<div class="row">
				<label class='col-md-3'>username</label>
				<div class="col-md-6">
					<input type="text" id="username" name="username" class="form-control">
					<br>
				</div>
			</div>
			<div class="row">
				<label class='col-md-3'>password</label>
				<div class="col-md-6">
					<input type="password" id="password" name="password" class="form-control">
					<br>
				</div>
			</div>
			<div class="row">
				<button type="button" class="btn btn-default" @click="login">login</button>
				<button type="button" class="btn btn-default" v-on:click="doRegist">regist</button>
			</div>
		</div>
		
	</div>



</template>

<script>
	export default {
		name: 'login',
		data() {
			return {}
		},
		methods: {
			doRegist: function () {
				this.$layer.msg("暂不支持注册!");
			},
			login: function () {
				var routers = this.$router;
				var username = $("#username").val();
				var password = $("#password").val();

				if (username == "" || username == null) {
					this.$layer.msg("用户名为空");
				} else if (password == "" || password == null) {
					this.$layer.msg("密码为空");
				} else {
					$.ajax({
						type: 'post',
						url: 'http://localhost:8081/video/login',
						data: {
							'username': username,
							'password': password
						},
						success: function (data) {
							data = JSON.parse(data);
							if (data.msg == '0001') {
								routers.push({
									name: `index`,
									params: {
										user: data.user
									}
								})
							} else {
								this.$layer.alert(data.msg);
							}
						}

					});
				}
			}
		}
	}
	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#login_info{
		width: 100%;
		height: 1000px;
		background-image: url(../assets/img/timg.jpg);
		background-size: cover;
		text-align: center;
	}

	.container {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		height: 240px;
		width: 30%;
		font-size: 15px;
		font-family: serif;
		font-variant: inherit;
		color: #fff;
	}
</style>
