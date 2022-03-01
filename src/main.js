import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import VConsole from 'vconsole'
import Icon from './plugins/icon'
import './styles/index.scss'

const app = createApp(App)
const pinia = createPinia()

/* if (process.env.NODE_ENV === 'development') {
  new VConsole()
}
 */
app.use(Icon)
app.use(pinia)
app.use(router)
app.mount('#app')
