import { createApp } from 'vue'
import './styles/min.css'
import App from './App.vue'

const app = createApp(App)

const uiComponents = import.meta.glob('./components/UI/*.vue', { eager: true })
const formSections = import.meta.glob('./components/Form/*.vue', { eager: true })

const allComponents = { ...uiComponents, ...formSections }

Object.values(allComponents).forEach((component: any) => {
  const definition = component.default
  if (definition?.name) {
    app.component(definition.name, definition)
  }
})

app.mount('#app')
