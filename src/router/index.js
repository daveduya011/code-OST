import { createRouter, createWebHistory } from 'vue-router'
import Project from "@/views/Project";
import FallBack from "@/views/FallBack";

const routes = [
  {
    path: '/project/:projectID',
    name: 'Project',
    component: Project
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'FallBack',
    component: FallBack
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
