<template>
    <v-container class="mb-6">
        <v-row>
          <v-col cols="12" sm="5" md="5">
              <v-card class="pa-2" outlined tile>
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

          <v-col cols="12" sm="7" md="7">
              <v-card class="pa-2" outlined tile>
                  <v-data-table
                  dense
                 
                  :headers="inventario"
                  :items="inventarioreal"
                  item-key="name"
                  style="background-color: #f6f9ed"
                  class="elevation-1">
                  

                  <template v-slot:top>
                      <v-toolbar flat style="background-color: #76B82A">
                        <v-toolbar-title class="flex text-center white--text" >Inventario de Planta Disponible</v-toolbar-title>
                      </v-toolbar>
                  </template>
                  </v-data-table> 
              </v-card>
          </v-col>

        </v-row>    
    </v-container>
    
</template>


<script>
export default {
  name: "inventario",

    data: () => ({

    inventario: [
    { text: 'Origen', value: 'abastecimiento',  align:'center' },
    { text: 'Vivero', value: 'vivero', align:'center' },
    { text: 'Categoria', value: 'catPlanta', align:'center' },
    { text: 'Especie', value: 'especie', align:'center' },
    { text: 'Cantidad Recibida', value: 'cantidad_entre', align:'center' },
    { text: 'Cantidad Asignada', value: 'cantidad_asig', align:'center' },
    ],

    inventarioreal: [
        {
            "abastecimiento":"Vivero comercial",
            "vivero":"Acción y desarrollo para la mujer A.C.",
            "catPlanta":"Forestal",
            "especie":"Acacia Farneasiana (HUIZACHE)",
            "cantidad_entre":"2000",
            "cantidad_asig":"1200",
        },

    ],

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
