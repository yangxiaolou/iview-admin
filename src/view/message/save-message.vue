<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
    <FormItem label="标题" prop="title">
      <Input style="width: 30%" v-model="formValidate.title" placeholder="输入标题"></Input>
    </FormItem>
    <FormItem label="内容" prop="content">
      <Input style="width: 30%" v-model="formValidate.content" placeholder="输入内容"></Input>
    </FormItem>
    <FormItem label="推送人" prop="receiverId">
      <Select v-model="formValidate.receiverId" style="width:260px" placeholder="请选择推送人">
        <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button type="primary" v-if="$route.query.id" @click="update('formValidate')">更新</Button>
      <Button v-else type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button v-if="$route.query.id" @click="$router.go(-1)" style="margin-left: 8px">返回</Button>
      <Button v-else @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {saveMessage, getMessageById} from '@/api/data'
  import { getUserList } from '@/api/user'
  import {routeEqual} from '@/libs/util'
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        formValidate: {
          title: '',
          content: '',
          receiverId: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'}
          ],
          receiverId: [
            {required: true, message: '推送人不能为空', trigger: 'change',type:'number'}//iview的Select控制value为数字类型时表单验证无法通过,所以要加type标注
          ]
        },
        userList: {}
      }
    },
    created () {
      if (this.$route.query.id) {
        this.getMessage(this.$route.query.id)
      }
      getUserList().then(res => {
        this.userList =  res.data.data
      })
    },
    methods: {
      ...mapMutations([
        'setTagNavList'
      ]),
      update (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            saveMessage(this.formValidate).then((res) => {
              this.$Message.success('更新成功')
              let tagNavList = this.$store.state.app.tagNavList.filter(item => !routeEqual(this.$route, item))
              this.$router.push('message_list')
              this.setTagNavList(tagNavList)
            })
          }
        })
      },
      getMessage (id) {
        getMessageById(id).then(res => {
          if (res.data.success) {
            this.formValidate = res.data.data
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            saveMessage(this.formValidate).then((res) => {
              if (res.data.success) {
                this.$Message.success('提交成功')
                let res = this.$store.state.app.tagNavList.filter(item => !routeEqual(this.$route, item))
                this.$router.push('message_list')
                this.setTagNavList(res)
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }
    }
  }
</script>
