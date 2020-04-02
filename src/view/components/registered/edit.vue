<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="姓名" prop="name">
      <Input style="width: 30%" v-model="formValidate.name" placeholder="输入您的姓名"></Input>
    </FormItem>
    <FormItem label="手机号" prop="phone">
      <Input style="width: 30%" v-model="formValidate.phone" placeholder="输入您的手机号"></Input>
    </FormItem>
    <FormItem label="E-mail" prop="mail">
      <Input style="width: 30%" v-model="formValidate.mail" placeholder="输入您的邮箱"></Input>
    </FormItem>
    <FormItem label="生日" prop="birthday">
      <DatePicker type="date" placeholder="选择日期" v-model="formValidate.birthday"></DatePicker>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="男">Male</Radio>
        <Radio label="女">Female</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="授权">
      <Select v-model="formValidate.authoList" multiple style="width:260px">
        <Option v-for="item in authoList" :value="item.id" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="描述" prop="description">
      <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="输入描述"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button v-if="$route.query.id" @click="$router.push('user_list')" style="margin-left: 8px">返回</Button>
      <Button v-else @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
import {registered, getUserById} from '@/api/user'
import {mapMutations, mapState} from 'vuex'
import {routeEqual} from '@/libs/util'
export default {
  data () {
    return {
      formValidate: {
        name: '',
        phone: '',
        mail: '',
        gender: '',
        birthday: '',
        description: '',
        authoList: []
      },
      ruleValidate: {
        name: [
          {required: true, message: '姓名不能为空', trigger: 'blur'},
          {type: 'string', max: 10, message: '姓名不超过10个字', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '不正确的手机号格式', trigger: 'blur'}
        ],
        mail: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '不正确的邮箱格式', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择您的性别', trigger: 'change'}
        ],
        birthday: [
          {required: true, type: 'date', message: '请选择您的生日', trigger: 'change'}
        ],
        description: [
          {type: 'string', max: 1000, message: '描述不超过1000个字', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getUser(this.$route.query.id)
    }
  },
  computed: {
    ...mapState({
      authoList: state => state.app.authoType
    })
  },
  methods: {
    ...mapMutations([
      'setTagNavList'
    ]),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          registered(this.formValidate).then((res) => {
            if (res.data.success) {
              this.$Message.success('提交成功')
              let res = this.$store.state.app.tagNavList.filter(item => !routeEqual(this.$route, item)) // 先拿到不是自己的面包屑（先排除自己）
              this.$router.push('user_list') // 跳转到路由
              this.setTagNavList(res) // 遍历生成新的面包屑，就实现把自己关闭的功能
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      })
    },
    getUser (id) {
      getUserById(id).then(res => {
        if (res.data.success) {
          this.formValidate = res.data.data
        }
      })
    }
  }
}
</script>
