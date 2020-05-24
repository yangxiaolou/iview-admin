<template>
  <div>
    <Form ref="formInline" :model="formInline" inline>
      <FormItem prop="title">
        <Input type="text" v-model="formInline.title" placeholder="标题">
        </Input>
      </FormItem>
      <FormItem prop="content">
        <Input type="text" v-model="formInline.content" placeholder="内容">
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">搜索</Button>
        <Button style="margin-left: 8px" type="primary" @click="save()">新增</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>
<script>
  import { getMessageList} from '@/api/data'
  export default {
    data () {
      return {
        formInline: {
          title: '',
          content : ''
        },
        columns7: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '内容',
            key: 'content'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.detail(params.index)
                    }
                  }
                }, '查看详情')
              ])
            }
          }
        ],
        data6: []
      }
    },
    created () {
      getMessageList(this.formInline).then(res => {
        this.data6 = res.data.data
      })
    },
    methods: {
      detail (index) {
        const route = {
          name: 'save_job_page',
          query: {
            id: this.data6[index].id
          }
        }
        this.$router.push(route)
      },
      handleSubmit() {
        getMessageList(this.formInline).then(res => {
          this.data6 = res.data.data
        })
      },
      save() {
        const route = {
          name: 'save_message'
        }
        this.$router.push(route)
      }
    }
  }
</script>
