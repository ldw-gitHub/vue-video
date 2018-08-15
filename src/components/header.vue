<template>
	<div class="container">
		<a href="#" class="navbar-brand">
			<strong>Shop</strong>
		</a>
		<ul class="nav navbar-nav" id="menu_index">
			<li class="active" value="first">
				<a>首页</a>
			</li>
			<li value="secent">
				<a>商城</a>
			</li>
			<li value="third">
				<a>社区</a>
			</li>
			<li value="myfile">
				<a>我的资源</a>
			</li>
			<li value="upload">
				<a>上传</a>
			</li>
		</ul>

		<ul id="loginMenu" class="nav navbar-nav navbar-right email_org_name">
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
					{{loginUser.username}}
					<i class="glyphicon glyphicon-user"></i>
				</a>
				<ul class="dropdown-menu">
					<li>
						<a href="#">个人信息</a>
					</li>
					<li class="divider"></li>
					<li>
						<a href="getLogout" id="logoutBtn">退出</a>
					</li>
				</ul>
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
		props: {
			loginUser: {
				type: Object
			},
		} //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据
	}

	//目录栏添加点击事件
	$("#menu_index").find('li').each(function () {
		$(this).click(function () {
			//把之前已有的active去掉
			$('.active').removeClass('active');
			//当前点击的li加上class
			$(this).addClass("active");
		})
	})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#menu_index {
		cursor: pointer;
	}
</style>
