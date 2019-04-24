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

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.prototype.expireLogin = function () {
	/* sessionStorage.removeItem('sessionToken');
	localStorage.removeItem("sessionToken");
	sessionStorage.removeItem('username');
	localStorage.removeItem("username");
	sessionStorage.removeItem('userId');
	localStorage.removeItem("userId"); */
	this.removeCookie("username");
	this.removeCookie("userId");
	this.removeCookie("sessionToken");
	this.GLOBAL.sessionToken = "";
	this.$router.push({
		name: "index",
	})
}

//设置cookie
Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getTime()+24*60*60*1000)//设置过期时间，后台设置，这里不做短时间设置
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};
//获取cookie
Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
     var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};
//删除cookie
Vue.prototype.removeCookie = function(c_name){
	this.setCookie(c_name,"",-1);
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
		} else if (!Vue.prototype.getCookie('sessionToken')) {
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
