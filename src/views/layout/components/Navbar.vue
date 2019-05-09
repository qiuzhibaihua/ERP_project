<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" href="#">
      <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" style="width:35px">
      {{name}}<a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item key="0">
        <a  @click="logout">LogOut</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
      avatar(){
        return localStorage.getItem('SET_AVATAR')
      },
      name(){
        return localStorage.getItem('SET_NAME')
      }
  },
  methods: {
    
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

