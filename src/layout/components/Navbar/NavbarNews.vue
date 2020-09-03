<template>
  <div class="navbar-news">
    <div class="nn-item">
      <i class="smp-nav-icon smp-ni-news">
        <span>5</span>
      </i>
    </div>
    <div class="nn-item">
      <i class="smp-nav-icon smp-ni-notice">
        <span>7</span>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarNews',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.navbar-news{
  width:80px;
  flex-shrink: 0;
  display: flex;
  .nn-item{
    display: flex;
    align-items: center;
    justify-content: center;
    width:40px;
    i{
      position:relative;
      cursor: pointer;
    }
    span{
      position:absolute;
      top:0;
      right:0;
      transform: translate(40%,-40%);
      background-color: $smp--color-red;
      border-radius:40px;
      color:$smp--color-white;
      width:22px;
      height:22px;
      display: flex;
      align-items: center;
      text-indent: 3px;
      border:3px solid $smp--color-blue;
    }
  }
}
.smp-ni-back{
  background-image: url('~@/assets/img/nav/nav_fh_n.png');
}
.smp-ni-more{
  background-image: url('~@/assets/img/nav/nav_gd_n.png');
}
.smp-ni-news{
  background-image: url('~@/assets/img/nav/nav_tz.png');
}
.smp-ni-notice{
  background-image: url('~@/assets/img/nav/nav_gg.png');
}
</style>
