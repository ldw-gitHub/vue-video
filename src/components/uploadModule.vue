<template>
	<div class="container" style="width: 100%;height: 100%;">
		<div class="row col-md-10 col-md-offset-1" style="height: 75px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 818px;">
			<!-- content -->
			<div class="containerBody">
				<div class="container">
					<form id="uploadFileForm" name="uploadFileForm" method="post">
						<div class="form-group row">
							<label class="col-lg-2 control-label">视频类型：</label>
							<div class="col-lg-6" style="height:30px;">
								<select id="videoType" name="videoType" class="selectpicker" data-style="btn-primary">
									<option value="1">动作</option>
									<option value="2">文艺</option>
									<option value="3">搞笑</option>
									<option value="4">惊悚</option>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-2 control-label">封面图片：</label>
							<div class="col-lg-6">
								<input type="button" class="btn btn-default" OnClick='javascript:document.getElementById("inputImgfile").click();' value="选择图片"
								/>
								<input id="uploadImgPath" type="hidden" name="uploadImgPath" />
								<input type="file" id="inputImgfile" v-on:change="uploadimages" style="display: none;" name="imagefile" />
								<div id="uploadFile" style="margin-left:20px;padding: 5px 5px;"></div>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-lg-2 control-label">视频：</label>
							<div class="col-lg-6">
								<input type="button" class="btn btn-default" OnClick='javascript:document.getElementById("inputVideofile").click();' value="选择视频"
								/>
								<input id="uploadVideoPath" type="hidden" name="uploadVideoPath" />
								<input type="file" id="inputVideofile" v-on:change="uploadVideos" style="display: none;" name="videofile" />
								<div id="uploadVideoFile" style="margin-left:20px;padding: 2px 3px;"></div>
							</div>
						</div>
						<div class="form-group row">
							<label for="description" class="col-lg-2 control-label">内容说明：</label>
							<div class="col-lg-6">
								<textarea type="text" class="form-control" id="description" name="description" placeholder="介绍..."></textarea>
							</div>
						</div>
						<div class="form-group row">
							<label for="filename" class="col-lg-2 control-label">主题名称：</label>
							<div class="col-lg-6">
								<input type="text" class="form-control" id="filename" name="filename" placeholder="请输入名字">
							</div>
						</div>
						<div class="form-group row">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" id="submitUploadFile" v-on:click="submitUploadFile" class="btn btn-primary">提交</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<input style="display: none;" id="serversite" v-bind:value="server" />
		<div class="row">
			<!-- 底部 -->
			<footers></footers>
		</div>
	</div>
</template>

