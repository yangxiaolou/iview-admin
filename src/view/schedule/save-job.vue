<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="执行类名称" prop="beanName">
      <Input style="width: 30%" v-model="formValidate.beanName" placeholder="输入执行类的完整路径名称"></Input>
    </FormItem>
    <FormItem label="方法名称" prop="methodName">
      <Input style="width: 30%" v-model="formValidate.methodName" placeholder="输入方法名称"></Input>
    </FormItem>
    <FormItem label="参数" prop="params">
      <Input style="width: 30%" v-model="formValidate.params" placeholder="输入方法执行参数"></Input>
    </FormItem>
    <FormItem label="cron表达式" prop="cronExpression">
      <Input style="width: 30%" v-model="formValidate.cronExpression" placeholder="输入正确的cron表达式"></Input>
    </FormItem>
    <FormItem label="备注" prop="remark">
      <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
             placeholder="输入备注"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button v-if="$route.query.id" @click="$router.go(-1)" style="margin-left: 8px">返回</Button>
      <Button v-else @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {saveJob, getJobById} from '@/api/data'
  import {routeEqual} from '@/libs/util'
  import {mapMutations, mapState} from 'vuex'
  export default {
    data () {
      return {
        formValidate: {
          beanName: '',
          methodName: '',
          params: '',
          cronExpression: '',
          remark: ''
        },
        ruleValidate: {
          beanName: [
            {required: true, message: 'bean名称不能为空', trigger: 'blur'}
          ],
          methodName: [
            {required: true, message: '方法名称不能为空', trigger: 'blur'}
          ],
          cronExpression: [
            {required: true, message: 'cron表达式不能为空', trigger: 'change'}
          ]
        }
      }
    },
    created () {
      if (this.$route.query.id) {
        this.getJob(this.$route.query.id)
      }
    },
    methods: {
      ...mapMutations([
        'setTagNavList'
      ]),
      getJob (id) {
        getJobById(id).then(res => {
          if (res.data.success) {
            this.formValidate = res.data.data
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            saveJob(this.formValidate).then((res) => {
              if (res.data.success) {
                this.$Message.success('提交成功')
                let res = this.$store.state.app.tagNavList.filter(item => !routeEqual(this.$route, item))
                this.$router.push('job_list_page')
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
