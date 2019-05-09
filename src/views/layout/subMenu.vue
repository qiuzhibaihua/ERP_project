<template functional>
  <a-sub-menu
    :key="props.menuInfo.key"
  >
    <span slot="title">
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.key"
      >
      <router-link :to="{name: item.name }" >
          <span>{{item.meta.title}}</span>
      </router-link>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.key"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo'],
  methods:{
      selectpath(){
          alert(1)
      }
  }
};
</script>