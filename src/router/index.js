import Vue from 'vue'  //导入Vue
import Router from 'vue-router' //导入vue-route库
import index from '@/components/index' // 导入index.vue 组件
import login from '@/components/login' // 导入login.vue 组件
import upload from '@/components/uploadModule' 
import videoPlay from '@/components/videoPlay' 

Vue.use(Router) //全局注册Router组件，它会绑定到Vue实例里面。

import VideoPlayer from 'vue-video-player' 
require('video.js/dist/video-js.css') 
require('vue-video-player/src/custom-theme.css') 
Vue.use(VideoPlayer)

export default new Router({  // 创建 router 实例，然后传 `routes` 配置
  routes: [
    {
      path: '/login', //访问路径
      name: 'login', //路径名
      component: login //访问的组件,即访问‘/’,它会加载 index 组件所有的内容
    },
		{
			path:'/index',
			name:'index',
			component:index
		},{
			path:'/uploadModule',
			name:'upload',
			component:upload
		},{
			path:'/videoPlay/:videoId',
			name:'videoPlay',
			component:videoPlay
		}
  ]
})
