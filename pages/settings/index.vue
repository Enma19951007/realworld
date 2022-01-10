<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submit">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="userData.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="userData.username" disabled class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="userData.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="userData.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" disabled type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        <button @click="logout">退出登陆</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user.js'
import { mapMutations } from 'vuex'
const cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: ['authenticated'],
  name: 'SettingsIndex',
  data () {
    return {
      userData: {
        bio: null,
        email: null,
        image: null,
        username: null
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    logout() {
      this.setUser(null)
      cookie && cookie.remove('user')
      window.location.reload()
    },
    async submit() {
      const [res, error] = await updateUser({
        user: {
          email: this.userData.email,
          bio: this.userData.bio,
          image: this.userData.image,
        }
      })
      if (res) {
        this.setUser(res.data.user)
        alert('修改成功')
      }
    }
  },
  async mounted() {
    const [res, error] = await getUser()
    if (res) {
      this.userData.bio = res.data.user.bio
      this.userData.email = res.data.user.email
      this.userData.image = res.data.user.image
      this.userData.username = res.data.user.username
    }
  }
}
</script>

<style>

</style>
