import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
// import VConsole from 'vconsole'
import Plugins from './components'
import './assets/styles/index.scss'

const app = createApp(App)
const pinia = createPinia()

/* if (process.env.NODE_ENV === 'development') {
  new VConsole()
}
 */

// 图片懒加载
lazyPlugin.install(app, {
  loading: require('@/assets/images/loading.gif'),
  error: require('@/assets/images/loading.gif')
})

app.use(Plugins)
app.use(pinia)
app.use(router)
app.mount('#app')
