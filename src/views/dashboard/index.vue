<template>
  <div class="dashboard-container">
    {{name}}
    {{roles}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  position: absolute;
  &-container {
    margin: 30px;
    .toggle {
      position: absolute;
      right: 30px;
      top: 30px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
