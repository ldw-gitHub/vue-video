<template>
	<div class="container" style="width: 100%;height: 100%;">
		<div class="row col-md-10 col-md-offset-1" style="height: 180px;">
			<!--头部的容器 里面加上组件 menus-->
			<menus v-bind:username="username"></menus>
		</div>
		<div class="row col-md-10 col-md-offset-1" style="min-height: 818px;">
			<!-- content -->
			<div class="containerBody">
				<div class="container">
					<form id="uploadFileForm" name="uploadFileForm" method="post" role="form">
						<div class="form-group row">
							<label class="col-lg-2 control-label">上传文件类型：</label>
							<div class="col-lg-6" style="height:30px;">
								<label class="radio-inline">
									<input type="radio" name="isShow" v-on:click="changeView" id="isVideo" value="0" checked="checked"> 视频
								</label>
								<label class="radio-inline">
									<input type="radio" name="isShow" v-on:click="changeView" id="isFile" value="1"> 文件
								</label>
							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
							<label class="col-lg-2 control-label">视频类型：</label>
							<div class="col-lg-6" style="height:30px;">
								<select id="videoType" name="videoType" class="form-control">
									<option value="1">家庭</option>
									<option value="2">电影</option>
									<option value="3">电视剧</option>
									<option value="4">动画片</option>
								</select>
							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
							<label class="col-lg-2 control-label">是否分享该视频：</label>
							<div class="col-lg-6" style="height:30px;">
								<label class="radio-inline">
									<input type="radio" name="isown" v-on:click="changeRadio" id="isown1" value="0" checked="checked"> 分享
								</label>
								<label class="radio-inline">
									<input type="radio" name="isown" id="isown2" value="1"> 私有
								</label>
							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
							<label class="col-lg-2 control-label">封面图片：</label>
							<div class="col-lg-6">
								<input type="button" id="chooceImg" class="btn btn-default" OnClick='javascript:document.getElementById("inputImgfile").click();'
								    value="选择图片" />
								<input id="uploadImgPath" type="hidden" name="uploadImgPath" />
								<input type="file" id="inputImgfile" v-on:change="uploadimages" style="display: none;" name="imagefile" />
								<div id="uploadFile" v-show="uploadImgFileshow" style="margin-left:20px;padding: 5px 5px;">
									<span style="font-size:12px;color:#000000">{{attachNameImg}}
										<button type="button" id="deleteImgFile" v-on:click="deleteAttach('img')">删除</button>
									</span>
								</div>

								<div class="progress" id="image-progress" style="margin-top: 10px;display: none;">
									<div class="progress-bar" id="image-progress-width" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									    style="width: 0%;"></div>
								</div>

							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
							<label class="col-lg-2 control-label">视频：</label>
							<div class="col-lg-6">
								<input type="button" id="chooceVideo" class="btn btn-default" OnClick='javascript:document.getElementById("inputVideofile").click();'
								    value="选择视频" />
								<input id="uploadVideoPath" type="hidden" name="uploadVideoPath" />
								<input type="file" id="inputVideofile" v-on:change="uploadVideos" style="display: none;" name="videofile" />
								<div id="uploadVideoFile" v-show="uploadVideoFileshow" style="margin-left:20px;padding: 2px 3px;">
									<span style="font-size:12px;color:#000000">{{attachNameVideo}}
										<button type="button" v-on:click="deleteAttach('video')">删除</button>
									</span>
								</div>

								<div class="progress" id="video-progress" style="margin-top: 10px;display: none;">
									<div class="progress-bar" id="video-progress-width" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									    style="width: 0%;"></div>
								</div>

							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
							<label for="description" class="col-lg-2 control-label">内容说明：</label>
							<div class="col-lg-6">
								<textarea type="text" class="form-control" id="description" name="description" placeholder="介绍...不超过100"></textarea>
							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
							<label for="filename" class="col-lg-2 control-label">主题名称：</label>
							<div class="col-lg-6">
								<input type="text" class="form-control" id="filename" name="filename" placeholder="请输入主题名称...不超过50">
							</div>
						</div>
						<div v-if="!isShowUploadVideo" class="form-group row">
							<label class="col-lg-2 control-label">选择文件：</label>
							<div class="col-lg-6">
								<input type="button" id="chooceFile" class="btn btn-default" OnClick='javascript:document.getElementById("inputfile").click();'
								    value="选择文件" />
								<input id="uploadFilePath" type="hidden" name="uploadFilePath" />
								<input type="file" id="inputfile" v-on:change="uploadFiles" style="display: none;" name="isfile" />
								<div id="isUploadFile" v-show="uploadFileshow" style="margin-left:20px;padding: 2px 3px;">
									<span style="font-size:12px;color:#000000">{{attachNameFile}}
										<button type="button" v-on:click="deleteAttach('file')">删除</button>
									</span>
								</div>

								<div class="progress" id="file-progress" style="margin-top: 10px;display: none;">
									<div class="progress-bar" id="file-progress-width" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
									    style="width: 0%;"></div>
								</div>

							</div>
						</div>
						<div v-if="!isShowUploadVideo" class="form-group row">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" id="submitUpload" v-on:click="submitUpload" class="btn btn-primary">提交</button>
							</div>
						</div>
						<div v-if="isShowUploadVideo" class="form-group row">
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
				sessionToken: this.GLOBAL.sessionToken,
				uploadFileshow: false,
				uploadImgFileshow: false,
				uploadVideoFileshow: false,
				attachNameImg: "",
				attachNameVideo: "",
				attachNameFile: "",
				isShowUploadVideo: true,
				fileSize: {},
				userId: {},
			}
		},
		created() {
			this.getRouterData();
			this.init_upload();
		},
		methods: {
			changeView: function (obj) {
				$('input:radio[name="isShow"]:checked').prop("checked", "checked").siblings().removeAttr("checked")
				$(obj).attr("checked", "checked");
				var isShowPage = $("input[name='isShow']:checked").val();
				if (isShowPage == 0) {
					this.isShowUploadVideo = true;
				} else {
					this.isShowUploadVideo = false;
				}
			},
			changeRadio: function (obj) {
				$('input:radio[name="isown"]:checked').prop("checked", "checked").siblings().removeAttr("checked")
				$(obj).attr("checked", "checked");
			},
			getRouterData() {
				this.username = this.getCookie("username");
				this.userId = this.getCookie("userId");
				this.sessionToken = this.getCookie("sessionToken");
			},
			init_upload: function () {

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
				formFile.append("action", server + "/zuul/videos/uploadFile");
				formFile.append("uploadfile", fileObj); //加入文件对象

				this.fileSize = fileObj.size;

				console.log(fileObj);

				let filename = fileObj.name;
				let attachNameImage = filename.substring(filename.lastIndexOf("\\") + 1, filename.length);
				this.attachNameImg = attachNameImage;
				var re = new RegExp(".(gif|jpg|png|bmp|jpeg)$", "i");
				console.log(attachNameImage);
				if (!re.test(attachNameImage)) {
					layer.alert("文件类型不正确,请选择图片");
					return false;
				} else {
					formFile.append("attachName", attachNameImage);
					formFile.append("tag", "img");
				}
				formFile.append("sessionToken", this.sessionToken);
				formFile.append("userId", this.userId);
				console.log(formFile);

				var that = this;
				$("#chooceImg").attr({
					disabled: "disabled"
				})
				$("#chooceImg").val("正在上传图片...");
				$.ajax({
					url: server + "/zuul/videos/uploadFile",
					data: formFile,
					type: "Post",
					dataType: "json",
					cache: false, //上传文件无需缓存
					processData: false, //用于对data参数进行序列化处理 这里必须false
					contentType: false, //必须
					Accept: "text/html;charset=UTF-8",
					xhr: function () {
						var myXhr = new window.XMLHttpRequest();
						myXhr.upload.addEventListener('progress', function (e) {
							console.log("in Upload progress");
						}, false); // for handling the progress of the upload
						myXhr.addEventListener("progress", function (e) {
							console.log("in Download progress");
							if (e.lengthComputable) {
								var percentComplete = Math.round((e.loaded / e.total) * 100);
								$("#image-progress-width").css("width", percentComplete + '%');
							} else {
								console.log("Length not computable.");
							}
						}, false);
						return myXhr;
					},
					beforeSend: function () {
						$("#image-progress").show();
					},
					complete: function () {
						$("#image-progress").hide();
					},
					success: function (result) {
						$("#image-progress").hide();
						$("#chooceImg").removeAttr("disabled");
						$("#chooceImg").val("选择图片");
						
						//console.log(result.data.uploadFileName);
						if (result.code == 200) {
							that.uploadImgFileshow = true;
							$("#uploadImgPath").val(result.data.uploadFileName);
						}else{
							if(result.code == 402){
								that.expireLogin();
							}
							alert(result.message);
						}
					},
					error: function () {
						$("#image-progress").hide();
						$("#chooceImg").removeAttr("disabled");
						$("#chooceImg").val("选择图片");
						layer.alert("上传缩略图失败！");
					}
				})


			},
			uploadVideos: function () {
				var server = this.server;
				var layer = this.$layer;
				var fileObj = document.getElementById("inputVideofile").files[0];
				console.log(fileObj);
				this.fileSize = fileObj.size;

				let filename = fileObj.name;
				let attachNameImage = filename.substring(filename.lastIndexOf("\\") + 1, filename.length);
				this.attachNameVideo = attachNameImage;
				var re = new RegExp(".(avi|mp4|wmv|flv|rm|rmvb|asf|mov|mpg|dvr|divx|ts|mkv)$", "i");
				if (!re.test(attachNameImage)) {
					layer.alert("文件类型不正确,请选择视频");
					return false;
				}
				if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
					layer.alert("请选择视频");
					return;
				}

				var formFile = new FormData();
				formFile.append("attachName", attachNameImage);
				formFile.append("tag", "video");
				formFile.append("userId", this.userId);
				$("#chooceVideo").attr({
					disabled: "disabled"
				})
				$("#chooceVideo").val("正在上传视频...");

				//将文件切片
				var filesize = fileObj.size;
				var setsize = 1024 * 1024 * 5; //10M
				//var filecount = Math.ceil(filesize / setsize);

				var fileArray = this.$options.methods.cutFile(fileObj, setsize);
				console.log(fileArray);
				$("#video-progress").show(); //显示进度条
				$("#video-progress-width").css("width", 0 + '%');
				formFile.append("uploadfile", fileArray[0].file); //加入文件对象
				formFile.append("count", 0);
				formFile.append("name", fileArray[0].name);

				var lengthArray = fileArray.length;
				if (lengthArray == 1) {
					formFile.append("isLast", "true");
				} else {
					formFile.append("isLast", "false");
				}
				formFile.append("total", lengthArray);
				this.$options.methods.ajaxUploadLargeFile(1, formFile, lengthArray, server, layer, this, fileArray, this.isShowUploadVideo);
			},
			ajaxUploadLargeFile: function (count, formFile, totle, server, layer, that, fileArray, isShowUploadVideo) {
				var percentComplete = Math.round((count * 100) / totle);
				$.ajax({
					url: server + "/zuul/videos/uploadFile",
					data: formFile,
					type: "Post",
					dataType: "json",
					cache: false, //上传文件无需缓存
					processData: false, //用于对data参数进行序列化处理 这里必须false
					contentType: false, //必须
					//context: document.body, //this指向该DOM
					beforeSend: function () {
						//$("#video-progress").show();
					},
					complete: function () {
						if (isShowUploadVideo) { //上传视频
							$("#video-progress-width").css("width", percentComplete + '%');
							if (count == totle) { //最后一个文件
								$("#video-progress").hide();
								$("#chooceVideo").removeAttr("disabled");
								$("#chooceVideo").val("选择视频");
							}
						} else { //上传文件
							$("#file-progress-width").css("width", percentComplete + '%');
							if (count == totle) { //最后一个文件
								$("#file-progress").hide();
								$("#chooceFile").removeAttr("disabled");
								$("#chooceFile").val("选择文件");
							}
						}

					},
					success: function (result) {
						if (count == totle) {
							if (isShowUploadVideo) {
								$("#video-progress-width").css("width", 0 + '%');
								if (result.code == 200) {
									that.uploadVideoFileshow = true;
									$("#uploadVideoPath").val(result.data.uploadFileName);
								}else{
									if(result.code == 402){
										that.expireLogin();
									}
									alert(result.message);
								}
							} else {
								$("#file-progress-width").css("width", 0 + '%');
								if (result.code == 200) {
									that.uploadFileshow = true;
									$("#uploadFilePath").val(result.data.uploadFileName);
								}else{
									if(result.code == 402){
										that.expireLogin();
									}
									alert(result.message);
								}
							}

						} else {
							formFile.set("uploadfile", fileArray[count].file);
							formFile.set("count", count);
							formFile.set("name", fileArray[count].name);
							formFile.append("sessionToken", that.sessionToken);
							formFile.append("userId", that.userId);
							if (count == totle - 1) {
								formFile.set("isLast", "true");
							} else {
								formFile.set("isLast", "false");
							}
							that.$options.methods.ajaxUploadLargeFile(++count, formFile, totle, server, layer, that, fileArray,isShowUploadVideo);
						}
					},
					error: function () {
						if (isShowUploadVideo) {
							$("#video-progress").hide();
							$("#chooceVideo").removeAttr("disabled");
							$("#chooceVideo").val("选择视频");
							layer.alert("上传视频失败!");
						} else {
							$("#file-progress").hide();
							$("#chooceFile").removeAttr("disabled");
							$("#chooceFile").val("选择文件");
							layer.alert("上传文件失败!");
						}

						return false;
					}
				})
			},
			uploadFiles: function () {
				var server = this.server;
				var layer = this.$layer;
				var fileObj = document.getElementById("inputfile").files[0];
				this.fileSize = fileObj.size;

				let filename = fileObj.name;
				this.attachNameFile = filename;
				if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
					layer.alert("请选择文件");
					return;
				}

				var formFile = new FormData();
				formFile.append("attachName", filename);
				formFile.append("tag", "file");
				$("#chooceFile").attr({
					disabled: "disabled"
				})
				$("#chooceFile").val("正在上传文件...");

				//将文件切片
				var filesize = fileObj.size;
				var setsize = 1024 * 1024 * 20; //10M
				//var filecount = Math.ceil(filesize / setsize);

				var fileArray = this.$options.methods.cutFile(fileObj, setsize);
				$("#file-progress").show(); //显示进度条
				$("#file-progress-width").css("width", 0 + '%');
				formFile.append("uploadfile", fileArray[0].file); //加入文件对象
				formFile.append("count", 0);
				formFile.append("name", fileArray[0].name);
				formFile.append("sessionToken", this.sessionToken);
				formFile.append("userId", this.userId);

				var lengthArray = fileArray.length;
				if (lengthArray == 1) {
					formFile.append("isLast", "true");
				} else {
					formFile.append("isLast", "false");
				}
				formFile.append("total", lengthArray);
				this.$options.methods.ajaxUploadLargeFile(1, formFile, lengthArray, server, layer, this, fileArray, this.isShowUploadVideo);
			},
			submitUpload: function () {
				var server = this.server;
				var data = $("#uploadFileForm").serializeArray();
				var fromData = {};
				$.each(data, function () {
					fromData[this.name] = this.value;
				});
				fromData.filename = this.attachNameFile;
				fromData.fileSize = (this.fileSize / (1024 * 1024)).toFixed(2); //M
				fromData.userId = this.userId;
				var datas = JSON.parse(JSON.stringify(fromData));
				var layer = this.$layer;

				console.log(datas);
				$.ajax({
					type: "post",
					url: server + "/videos/saveFile",
					data: datas,
					contentType: "application/x-www-form-urlencoded",
					//contentType: "application/json;charset=utf-8",
					success: function (result) {
						if (result.code == 200) {
							parent.location.reload();
						}else{
							result = JSON.parse(result);
							if(result.code == 402){
								that.expireLogin();
							}
							layer.msg(result.message);
						}
					},
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
				} else if (fromData.description == "") {
					this.$layer.alert("内容说明过长");
					return;
				} else if (fromData.filename == "") {
					this.$layer.alert("主题名称太长");
					return;
				}

				fromData.userId = this.userId;
				var isownVal = $('input:radio[name="isown"]:checked').val();
				fromData.isown = isownVal;
				fromData.fileSize = (this.fileSize / (1024 * 1024)).toFixed(2); //M

				fromData.sessionToken = this.sessionToken;
				var datas = JSON.parse(JSON.stringify(fromData));
				var layer = this.$layer;
				var sessionToken = this.sessionToken;
				
				$.ajax({
					type: "post",
					url: server + "/videos/saveMedia",
					beforeSend: function(XMLHttpRequest) {
						XMLHttpRequest.setRequestHeader("Authorization",sessionToken);
					}, 
					data: datas,
					contentType: "application/x-www-form-urlencoded",
					//contentType: "application/json;charset=utf-8",
					success: function (result) {
						if (result.code == 200) {
							parent.location.reload();
							$("#description").val("");
							$("#filename").val("");
						}else{
							result = JSON.parse(result);
							if(result.code == 402){
								that.expireLogin();
							}
							layer.msg(result.message);
						}
					},
				})

			},
			cutFile: function (file, cutSize) {
				var count = file.size / cutSize | 0,
					fileArr = [];
				for (var i = 0; i < count; i++) {
					fileArr.push({
						name: file.name + ".part" + (i + 1),
						file: file.slice(cutSize * i, cutSize * (i + 1))
					});
				};
				fileArr.push({
					name: file.name + ".part" + (count + 1),
					file: file.slice(cutSize * count, file.size)
				});
				return fileArr;
			},
			deleteAttach: function (type) {
				var server = this.server;
				var layer = this.$layer;

				//var attachName = type == "img" ? $("#uploadImgPath").val() : $("#uploadVideoPath").val();
				var attachName;
				if (type == "img") {
					attachName = $("#uploadImgPath").val();
				} else if (type == "video") {
					attachName = $("#uploadVideoPath").val();
				} else if (type == "file") {
					attachName = $("#uploadFilePath").val();
				}
				var tag = type;
				var that = this;
				var sessionToken = that.sessionToken;
				$.ajax({
					type: "post",
					url: server + '/videos/deleteFile',
					data: {
						'attachName': attachName,
						'tag': tag,
						"userId": that.userId,
					},
					beforeSend: function(XMLHttpRequest) {
						XMLHttpRequest.setRequestHeader("Authorization",sessionToken);
					},
					contentType: "application/x-www-form-urlencoded",
					//contentType: "application/json;charset=utf-8",
					success: function (result) {
						if (result.code == 200) {
							if (type == "img") {
								//$("#uploadFile").empty();
								that.uploadImgFileshow = false;
								$("#uploadImgPath").val('');
							} else if (type == "video") {
								//$("#uploadVideoFile").empty();
								that.uploadVideoFileshow = false;
								$("#uploadVideoPath").val('');
							} else {
								//$("#isUploadFile").empty();
								that.uploadFileshow = false;
								$("#uploadFilePath").val('');
							}
						}else{
							result = JSON.parse(result);
							if(result.code == 402){
								that.expireLogin();
							}
							that.$layer.msg(result.message);
						}
					}

				});

			},
			getProgress: function () {
				console.log(111);
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
