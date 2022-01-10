module.exports = {
  server: {
    // host: "127.0.0.1",
    host: "0.0.0.0", // 监听所有网口地址
    port: 3000
  },
  plugins: [
    '~/plugins/request.js', // ~表示从根路径出发
    '~/plugins/dayjs.js'
  ], // 注册插件
  router: {
    linkActiveClass: "active", // 在nuxt中 被匹配的路由会被加上active的样式，并且可以通过linkActiveClass进行自定义
    // 自定义路由规则
    extendRoutes(routes, resolve) {
      routes.splice(0); // 清空nuxt.js路由规则
      routes.push(
        ...[
          {
            path: "/",
            component: resolve(__dirname, "pages/layout"),
            children: [
              {
                path: "", // 默认子路由
                name: "home",
                component: resolve(__dirname, "pages/home"),
              },
              {
                path: "login",
                name: "login",
                component: resolve(__dirname, "pages/login"),
              },
              {
                path: "register",
                name: "register",
                component: resolve(__dirname, "pages/login"),
              },
              {
                path: "profile/:username",
                name: "profile",
                component: resolve(__dirname, "pages/profile"),
              },
              {
                path: "settings",
                name: "settings",
                component: resolve(__dirname, "pages/settings"),
              },
              {
                path: "editor",
                name: "editor",
                component: resolve(__dirname, "pages/editor"),
              },
              {
                path: "article/:slug",
                name: "article",
                component: resolve(__dirname, "pages/article"),
              },
            ],
          },
        ]
      );
    },
  },
};
