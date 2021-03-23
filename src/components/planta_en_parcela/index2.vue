<template>
  <div>
    <v-container>
          <h2 class="green--text pa-2">ESTABLECIMIENTO AGROFORESTAL - ASIGNACIÓN DE PLANTA</h2> 
    </v-container>    
    <Inventario />
    <AsignacionDePlanta />
    <Merma />
    <v-card-actions>
      <v-flex class="xs12 offset-xs8">
        <template >
          <router-link 
          to="/PlantaEnParcela"
          >
            <v-btn 
            color="#1B5A7D"
            class="white--text"
            @click="PlantaEnParcela"
            >Regresar
            </v-btn>
          </router-link>        
        </template>
        
        <v-btn 
          class="ma-2"
          :loading="loading1"
          :disabled="loading1"
          color="success"
          @click="loader = 'loading1'"
          > Validar y Guardar 
        </v-btn>
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-flex>  
    </v-card-actions>  
  </div>  
</template>

<script>
import Inventario from "./inventario";
import AsignacionDePlanta from "./AsignacionDePlanta";
import Merma from './Merma';
import PlantaEnParcela from './Index'


export default {
  name: "index2",
  components: {
    Inventario,
    AsignacionDePlanta,
    Merma,

  },
  
  data () {
      return {
        loader: null,
        loading1: false,
        items: [PlantaEnParcela],

      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
  }  
</script>

<style scoped>
 
</style>