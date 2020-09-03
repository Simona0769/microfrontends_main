import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import sgptRouter from './router'
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun'
import microApps from './dev-micro-app-setting'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
const push = (subapp) => { history.pushState(null, subapp, subapp)}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$qkpush = push

let MainApp = null

function vueRender({ loading }) {
  return new Vue({
    el: '#sgpt-app',
    router: sgptRouter,
    store,
    data() {
      return {
        loading
      }
    },
    render: h => h(App)
  })
}

function qiankunRender({ loading }) {
  if (!MainApp) {
    MainApp = vueRender({ loading })
  } else {
    MainApp.loading = loading
  }
}

qiankunRender({ loading: true })
const loader = loading => qiankunRender({ loading })
/**
 * Step2 注册子应用
 */
const genActiveRule = (routerPrefix) => {
  // return location => location.pathname.startsWith(routerPrefix)
  return location => location.hash.startsWith('#/micro-app' + routerPrefix)
}
// dev 模式下 懒得写mock了
store.dispatch('micro-app/changeApps', microApps)
const _apps = microApps.map(({ name, entry }) => {
  return {
    name,
    entry,
    container: '#subapp-viewport',
    loader,
    activeRule: genActiveRule(`/${name}`),
    props: {
      name,
      entry
    }
  }
})
console.log(_apps)
registerMicroApps(
  _apps,
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
      }
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      }
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      }
    ]
  }
)

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun'
})

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master'
  }
})

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp('/#/micro-app/vue')

/**
 * Step4 启动应用
 */
start()

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})
