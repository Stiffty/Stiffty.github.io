import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import "quasar/dist/quasar.sass"

createApp(App).use(Quasar, quasarUserOptions).mount('#app')
