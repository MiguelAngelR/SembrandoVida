<template>
<div>
  <v-container>
    <h2 class="green--text pa-2">ESTABLECIMIENTO AGROFORESTAL - ASIGNACIÓN DE CULTIVOS</h2> 
  </v-container>  
  <v-container class="mb-6">
    <v-col cols="12" sm="12" md="12">
        <v-card class="pa-6" outlined tile>
            <v-data-table
            dense
            :headers="datosBeneficiario"
            :items="datosejemplo"
            item-key="name"
            style="background-color: #f6f9ed"
            class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat style="background-color: #76B82A">
                <v-toolbar-title  class="flex text-center white--text">Datos del Beneficiario</v-toolbar-title>
                </v-toolbar>
            </template>
            </v-data-table> 
        </v-card>
    </v-col>
  </v-container>
  <Cultivos />
  <v-card-actions>
      <v-flex class="xs12 offset-xs8 pa-6">
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
import Cultivos from "./Cultivos";
import PlantaEnParcela from './Index'


export default {
  name: "indexcultivo",
  components: {
    Cultivos,
  },    




    data: () => ({


    items: [PlantaEnParcela],
    datosBeneficiario: [
    { text: 'Id', value: 'idnucleo', align:'center', },
    { text: 'Beneficiario', value: 'nombreBeneficiario', align:'center' },
    { text: '# Predio', value: 'numeroPredio', align:'center' },
    { text: 'Predio', value: 'nombrePredio', align:'center' },
    { text: 'Superficie (ha)', value: 'superficie', align:'center' },
    { text: 'Sistema Agroforestal', value: 'sistemaAgroforestal', align:'center' },
    ],

    datosejemplo: [
        {
            "idnucleo":"1241",
            "nombreBeneficiario":"Raul Morales Flores",
            "numeroPredio":"2",
            "nombrePredio":"El Ranchito",
            "superficie":"1.1",
            "sistemaAgroforestal":"SAF",
        },

    ],
})
}

</script>
