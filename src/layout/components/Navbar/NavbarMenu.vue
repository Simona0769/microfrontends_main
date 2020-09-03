<template>
  <div class="navbar-menu">
    <div ref="nbm-wraper" class="nbm-wraper" :class="{'nbmw-open':menuOpen}">
      <div v-for="(item,index) in menuList" :key="index" class="nbm-item" :class="{'on':item.on}" @click="gotoPage(item)">
        <i class="smp-nav-icon" :class="[item.icon,{'on':item.on}]" />
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="nbm-switch">
      <div v-if="menuOpen" class="nbm-item" @click="changeMenuStatus">
        <i class="smp-nav-icon smp-ni-back" />
        <span>返回</span>
      </div>
      <div v-else class="nbm-item" @click="changeMenuStatus">
        <i class="smp-nav-icon smp-ni-more" />
        <span>更多</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NavbarMenu',
  data() {
    return {
      lineWrapIndex: '',
      menuOpen: false,
      // menuList: [
      //   {
      //     name: '首页',
      //     type: 'main-page',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_sy_n'
      //   },
      //   {
      //     name: '统一门户',
      //     type: 'sub-sys',
      //     url: '/micro-app/tymh',
      //     on: false,
      //     icon: 'smp-ni-nav_zhdd_n'
      //   },
      //   {
      //     name: '分析研判',
      //     type: 'sub-sys',
      //     url: '/micro-app/vue',
      //     on: false,
      //     icon: 'smp-ni-nav_fxyp_n'
      //   },
      //   {
      //     name: '微服务模版',
      //     type: 'sub-sys',
      //     url: '/micro-app/micro-app-template',
      //     on: false,
      //     icon: 'smp-ni-nav_jcyj_n'
      //   },
      //   {
      //     name: '效能评估',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_xnpg_n'
      //   },
      //   {
      //     name: '基础数据',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_jcsj_n'
      //   },
      //   {
      //     name: '基础组件',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_jczj_n'
      //   },
      //   {
      //     name: '反走私工作台',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_fzsgzt_n'
      //   },
      //   {
      //     name: '系统管理',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_xtgl_n'
      //   },
      //   {
      //     name: '智能运维',
      //     url: '/home',
      //     on: false,
      //     icon: 'smp-ni-nav_znyw_n'
      //   }
      // ]
    }
  },
  computed: {
    ...mapState('micro-app', [
      'apps'
    ]),
    menuList() {
      const res = [
        {
          title: '首页',
          type: 'main-page',
          url: '/home',
          on: false,
          icon: 'smp-ni-nav_sy_n'
        },
        ...this.apps.map(item => Object.assign({}, item, {on: false,  type: 'sub-sys', url: `/micro-app/${item.name}` }))
      ]
      return res
    }
  },
  methods: {
    changeMenuStatus() {
      this.menuOpen = !this.menuOpen
    },
    gotoPage(item) {
      this.upMenuItem(item)
      this.menuList.forEach((e, i) => {
        e.on = false
      })
      item.on = true
      this.$router.push({ path: item.url })
      // switch (item.type) {
      //   case 'main-page':
      //     this.$router.push({ path: item.url })
      //     break
      //   case 'sub-sys':
      //     this.$qkpush(item.url)
      //     break
      //   default:
      //     this.$qkpush(item.url)
      //     break
      // }
    },
    upMenuItem(item) {
      const wraper = this.$refs['nbm-wraper']
      const wraperW = wraper.getBoundingClientRect().width
      const itemW = 120
      this.lineWrapIndex = Math.floor(wraperW / itemW) - 1
      let spliceItemIndex = ''
      this.menuList.forEach((e, i) => {
        if (i <= this.lineWrapIndex) {
          return
        }
        if (e.name === item.name) {
          spliceItemIndex = i
        }
      })
      if (spliceItemIndex !== '') {
        this.menuList[spliceItemIndex] = this.menuList.splice(this.lineWrapIndex, 1, item)[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
/* smp navbar-menu
------------------------------ */
.navbar-menu{
  flex:1;
  padding:0 120px 0 0;
  z-index:100;
  position:relative;
  .nbm-wraper{
    margin:0 120px 0 0;
    flex:1;
    display: flex;
    flex-wrap: wrap;
    height:80px;
    overflow:hidden;
    &.nbmw-open{
      height:auto;
      background-color: $smp--color-blue;
      box-shadow: $smp--box-shadow;
      z-index: 999;
      .nbm-item{
        box-sizing:border-box;
        // border-right:1px solid rgba(255,255,255,0.1);
        // border-bottom:1px solid rgba(255,255,255,0.1);
      }
    }
  }
  .nbm-item{
    cursor: pointer;
    width:120px;
    flex-shrink: 0;
    height:80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
      font-size:14px;
      color:$smp--color-white;
      padding:5px 0 0 0;
    }
    &.on{
      background-color: $smp--color-white;
      span{
        color:$smp--color-blue;
      }
    }
  }
  .nbm-switch{
    position:absolute;
    right:120px;
    top:0;
    width:120px;
    height:80px;
  }
}
/* smp icon 24
------------------------------ */
.smp-ni-nav_sy_n{
  background-image: url('~@/assets/img/nav/nav_sy_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_sy_s.png');
  }
}
.smp-ni-nav_fxyp_n{
  background-image: url('~@/assets/img/nav/nav_fxyp_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_fxyp_s.png');
  }
}
.smp-ni-nav_fzsgzt_n{
  background-image: url('~@/assets/img/nav/nav_fzsgzt_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_fzsgzt_s.png');
  }
}
.smp-ni-nav_jcsj_n{
  background-image: url('~@/assets/img/nav/nav_jcsj_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_jcsj_s.png');
  }
}
.smp-ni-nav_jcyj_n{
  background-image: url('~@/assets/img/nav/nav_jcyj_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_jcyj_s.png');
  }
}
.smp-ni-nav_jczj_n{
  background-image: url('~@/assets/img/nav/nav_jczj_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_jczj_s.png');
  }
}
.smp-ni-nav_xnpg_n{
  background-image: url('~@/assets/img/nav/nav_xnpg_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_xnpg_s.png');
  }
}
.smp-ni-nav_xtgl_n{
  background-image: url('~@/assets/img/nav/nav_xtgl_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_xtgl_s.png');
  }
}
.smp-ni-nav_zhdd_n{
  background-image: url('~@/assets/img/nav/nav_zhdd_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_zhdd_s.png');
  }
}
.smp-ni-nav_znyw_n{
  background-image: url('~@/assets/img/nav/nav_znyw_n.png');
  &.on{
    background-image: url('~@/assets/img/nav/nav_znyw_s.png');
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
