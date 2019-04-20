<style lang="less">
  @import './login.less';
</style>

<template>
  <div>
    <!--<div class="login-con">-->
      <!--<Card icon="log-in" title="欢迎登录" :bordered="false">-->
        <!--<div class="form-con">-->
          <!--<login-form @on-success-valid="handleSubmit"></login-form>-->
          <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
        <!--</div>-->
      <!--</Card>-->
    <!--</div>-->
  </div>
</template>

<script>
import {handleDispatch} from '@/api/user'
import LoginForm from '_c/login-form'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'loadConstants'
    ]),
    ...mapMutations([
      'setToken'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.loadConstants()
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    handleDispatch () {
      handleDispatch().then(res => {
        if (res.data.success) {
          // 重定向到sso
          location.href = res.data.data
        } else {
          this.$Message.warning(res.data.data)
        }
      })
    }
  },
  created () {
    this.handleDispatch() // 一开始就去请求后端，后端第一次肯定跳转到cas，登录后后端请求该地址，再去访问后端，后端返回数据，存cookie.
  }
}
</script>

<style>

</style>
