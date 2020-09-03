<template>
  <div class="sgpt-app-wrapper">
    <div class="sgpt-main-container">
      <div class="sgpt-fixed-header">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
  <!-- <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div> -->
</template>

<script>
import { Navbar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin]
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .sgpt-app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .sgpt-fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 909;
    width: 100%;
    transition: width 0.28s;
  }
</style>
