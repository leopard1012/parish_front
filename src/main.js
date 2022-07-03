import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import BootstrapVue from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(BootstrapVue).use(router).mixin(mixins).mount('#app')
