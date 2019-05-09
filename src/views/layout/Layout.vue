<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      style="width:100px;flex: 0 0 100px;min-width:100px;max-width:100px;background:#fff;border-right:1px solid#e8e8e8;height:100vh;position:fixed;left:0">
      <div class="logo">
        <svg-icon icon-class="logo"/>
      </div>
      <a-menu theme="light" mode="inline" :defaultSelectedKeys="defaultSelectedKeys" style="width: 100px">
        <a-menu-item :title="item.title"  @click="selectMenu(item)" v-for="(item,index) in firstLevel" :key="index" class="ant-menu-item_first" style="padding:5px 0!important;">
          <svg-icon :icon-class="item.icon"/>
          <p>{{item.title}}</p>
        </a-menu-item>
      </a-menu>
     
    </a-layout-sider>
    <a-layout  style="marginLeft:100px">
      <a-layout-sider class="special" style="background: #fff; padding: 20px;position:relative" v-if="!collapsed">
        <a-menu
            mode="inline"
            theme="light"
            :inlineCollapsed="collapsed"
            class="boxMenu"
          >
          <template v-for="item in secondLevel">
            <a-menu-item v-if="!item.children" :key="item.key">
              <router-link :to="{name: item.name }" >
                 <span>{{item.meta.title}}</span>
              </router-link>
            </a-menu-item>
            <sub-menu v-else :menu-info="item" :key="item.key"/>
          </template>
        </a-menu> 
      </a-layout-sider>
      <a-layout>
          <a-layout-header style="background: #fff; padding: 0;top:0;flex:auto">
            <div class="flexbox">  
                <a-icon
                  class="trigger"
                  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="()=> collapsed = !collapsed"
                />
                <navbar/>
            </div>
          </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' ,  marginTop: '22px'}">
          <app-main/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import SubMenu from './subMenu'
import { Navbar, AppMain } from './components'
// 获取菜单
import {getMenu} from '@/api/login.js'

import { addRouter } from '@/utils/addRouter'
export default {
  name: 'Layout',
  computed:{
    
    routes() {
      return this.$store.getters.routerList
    },
  },
  data(){
    return {
      defaultSelectedKeys:['1'],
      // 展开
      collapsed: true,
      // 菜单列表
      menuList:[],
      // 菜单列表map
      menuListMap:{},
      // 一级菜单
      firstLevel:[],
      // 二级菜单
      secondLevel:[]
    }
  },
  components: {
    Navbar,
    AppMain,
    'sub-menu': SubMenu,
  },
  created(){
    this.getAllMenu()
  },
  methods: {
    async getAllMenu(){
      let result = await getMenu(localStorage.getItem('SET_NAME'))
      this.menuList = addRouter(result.data.data.router)
      console.log(this.menuList)
      this.firstLevel = []
      this.menuListMap = {}
      // 数组对象转map
      if(this.menuList){
        let newMap = new Map()
        this.menuList.forEach((item) => {
          this.firstLevel.push({
            name:item.name,
            icon:item.meta.icon,
            title:item.meta.title
          })
          newMap.set(item.name, item.children)
        })
        // 菜单map
        this.menuListMap = newMap
      }
    },
    // 选择一级菜单
    selectMenu(value){
      this.secondLevel = this.menuListMap.get(value.name)
      if(this.secondLevel){
        this.collapsed =false
      }else{
        this.collapsed =true
        this.$router.push({name:value.name})
      }
    },
    // 选择二级菜单
 
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 100px;
    background: rgba(255,255,255,.2);
    padding: 16px;
    text-align: center;
     .svg-icon{
      width: 70px;
      height:70px;;
    }
  }
  .flexbox{
    display: flex;
    width:100%;
    align-items: center;
    justify-content:space-between;
  }
  .ant-menu-item_first{
    margin:0!important;
    padding:5px 0!important;
    height: auto!important;
    line-height: auto!important;
    text-align: center;
    p{
      padding: 0;
      margin:0;
      height:1rem;
      line-height: 1rem;
    }
  }
  .svg-icon{
    width: 30px;
    height:30px;;
  }
 
  .boxMenu{
    border-right:none;
    >li{
      background:rgba(255,255,255,1);
      box-shadow:2px 2px 16px rgba(143,178,238,0.5);
      opacity:1;
      margin-bottom:20px;
      border-radius:10px;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
#components-layout-demo-custom-trigger{
  .special{
    .ant-layout-sider-children{
      position: fixed;
      width:160px;
    }
  }
  .boxMenu{
    .ant-menu-item-selected{
      >a{
        color:#fff!important;
        &:hover{
          color:#fff!important;
        }
      }
      background:rgba(66,131,255,1);
      color:#fff!important;
      &::after{
        border-right:none;
      }
    }
  }
}
</style>

