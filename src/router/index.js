import { createRouter, createWebHashHistory } from 'vue-router'

import home from "@/views/home.vue"
import calendar from "@/views/calendar.vue"
import list from "@/views/list.vue"
import write from "@/views/write.vue"
import view from "@/views/view.vue"
import modify from "@/views/modify.vue"
import join from "@/views/join.vue"
import login from "@/views/login.vue"
import mypage from "@/views/mypage.vue"
import ai from "@/views/ai.vue"

const routes = [
  {
    path: "/",
    component: home
  },
  {
    path: "/calendar",
    component: calendar
  },
  {
    path: "/mypage",
    component: mypage
  },
  {
    path: "/login",
    component: login
  },
  {
    path: "/join",
    component: join
  },
  {
    path: "/list",
    component: list
  },
  {
    path: "/write",
    component: write
  },
  {
    path: "/view/:id",
    component: view
  },
  {
    path: "/modify/:id",
    component: modify
  },
  {
    path: "/ai",
    component: ai
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
