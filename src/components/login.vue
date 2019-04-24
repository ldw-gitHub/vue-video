<template>
	<div id="login_info" v-if="clientWidths" v-bind:style="{backgroundImage:'url(' + (clientWidths < 768 ? ftpIP + coverImgUrl : ftpIP + baseImg) + ')'}">
		<div class="container">
			<div class="row">
				<label class='col-md-2 col-md-offset-3' style="padding-right: 0;">username</label>
				<div class="col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-0" style="padding:0;">
					<input type="text" id="username" name="username" autocomplete="on" class="form-control">
					<br>
				</div>
			</div>
			<div class="row">
				<label class='col-md-2 col-md-offset-3' style="padding-right: 0;">password</label>
				<div class="col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-0" style="padding:0;">
					<input type="password" id="password" name="password" autocomplete="on" class="form-control">
					<br>
				</div>
			</div>
			<div class="row" style="height: 54.9px;">
				<label class='col-md-2 col-md-offset-3' style="padding-right: 0;">验证码</label>
				<div class="col-xs-2" style="padding:0;" >
					<input type="text" id="kaptcha" name="kaptcha" class="form-control">
				</div>
				<div class="col-xs-2" style="padding:0;" v-on:click="getKaptcha()">
					<img :src="kaptchaImg" class="kaptchaImgClass">
				</div>
			</div>
			<div class="row">
				<label class='col-md-2 col-md-offset-3' style="padding-right: 0;cursor:pointer;" v-on:click="returnindex">return VTime</label>
				<button type="button" id="loginbut" class="btn btn-default col-xs-8 col-xs-offset-2 col-md-2 col-md-offset-0" @click="login">登入</button>
				<!-- <input type="checkbox" style="margin-left: 20px;margin-top: 10px;" name="remember" id="remember" value="0" />记住我 -->
			</div>
			<!-- <div class="row">
				<button type="button" class="btn btn-default col-xs-8 col-xs-offset-5 col-md-2" style="padding:0;" v-on:click="returnindex">返回首页</button> 
			</div> -->
		</div>
	</div>



</template>

<script>
	export default {
		data() {
			return {
				ftpIP: this.GLOBAL.ftpIP,
				server: this.GLOBAL.server,
				coverImgUrl: 'bk/timg.jpg',
				baseImg: 'bk/girl.jpg',
				clientWidths: '',
				kaptchaImg:'',
				kaptchaToken:'',
			}
		},
		mounted() {
			window.onresize = function temp() {
				this.clientWidths = document.body.clientWidth;
			};
		},
		created() {
			this.clientWidths = document.body.clientWidth;
			//获取验证码图片
			this.getKaptcha();
		},
		methods: {
			getKaptcha: function(){
				var that = this;
				var server = this.server;
				$.ajax({
					type: "post",
					url: server + "/video/kaptcha",
					success: function (result,status,xhr) {
						if (result.code == 200) {
							var tmp = result.data;
							that.kaptchaImg = tmp.img;
						}else{
							result = JSON.parse(result);
							that.$layer.msg(result.message);
						}
						
					},
					complete: function(XMLHttpRequest,data){
						if (data == "success") {
							//验证码token
							that.kaptchaToken = XMLHttpRequest.getResponseHeader('Authorization');
						}
					}
				})
			},
			returnindex: function () {
				this.$router.push({
					name: 'index',
				})
			},
			login: function () {
				var routers = this.$router;
				var username = $("#username").val();
				var password = $("#password").val();
				var kaptcha = $("#kaptcha").val();
				var remFlag = $("#remember").is(":checked");
				var server = this.server;
				var layer = this.$layer;
				var that = this;

				if (username == "" || username == null) {
					this.$layer.msg("用户名为空");
				} else if (password == "" || password == null) {
					this.$layer.msg("密码为空");
				} else if(kaptcha == "" || kaptcha == null){
					this.$layer.msg("请填写验证码");
				}else {
					$.ajax({
						type: 'post',
						url: server + '/login',
						beforeSend: function(XMLHttpRequest) {
							XMLHttpRequest.setRequestHeader("Authorization",that.kaptchaToken);
						},
						data: {
							'username': username,
							'password': that.$md5(password),
							'kaptcha': kaptcha,
							'remenberme': 0,
						},
						success: function (data) {
							data = JSON.parse(data);
							if (data.code == 200) {
								//记住密码
								that.setCookie("username",data.data.userName,1);
								that.setCookie("userId",data.data.userId,1);
								routers.push({
									name: 'index',
								})
							} else {
								layer.msg(data.message);
							}
						},
						complete: function(xhr,data){
							if (data == "success") {
								//记住密码
								that.setCookie("sessionToken",xhr.getResponseHeader("Authorization"),1);
								that.GLOBAL.sessionToken = data.accessToken;
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
	
	.kaptchaImgClass{
		height: 35px;
		cursor: pointer;
	}
</style>
