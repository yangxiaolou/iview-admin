<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvator"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="modifyInfo">修改信息</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapMutations } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapMutations([
      'setToken',
      'setAccess',
      'setTagNavList'
    ]),
    // ...mapActions([
    //   'handleLogOut'
    // ]),
    logout () {
      this.setToken('')
      this.setAccess([])
      this.setTagNavList([])
      location.href = 'http://127.0.0.1:8081/logout'
      // this.handleLogOut().then((res) => {
      //   if (res.data) {
      //     // 重定向到sso
      //     location.href = res.data
      //   }
      // })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    modifyInfo () {
      this.$router.push({
        name: 'person_information'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
        case 'modifyInfo': this.modifyInfo()
      }
    }
  }
}
</script>
