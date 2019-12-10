import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import login from './views/login'

const contentList = () => import('./views/content/contentList')
const adminLIst = () => import('./views/user/adminLIst')


Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'login',
			component: login,
		},
		{
			path: '/content',
			name: 'home',
			component: home,
			children: [
				{
					path: '/contentList',
					name: 'contentList',
					component: contentList
				},{
					path: '/adminLIst',
					name: 'adminLIst',
					component: adminLIst
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: login
		}
	

	]
})
