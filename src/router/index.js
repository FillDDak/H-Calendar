import { createRouter, createWebHashHistory } from 'vue-router'

import home from "@/views/home.vue"
import login from "@/views/login.vue"
import join from "@/views/join.vue"
import mypage from "@/views/mypage.vue"
import list from "@/views/list.vue"
import view from "@/views/view.vue"
import write from "@/views/write.vue"
import modify from "@/views/modify.vue"
import calendar from "@/views/calendar.vue"
import ai from "@/views/ai.vue"

const routes = [
  {
    path: "/",
    component: home
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
    path: "/mypage",
    component: mypage
  },
  {
    path: "/list",
    component: list
  },
  {
    path: "/view/:id",
    component: view
  },
  {
    path: "/write",
    component: write
  },
  {
    path: "/modify/:id",
    component: modify
  },
  {
    path: "/calendar",
    component: calendar
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
