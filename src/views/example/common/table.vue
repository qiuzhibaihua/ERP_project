<template>
  <div>
    <common-table :current="current" :pageSize="pageSize" :total="total" @changeTable="changeTable">
      <a-table :columns="columns"
        :dataSource="tableData"
        :pagination="pagination"
        :loading="loading"
        slot="table"
      >
      </a-table>
    </common-table>
  </div>
</template>

<script>
import commonTable from '@/components/Table'
export default {
  data() {
    return {
      // 当前页
      current: 1,
      // 一页数量
      pageSize:10,
      // 总计
      total: 50,
      pagination:false,
      // 表格数据是否加载中
      loading:false,
      // 表格头部
      columns: [{
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
        scopedSlots: { customRender: 'name' },
      }, {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
        width: '20%',
      }, {
        title: 'Email',
        dataIndex: 'email',
      }],
      tableData:[{
        "gender": "female",
        "name": {
          "title": "ms",
          "first": "maurien",
          "last": "van der geer"
        },
        "email":'123'
      }]
    }
  },
  components:{
    commonTable
  },
  watch: {
      
  },

  methods: {
    // 更新表格
    changeTable(val){
      console.log(val)
    },
  }
}
</script>

