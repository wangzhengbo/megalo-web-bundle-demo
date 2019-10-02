import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import 'mpvue-weui/src/style/weui.css'

Vue.use(VHtmlPlugin)
const app = new Vue(App)

if (typeof window !== 'undefined') {
  window.getApp = () => {
    if (typeof app.globalData === 'undefined') {
      app.globalData = typeof App.globalData === 'function' ? App.globalData() : App.globalData
    }
    return app
  }
}

app.$mount()

console.log('Megalo.ENV_TYPE', Megalo.ENV_TYPE)
console.log('Megalo.getEnv()', Megalo.getEnv())
Megalo.getSystemInfo().then(res => {
  console.log('res', res)
})

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/hello',
      'pages/my/my'
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          pagePath: 'pages/hello',
          text: 'home',
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home_on.png'
        },
        {
          pagePath: 'pages/my/my',
          text: 'my',
          iconPath: 'native/tabbar/mine.png',
          selectedIconPath: 'native/tabbar/mine_on.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'megalo project',
      navigationBarTextStyle: 'black'
    }
  }
}
