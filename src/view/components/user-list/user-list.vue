<template>
  <Table border :columns="columns7" :data="data6"></Table>
</template>
<script>
import { getUserList, removeUserById } from '@/api/user'
import moment from 'moment'
export default {
  data () {
    return {
      columns7: [
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '手机',
          key: 'phone'
        },
        {
          title: '邮箱',
          key: 'mail'
        },
        {
          title: '生日',
          key: 'birthday',
          render: function (h, params) {
            return h('span', moment(params.row.birthday).format('YYYY-MM-DD'))
          }
        },
        {
          title: '性别',
          key: 'gender'
        },
        {
          title: '描述',
          key: 'description'
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
