<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- exact精准匹配时才会激活对应的样式 -->
            <router-link class="nav-link" to="/" active-class="active"  exact>Home</router-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <router-link class="nav-link" to="/editor">
                <i class="ion-compoose"></i>&nbsp;New Post
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile/123">
                <img class="user-pic" :src="user.image" alt="">
                {{ user.username }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/login"> Sign in </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register"> Sign up</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->

    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "LayoutIndex",
  computed: {
  ...mapState(['user'])
  },
};
</script>

<style>
</style>
