/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import pinia from './store'
import { createPinia } from 'pinia';
const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// createApp(App).use(createPinia()).mount('#app');
