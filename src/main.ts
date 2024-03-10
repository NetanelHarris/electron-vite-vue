import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import '@mdi/font/css/materialdesignicons.css'
import { registerPlugins } from './plugins'

// const vuetify = createVuetify({
//     components,
//     directives,
// })

import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)

registerPlugins(app)
app.mount('#app')
    // .$nextTick(() => {
    //     postMessage({ payload: 'removeLoading' }, '*')
    // })
// createApp(App)
//     // .use(vuetify)
//     .mount('#app')
//     .$nextTick(() => {
//         postMessage({ payload: 'removeLoading' }, '*')
//     })
