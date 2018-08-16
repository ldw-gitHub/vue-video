<template>
	<nav class="navbar navbar-default navbar-fixed-top col-md-10 col-md-offset-1">
		<div class="container">
			<a href="#" class="navbar-brand">
				<strong>Shop</strong>
			</a>

			<ul class="nav navbar-nav" id="menu_index">
				<li v-for="(relation,index) in relations" v-bind:id="relation.id" v-bind:class="{active:index==nowIndex}" v-on:click="relationClick(index)">
					<a>{{relation.title}}</a>
				</li>
			</ul>

			<ul id="loginMenu" class="nav navbar-nav navbar-right email_org_name">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						{{username}}
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
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				relations: [{
						title: '首页',
						id: 'index'
					},
					{
						title: '商城',
						id: ''
					},
					{
						title: '社区',
						id: ''
					},
					{
						title: '我的资源',
						id: ''
					},
					{
						title: '上传',
						id: 'upload'
					},
				],
				nowIndex: -1,
			}
		},
		created() {
			this.initData();
		},
		props: {
			username: {
				type: String
			},
		}, //子组件显式的用 props 选项声明它期待获得的数据，这里申明 它想要一个叫做’ item‘ 的数据,
		methods: {
			relationClick(id) {
				if (this.relations[id].id != "") {
					this.$router.push({
						name: this.relations[id].id,
						params: {
							username: this.username
						}
					})
				}
			},
			initData: function () {
				
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#menu_index {
		cursor: pointer;
	}
</style>
