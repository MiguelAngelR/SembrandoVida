<template>
  <div>
    <v-data-table
      :headers="cabecera"
      :items="sembrador"
      item-key="curp"
      class="elevation-1"
      :search="busqueda"
      show-group-by
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista de Beneficiarios</v-toolbar-title>
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col>
              <br />
              <Predios :predios="item.parcelas" color="#7aa0c7" />
              <br />
            </v-col>
            <v-col>
              <br />
              <DisenoSistema />
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
    <table>
      <tr v-for="sembrador of selected" v-bind:key="sembrador.curp">
        <td>{{ sembrador.nombre }}</td>
        <td>{{ sembrador.curp }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import Predios from "./Predios";
import DisenoSistema from "./DisenoSistema";

export default {
  name: "ListaSembradores",
  components: {
    Predios,
    DisenoSistema,

  },
  data() {
    return {
      tab: null,
      dialog: "",
      busqueda: "",
      singleSelect: false,
      selected: [],
      cabecera: [
        { text: "ID", value: "id", groupable: false },
        { text: "Nombre", value: "nombre", groupable: false },
        { text: "CURP", value: "curp", groupable: false },
        { text: "CAC", value: "cac", groupable: false },
      ],
      sembrador: [
        {
          id: 345434,
          nombre: "Claudio Francisco Nebbia Rubio",
          curp: "NERC800821HDFBBL02",
          territorio: "Comalcalco",
          cac: "El vergel",
          parcelas: [
            {
              id: 23432,
              nombre: "El arenal",
              superficie: 1.1,
              sistemaAgroforestal: "SAF",
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 19.431698731450414, long: -99.1557637748858 },
              poligono: "",
            },
            {
              id: 23433,
              nombre: "El naranjito",
              superficie: 1,
              sistemaAgroforestal: "SAF",
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 19.432314655258985, long: -99.15750877017531 },
              poligono: "",
            },
            {
              id: 23433,
              nombre: "El naranjito",
              superficie: 0.3,
              sistemaAgroforestal: "MIAF",
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 19.432497924465444, long: -99.1607966704166 },
              poligono: "",
            },
          ],
        },
        {
          id: 543455,
          nombre: "José Luis Romero García",
          curp: "ROGL951016HMCMRS02",
          territorio: "Comalcalco",
          cac: "El vergel",
          parcelas: [
            {
              id: 23437,
              nombre: "El arenal",
              superficie: 1,
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 0, long: 0 },
              poligono: "",
            },
            {
              id: 23438,
              nombre: "El naranjito",
              superficie: 1.5,
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 0, long: 0 },
              poligono: "",
            },
          ],
        },
        {
          id: 345434,
          nombre: "Marta Nebbia Rubio",
          curp: "NERM860729MDFBBL02",
          territorio: "Papantla",
          cac: "Los de arriba",
          parcelas: [
            {
              id: 24432,
              nombre: "El arenal",
              superficie: 1,
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 0, long: 0 },
              poligono: "",
            },
            {
              id: 24433,
              nombre: "El naranjito",
              superficie: 0.5,
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 0, long: 0 },
              poligono: "",
            },
            {
              id: 24434,
              nombre: "El tomatero",
              superficie: 1,
              altura_nivel_mar: 2000,
              precipitacion_anual: 1100,
              pendiente_parcela: 20,
              curvas_de_nivel: true, // TODO: Recuerda que este campo se calcula
              coords: { lat: 0, long: 0 },
              poligono: "",
            },
          ],
        },
        {
          id: 543455,
          nombre: "Leticia Romero García",
          curp: "ROGL861016HMCMRS02",
          territorio: "Tapachula",
          cac: "Los de enmedio",
          parcelas: [],
        },
        {
          id: 345434,
          nombre: "Raúl Carlos Nebbia Galvez",
          curp: "NEGR840821HDFBBL02",
          territorio: "Comalcalco",
          cac: "El vergel",
          parcelas: [],
        },
        {
          id: 543455,
          nombre: "José Javier Ramírez García",
          curp: "RAGL951016HMCMRS02",
          territorio: "Comalcalco",
          cac: "El vergel",
          parcelas: [],
        },
        {
          id: 345434,
          nombre: "Marta Callen Hernandez",
          curp: "CAHM860729MDFBBL02",
          territorio: "Papantla",
          cac: "Los de arriba",
          parcelas: 6,
        },
        {
          id: 543455,
          nombre: "Leticia Teeran Guerrero",
          curp: "TEGL861016HMCMRS02",
          territorio: "Tapachula",
          cac: "Los de enmedio",
          parcelas: 3,
        },
      ],
    };
  },
  computed: {
    cacs() {
      return [...new Set(this.sembrador.map((sembrador) => sembrador.cac))];
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