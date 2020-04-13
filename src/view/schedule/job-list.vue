<template>
  <Table border :columns="columns7" :data="data6"></Table>
</template>
<script>
  import { getUserList, removeUserById } from '@/api/user'
  export default {
    data () {
      return {
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
      getUserList().then(res => {
        this.data6 = res.data.data
      })
    },
    methods: {
      edit (index) {
        const route = {
          name: 'edit',
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
      }
    }
  }
</script>
