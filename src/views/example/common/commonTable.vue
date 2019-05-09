<template>
  <div class="app-container">
    <!-- 表格 -->
    <slot name="table"> </slot>
    <!-- 分页 -->
    <a-pagination
    :pageSizeOptions="pageSizeOptions"
    :total="total"
    showQuickJumper
    showSizeChanger
    v-model="Ccurrent"
    :pageSize.sync="CpageSize"
    :itemRender="itemRender"
    :showTotal="total => `总计 ${total} 条`"
    class="pageLider"
  >
      <template slot='buildOptionText' slot-scope='props'>
        <span v-if="props.value!==Ctotal">{{props.value}}条/页</span>
        <span v-if="props.value===Ctotal">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
export default {

  data() {
    return {
      // 分页数量
      pageSizeOptions:['10', '20', '30', '40', '50'],
      CpageSize:this.pageSize,
      Ccurrent:this.current,
      Ctotal:this.total
    }
  },
  props:{
    total:{
      type:Number,
      default:0,
    },
    pageSize:{
      type:Number,
      default:10,
    },
    current:{
      type:Number,
      default:1,
    }
  },
  watch: {
      CpageSize(val) {
        let params = {
          current:this.Ccurrent,
          pageSize:this.CpageSize
        }
        this.$emit('changeTable',params)
      },
      Ccurrent(val) {
        let params = {
          current:this.Ccurrent,
          pageSize:this.CpageSize
        }
        this.$emit('changeTable',params)
      }
  },

  methods: {
    itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>上一页</a>;
      } else if (type === 'next') {
        return <a>下一页</a>;
      }
      return originalElement;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .pageLider{
    padding:20px 0;
    text-align: right;
  }
</style>


