<template>
  <div>
    <v-data-table
      :headers="cabecera"
      :items="vivero"
      item-key="idvivero"
      class="elevation-1"
      :search="busqueda"
      show-group-by
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Viveros Comunitarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="busqueda"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="900px">
            <template
              v-slot:activator="{
                /*on, attrs*/
              }"
            >
              <v-btn class="mx-2" fab dark small color="primary">
                <v-icon dark @click="ayuda"> mdi-help </v-icon>
              </v-btn>
            </template>
          </v-dialog>
        </v-toolbar>
      </template>
      <!--template v-slot:item.nombre="{ item }">
                {{item.nombre}} <br> <span style="color: blue; font-size: 0.8em;"> {{item.id}}</span>
            </template-->
      <template v-slot:[`item.actions1`]>
        <router-link to="/InformacionVivero">
            <v-list-item-icon>
              <v-icon>mdi-sprout</v-icon>
            </v-list-item-icon>
        </router-link> 
      </template>
            <template v-slot:[`item.actions2`]>
        <router-link to="/InformacionBiofabrica">
            <v-list-item-icon>
              <v-icon>mdi-beaker-outline</v-icon>
            </v-list-item-icon>
        </router-link> 
      </template>
    </v-data-table>
    <table>
      <tr v-for="vivero of selected" v-bind:key="vivero.idvivero">
        <td>{{ vivero.tecnicoprodu }}</td>
        <td>{{ vivero.id }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: "",
      busqueda: "",
      singleSelect: false,
      selected: [],
      cabecera: [
        { text: "ID Binomio", value: "id", groupable: false },
        { text: "Técnico Productivo", value: "tecnicoprodu", groupable: false },
        { text: "Técnico Social", value: "tecnicosocial", groupable: false },
        { text: "ID Vivero", value: "idvivero", groupable: false },
        { text: "Vivero Comunitario", value: "nomvivero", groupable: false },
        { text: "Ir a Vivero", value: "actions1", sortable: false, groupable: false },
        { text: "Ir a Biofabrica", value: "actions2", sortable: false, groupable: false },
      ],
      vivero: [
        {
          id: 1232,
          tecnicoprodu: "Claudio Francisco Nebbia Rubio",
          tecnicosocial: "Raul Rodriguez Romero",
          idvivero: "123",
          nomvivero: "El resplandor",
        },
        {
          id: 1232,
          tecnicoprodu: "Claudio Francisco Nebbia Rubio",
          tecnicosocial: "Raul Rodriguez Romero",
          idvivero: "124",
          nomvivero: "El Sol de México",
        },
        {
          id: 1232,
          tecnicoprodu: "Claudio Francisco Nebbia Rubio",
          tecnicosocial: "Raul Rodriguez Romero",
          idvivero: "125",
          nomvivero: "Cosecha Unida",
        },
        {
          id: 1232,
          tecnicoprodu: "Claudio Francisco Nebbia Rubio",
          tecnicosocial: "Raul Rodriguez Romero",
          idvivero: "126",
          nomvivero: "El resplandor 2",
        },
        {
          id: 1232,
          tecnicoprodu: "Claudio Francisco Nebbia Rubio",
          tecnicosocial: "Raul Rodriguez Romero",
          idvivero: "127",
          nomvivero: "Los Arboles Felices",
        },
        {
          id: 1232,
          tecnicoprodu: "Claudio Francisco Nebbia Rubio",
          tecnicosocial: "Raul Rodriguez Romero",
          idvivero: "128",
          nomvivero: "El quinto Elemento",
        },
      ],
    };
  },
  computed: {
    ids() {
      return [...new Set(this.vivero.map((vivero) => vivero.id))];
    },
  },
  methods: {
    ayuda(/* element */) {
      alert("Ayuda"); // TODO :  Agregar ayuda para este componente
    },

  },
};
</script>
<style scoped>

</style>