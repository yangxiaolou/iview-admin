<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem>
        <Button style="margin-left: 8px" type="primary" @click="save()">新增</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>
<script>
  import { getJobList, removeJobById, pause, resume } from '@/api/data'
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
            key: 'status',
            render: (h, params) => {
              let name = ['运行','停止']
              let styleColor = ['#04881A','#ff6600']
              return h('span',{
                style: {
                  color: styleColor[params.row.status]
                }
              }, name[params.row.status])
            }
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
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              let name = ['停止','启动']
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
                      this.pauseOrResume(params.index)
                    }
                  }
                }, name[params.row.status]),
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
                }, '编辑'),
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
                }, '删除')
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
      pauseOrResume (index) {
        if(this.data6[index].status){
          resume(this.data6[index].id).then((res) => {
            if (res.data.success) {
              this.$Message.success('启动成功')
              getJobList().then(res => {
                this.data6 = res.data.data
              })
            }
          })
        } else {
          pause(this.data6[index].id).then((res) => {
            if (res.data.success) {
              this.$Message.success('停止成功')
              getJobList().then(res => {
                this.data6 = res.data.data
              })
            }
          })
        }
      },
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
        removeJobById(this.data6[index].id).then((res) => {
          if (res.data.success) {
            this.$Message.success('删除成功')
            getJobList().then(res => {
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
