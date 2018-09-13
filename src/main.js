// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import uploader from 'vue-simple-uploader'

import $ from 'jquery';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/bootstrap/js/bootstrap.min.js';

import global_ from './components/global' // 导入全局变量
Vue.prototype.GLOBAL = global_

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false // 关闭生产模式下给出的提示

Vue.prototype.expireLogin = function () {
	sessionStorage.removeItem('sessionToken');
	localStorage.removeItem("sessionToken");
	sessionStorage.removeItem('username');
	localStorage.removeItem("username");
	sessionStorage.removeItem('userId');
	localStorage.removeItem("userId");
	this.GLOBAL.sessionToken = "";
	this.$router.push({
		name: "index",
	})
}

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (to.path == "/") {
			next({
				path: '/index',
				query: {
					redirect: to.fullPath
				}
			})
		} else if (to.path == "/login" || to.path == "/index") {
			next()
		} else if (!sessionStorage.getItem('sessionToken') && !localStorage.getItem('sessionToken')) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
