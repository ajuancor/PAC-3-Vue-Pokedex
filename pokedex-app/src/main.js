import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/styles.css'

let app = createApp(App)

// Variable global
//app.config.globalProperties.$error_app = false

app.use(router)

app.mount('#app')