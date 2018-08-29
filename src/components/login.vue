<template>
	<div id="login_info">
		<div class="container">
			<div class="row">
				<label class='col-md-2 col-md-offset-3' style="padding-right: 0;">username</label>
				<div class="col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-0" style="padding:0;">
					<input type="text" id="username" name="username" class="form-control">
					<br>
				</div>
			</div>
			<div class="row">
				<label class='col-md-2 col-md-offset-3' style="padding-right: 0;">password</label>
				<div class="col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-0" style="padding:0;">
					<input type="password" id="password" name="password" class="form-control">
					<br>
				</div>
			</div>
			<div class="row">
				<button type="button" id="loginbut" class="btn btn-default" @click="login">login</button>
				<button type="button" class="btn btn-default" style="display: none;" v-on:click="doRegist">regist</button>
				<input type="checkbox" style="margin-left: 20px;margin-top: 10px;" name="remember" id="remember" value="0" />记住我
			</div>
		</div>

	</div>



</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				server: this.GLOBAL.server,
			}
		},
		methods: {
			doRegist: function () {
				this.$layer.msg("暂不支持注册!");
			},
			login: function () {
				var routers = this.$router;
				
				if((sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken'))
				    &&(sessionStorage.getItem('username') || localStorage.getItem('username'))){
					routers.push({
						name: 'index',
					})
				}
				var username = $("#username").val();
				var password = $("#password").val();
				var remFlag = $("#remember").is(":checked");
				var server = this.server;
				var layer = this.$layer;
				console.log(remFlag);

				// 禁用按钮防止重复提交
				/* $("#loginbut").attr({
					disabled: "disabled"
				}); */

				if (username == "" || username == null) {
					this.$layer.msg("用户名为空");
				} else if (password == "" || password == null) {
					this.$layer.msg("密码为空");
				} else {
					$.ajax({
						type: 'post',
						url: server + '/video/login',
						data: {
							'username': username,
							'password': password,
							'remenberme': 0,
						},
						success: function (data) {
							//console.log($.cookie('sessionId'));
							/* $("#loginbut").removeAttr("disabled"); */
							data = JSON.parse(data);
							if (data.msg == '0001') {
								//记住密码
								if (remFlag) {
									localStorage.setItem("sessionToken", data.accessToken);
									localStorage.setItem("username", data.user.username);
									localStorage.setItem("userId", data.user.id);
								} else {
									sessionStorage.setItem('sessionToken', data.accessToken);
									sessionStorage.setItem("username", data.user.username);
									sessionStorage.setItem("userId", data.user.id);
								}
								routers.push({
									name: 'index',
								})
							} else {
								layer.msg(data.msg);
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
	#login_info {
		width: 100%;
		height: 943px;
		background-image: url(../assets/img/girl.jpg);
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
		width: 100%;
		font-size: 15px;
		font-family: serif;
		font-variant: inherit;
		color: #fff;
	}
</style>
