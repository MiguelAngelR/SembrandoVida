<template>
  <v-data-table
    :headers="headers"
    :items="predios"
    sort-by="calories"
    class="elevation-1"
    style="background-color: #f6f9ed"
  >
    <template v-slot:top>
      <v-toolbar flat style="background-color: #815374">
        <v-toolbar-title  class="flex text-center white--text" >Predios</v-toolbar-title>
        <v-divider class="mx-9" inset vertical></v-divider>
        <v-spacer />
        <strong >Total</strong>: {{ suma }} hectareas
        <v-spacer />
        <v-divider class="mx-9" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on, attrs }" v-if="suma < 2.5">
            <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">
              Agregar predio
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="editedItem.predios"
                      type="number"
                      label="Predio #"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre del Predio"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.superficie"
                      type="number"
                      label="Superficie del Predio (ha)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.sistemaAgroforestal"
                      label="Sistema Agroforestal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.altura_nivel_mar"
                      type="number"
                      label="Altura sobre el nivel del mar (mts)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.precipitacion_anual"
                      type="number"
                      label="Precipitación Anual (mm)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.pendiente_parcela"
                      type="number"
                      label="Pendiente de la parcela %"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="ma-0 pa-0">
                    <v-subheader>Coordenadas</v-subheader>
                  </v-col>
                  <v-col cols="12" md="4" class="ma-0 pa-0">
                    <v-text-field 
                    v-model="editedItem.coords.lat"
                    label="Latitud"
                    outlined dense>
                  </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="ma-0 pa-0">
                    <v-text-field 
                    v-model="editedItem.coords.long"
                    label="Longitud" 
                    outlined dense>
                    </v-text-field>
                  </v-col>  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >¿Estas Seguro de eliminar el registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`item.asignarPlanta`]>
      <router-link to="/index2">
        <v-list-item-icon>
          <v-icon>mdi-nature-people</v-icon>
        </v-list-item-icon>
      </router-link>
    </template>
        <template v-slot:[`item.asignarCultivo`]>
      <router-link to="/Cultivos">
        <v-list-item-icon>
          <v-icon>mdi-grass</v-icon>
        </v-list-item-icon>
      </router-link>
    </template>


    <template v-slot:no-data>
      Este usuario no tiene predios cargados...
    </template>
  </v-data-table>
</template>

<script>

export default {
  name: "Predios",
  props: {
    predios: Array,
    color: String,
  },

  data: () => ({
    items: ["Si", "No"],
    sistemaAgroforestal: ['SAF', 'MIAF'],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Predio", value: "nombre",  align:'center' },
      { text: "Superficie (ha)", value: "superficie",  align:'center' },
      { text: "Sistema Agroforestal", value: "sistemaAgroforestal",  align:'center' },      
      { text: "Nivel del_mar (mts)",value: "altura_nivel_mar",  align:'center'},
      { text: "Precipitación anual (mm)", value: "precipitacion_anual",  align:'center' },
      { text: "Pendiente (%)", value: "pendiente_parcela",  align:'center' },
      { text: "Coordenadas Latitud", value: 'coords.lat',  align:'center' },
      { text: "Coordenadas Longitud", value: 'coords.long',  align:'center' },
      { text: "Acciones", value: "actions", sortable: false,  align:'center' },
      { text: "Asignar planta", value: "asignarPlanta", sortable: false,  align:'center' },
      { text: "Asignar Cultivo", value: "asignarCultivo", sortable: false,  align:'center' },
    ],
    editedIndex: -1,
    editedItem: {
      superficie: "",
      sistemaAgroforestal: "",
      altura_nivel_mar: "",
      precipitacion_anual: "",
      nombre: "",
      pendiente_parcela: "",
      coords: { lat: "", long: "" },
    },
    defaultItem: {
      superficie: "",
      sistemaAgroforestal: "",
      altura_nivel_mar: "",
      precipitacion_anual: "",
      nombre: "",
      pendiente_parcela: "",
      coords: { lat: "", long: "" },
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    suma() {
      return this.predios.map((p) => p.superficie).reduce((a, b) => a + b, 0);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.predios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.predios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.predios.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.predios[this.editedIndex], this.editedItem);
      } else {
        this.predios.push(this.editedItem);
      }
      this.close();
      },
    },
  }  
</script>
