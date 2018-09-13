import Vue from 'vue' //导入Vue
import Router from 'vue-router' //导入vue-route库
import index from '@/components/index' // 导入index.vue 组件
import login from '@/components/login' // 导入login.vue 组件
import upload from '@/components/uploadModule'
import videoPlay from '@/components/videoPlay'
import myresource from '@/components/myResource' //我的视频
import classifiedMovie from '@/components/classifiedFilm' //具体分类视频
import myfileresource from '@/components/myfileresource' //我的文件

Vue.use(Router) //全局注册Router组件，它会绑定到Vue实例里面。

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

export default new Router({ // 创建 router 实例，然后传 `routes` 配置
	routes: [{
			path: '/', //进首页
			name: 'indexs', //路径名
			component: index, //
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/login', //访问路径
			name: 'login', //路径名
			component: login,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/index',
			name: 'index',
			component: index, //访问的组件,即访问‘/’,它会加载 index 组件所有的内容
			meta: {
				requiresAuth: false
			},
		},
		{
			path: '/myresource',
			name: 'myresource',
			component: myresource,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/myfileresource',
			name: 'myfileresource',
			component: myfileresource, 
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/uploadModule',
			name: 'upload',
			component: upload,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/videoPlay/:videoId',
			name: 'videoPlay',
			component: videoPlay,
			meta: {
				requiresAuth: false
			}
		}, {
			path: '/classifiedMovie/:movie/:title',
			name: 'classifiedMovie',
			component: classifiedMovie,
			meta: {
				requiresAuth: false
			}
		},
	]
})
