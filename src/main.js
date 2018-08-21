// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import uploader from 'vue-simple-uploader'

import $ from 'jquery';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/bootstrap/js/bootstrap.min.js';
import './assets/ajaxupload.js';

import global_ from './components/global' // 导入全局变量
Vue.prototype.GLOBAL = global_

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false // 关闭生产模式下给出的提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
