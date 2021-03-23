import Vue from 'vue'
import Vuetify from 'vuetify'
// import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

// import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const opciones = {
    
    theme: { 
        themes: {
            light: {
                primary: '#1B5A7D',         //colors.purple,
                secondary: '#76B82A',       //colors.grey.darken1,
                accent: '#815374',          //colors.shades.black,
                error: '#F39200'            //colors.red.accent3,
            },
            dark: {
                primary: '#1B5A7D',
            },
        },
    },
}

export default new Vuetify(opciones)