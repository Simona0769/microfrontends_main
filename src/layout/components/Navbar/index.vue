<template>
  <div class="sgpt-navbar">
    <div class="navbar-hd">
      <h1 class="navbar-logo">
        <a href="javascript:;"><img></a>
      </h1>
    </div>
    <div class="navbar-bd">
      <navbar-menu />
      <navbar-news />
      <navbar-user />
    </div>

  </div>
</template>

<script>
import NavbarMenu from './NavbarMenu'
import NavbarNews from './NavbarNews'
import NavbarUser from './NavbarUser'
export default {
  components: {
    NavbarMenu,
    NavbarNews,
    NavbarUser
  }
}
</script>

<style lang="scss" scoped>
</style>
