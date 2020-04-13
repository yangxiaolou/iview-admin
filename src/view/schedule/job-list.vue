<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
        <Button style="margin-left: 8px" type="primary" @click="save()">新增</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>
<script>
  import { getJobList } from '@/api/data'
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        },
        columns7: [
          {
            title: '执行类名称',
            key: 'beanName'
          },
          {
            title: '方法名称',
            key: 'methodName'
          },
          {
            title: '参数',
            key: 'params'
          },
          {
            title: 'cron表达式',
            key: 'cronExpression'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, 'Edit'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, 'Delete')
              ])
            }
          }
        ],
        data6: []
      }
    },
    created () {
      getJobList().then(res => {
        this.data6 = res.data.data
      })
    },
    methods: {
      edit (index) {
        const route = {
          name: 'save_job_page',
          query: {
            id: this.data6[index].id
          }
        }
        this.$router.push(route)
      },
      remove (index) {
        removeUserById(this.data6[index].id).then((res) => {
          if (res.data.success) {
            this.$Message.success('删除成功')
            getUserList().then(res => {
              this.data6 = res.data.data
            })
          }
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      save() {
        const route = {
          name: 'save_job_page'
        }
        this.$router.push(route)
      }
    }
  }
</script>
