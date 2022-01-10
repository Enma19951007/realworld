import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6bc5ae14 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _1fc14b6e = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _1404373f = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _060b9802 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _338c5c8d = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _5ff6d457 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _38771168 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _6bc5ae14,
    children: [{
      path: "",
      component: _1fc14b6e,
      name: "home"
    }, {
      path: "login",
      component: _1404373f,
      name: "login"
    }, {
      path: "register",
      component: _1404373f,
      name: "register"
    }, {
      path: "profile/:username",
      component: _060b9802,
      name: "profile"
    }, {
      path: "settings",
      component: _338c5c8d,
      name: "settings"
    }, {
      path: "editor",
      component: _5ff6d457,
      name: "editor"
    }, {
      path: "article/:slug",
      component: _38771168,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
