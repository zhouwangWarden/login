import Vue from 'vue'
import VueRouter from 'vue-router'
import Loing from '../views/login'
import FramePage from '../views/framePage'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Loing },
  { path: '/home', component: FramePage },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from 代表从哪个路径跳转而来
  console.log(to, from);
  let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
  if (to.path === '/login') {
    return next();

  }
  if (isLogin == null) {
    return next({ path: '/login' });
  }
  return next()
})
export default router
