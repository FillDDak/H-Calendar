// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// v-calendar
import VCalendar from 'v-calendar'

// Create Vuetify instance and include VCalendar as a plugin
export default createVuetify({
  components: {
    // Register v-calendar components with a prefix 'vc'
    ...VCalendar,
  },
  directives: {
    // Add VCalendar directives if any (optional)
  },
})
