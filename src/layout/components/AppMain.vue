<template>
  <section class="sgpt-app-main">
    <div v-if="isMicroApp" id="subapp-viewport" />
    <transition v-else name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    isMicroApp() {
      return this.$route.meta.isMicrApp
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.sgpt-app-main {
  height: calc(100vh - #{$navbar--height});
  width: 100%;
  position: relative;
  overflow: scroll;
}
.sgpt-fixed-header+.sgpt-app-main {
  margin-top: $navbar--height;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .sgpt-fixed-header {
    padding-right: 15px;
  }
}
</style>