<script>
	import menus from './header'; // * 导入 menus组件
	import footers from './footer'; // * 导入 footer组件
	export default {
		data() {
			return {
				username: {},
				ftpIP: this.GLOBAL.ftpIP,
				server: this.GLOBAL.server,
			}
		},
		created() {
			this.getRouterData();
			this.init_upload();
		},
		methods: {
			getRouterData() {
				this.username = this.$route.params.username;
			},
			init_upload: function () {
				console.log("kaisi");
				$("#deleteImgFile").on('click',function(){
					console.log("delete");
				})
			},
			uploadimages: function () {
				var server = this.server;
				var layer = this.$layer;

				var fileObj = document.getElementById("inputImgfile").files[0];
				if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
					layer.alert("请选择图片");
					return;
				}
				var formFile = new FormData();
				formFile.append("action", server + "/video/uploadFile");
				formFile.append("uploadfile", fileObj); //加入文件对象

				console.log(fileObj);

				let filename = fileObj.name;
				let attachNameImage = filename.substring(filename.lastIndexOf("\\") + 1, filename.length);
				var re = new RegExp(".(gif|jpg|png|bmp|jpeg)$", "i");
				console.log(attachNameImage);
				if (!re.test(attachNameImage)) {
					layer.alert("文件类型不正确,请选择图片");
					return false;
				} else {
					formFile.append("attachName", attachNameImage);
					formFile.append("tag", "img");
				}
				console.log(formFile);

				$.ajax({
					url: server + "/video/uploadFile",
					data: formFile,
					type: "Post",
					dataType: "json",
					cache: false, //上传文件无需缓存
					processData: false, //用于对data参数进行序列化处理 这里必须false
					contentType: false, //必须
					success: function (result) {
						if (result.success) {
							$("#uploadFile").html(
								 `<span style="font-size:12px;color:#000000">${attachNameImage}
								  <button type="button" id="deleteImgFile" v-on:click.native="deleteAttach('img')"
								   value="删除"></button></span>`
							);
							$("#uploadImgPath").val(result.uploadFileName);
						} else {
							layer.alert("上传缩略图失败！");
						}
					}
				})
			},
			uploadVideos: function () {
				var server = this.server;
				var layer = this.$layer;

				var fileObj = document.getElementById("inputVideofile").files[0];
				if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
					layer.alert("请选择视频");
					return;
				}
				var formFile = new FormData();
				formFile.append("action", server + "/video/uploadFile");
				formFile.append("uploadfile", fileObj); //加入文件对象

				console.log(fileObj);

				let filename = fileObj.name;
				let attachNameImage = filename.substring(filename.lastIndexOf("\\") + 1, filename.length);
				var re = new RegExp(".(avi|mp4|wmv|flv|rm|rmvb|asf|mov|mpg|dvr|divx|ts)$", "i");
				if (!re.test(attachNameImage)) {
					layer.alert("文件类型不正确,请选择视频");
					return false;
				} else {
					formFile.append("attachName", attachNameImage);
					formFile.append("tag", "video");
				}
				console.log(formFile);

				$.ajax({
					url: server + "/video/uploadFile",
					data: formFile,
					type: "Post",
					dataType: "json",
					cache: false, //上传文件无需缓存
					processData: false, //用于对data参数进行序列化处理 这里必须false
					contentType: false, //必须
					success: function (result) {
						if (result.success) {
							$("#uploadVideoFile").html(
								 `<span style="font-size:12px;color:#000000">${attachNameImage}
													<button type="button" v-on:click="deleteAttach('video')">删除</button></span>` 
							);
							$("#uploadVideoPath").val(result.uploadFileName);
						} else {
							layer.alert("上传视频失败!");
						}
					}
				})

			},
			submitUploadFile: function () {
				var server = this.server;
				var data = $("#uploadFileForm").serializeArray();
				var fromData = {};
				$.each(data, function () {
					fromData[this.name] = this.value;
				});
				if (fromData.uploadImgPath == "") {
					this.$layer.alert("图片不能为空");
					return;
				} else if (fromData.uploadVideoPath == "") {
					this.$layer.alert("视频不能为空");
					return;
				}

				var datas = JSON.parse(JSON.stringify(fromData));
				console.log(datas);
				var layer = this.$layer;
				$.ajax({
					type: "post",
					url: server + "/video/saveMedia",
					data: datas,
					contentType: "application/x-www-form-urlencoded",
					//contentType: "application/json;charset=utf-8",
					success: function (data) {
						if (data.success) {
							parent.location.reload();
							$("#description").val("");
							$("#filename").val("");
						} else {
							layer.msg(data.msg);
						}
					}
				})

			},
			deleteAttach: function (type) {
				var server = this.server;
				var layer = this.$layer;
				console.log(server);
				var attachName = type == "img" ? $("#uploadImgPath").val() : $("#uploadVideoPath").val();
				var tag = type;
				$.ajax({
					type: "post",
					url: server + '/video/deleteFile',
					data: {
						'attachName': attachName,
						'tag': tag
					},
					contentType: "application/x-www-form-urlencoded",
					//contentType: "application/json;charset=utf-8",
					success: function (data) {
						data = JSON.parse(data);
						if (data.success) {
							if (type == "img") {
								$("#uploadFile").empty();
								$("#uploadImgPath").val('');
							} else {
								$("#uploadVideoFile").empty();
								$("#uploadVideoPath").val('');
							}

						} else {
							layer.msg(data.msg);
						}
					}

				});

			}
		},
		components: { // * 注册menus组件，让其可以在template调用
			menus,
			footers
		}
	};
	
	
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.containerBody {
		min-height: 800px;
		background: rgba(255, 255, 255, 0.9);
		z-index: 1000;
	}

	.selectpicker {
		background: #fafdfe;
		height: 28px;
		width: 180px;
		line-height: 28px;
		border: 1px solid #9bc0dd;
		-moz-border-radius: 2px;
		-webkit-border-radius: 2px;
		border-radius: 2px;
	}
</style>
