import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/destination/:id',
      name: 'DestinationPage',
      component: () => import(/* webpackChunkName: "destination" */ "@/views/DestinationPage")
    },
    {
      path: '/comparisons',
      name: 'ComparisonPage',
      component: () => import(/* webpackChunkName: "comparison" */ "@/views/ComparisonPage")
    }
  ]
})
