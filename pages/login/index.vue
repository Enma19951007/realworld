<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index + field">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";
const Cookie = process.client ? require('js-cookie') : undefined // 只在客户端进行使用

export default {
  middleware: 'notAuthenticated',
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "enma",
        email: "459724367@qq.com",
        password: "12345678",
      },
      errors: {}, // 错误信息
    };
  },
  methods: {
    async onSubmit() {
      let [res, error] = await this.getApiFn({
        user: this.user,
      });
      // 下一步保存用户的登录状态
      if (res) {
        this.$store.commit('setUser', res.data.user)
        Cookie && Cookie.set('user', JSON.stringify(res.data.user))
        this.$router.push({ name: "home" });
        window.location.reload()
      }
      if (error) {
        this.errors = error.data.errors;
      }
    },
    // 根据登陆 注册返回对应的方法
    getApiFn(data) {
      if (this.isLogin) {
        return login(data);
      } else {
        return register(data);
      }
    },
  },
};
</script>

<style>
</style>
