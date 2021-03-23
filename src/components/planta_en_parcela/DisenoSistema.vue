<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="plantasAsignadas"
      sort-by="territorio"
      class="elevation-1"
      style="background-color: #f6f9ed"
      show-group-by
    >
      <template v-slot:top>
        <v-toolbar flat style="background-color: #9d8096">
          <v-toolbar-title  class="flex text-center white--text" >Diseño de Sistema Agroforestal</v-toolbar-title>
          <v-spacer>
          </v-spacer>
          <v-dialog v-model="dialog" max-width="600px" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Especie
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline"  >{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="4" class="mb-6">
                      <p>Categoría planta</p>
                      <v-combobox
                        v-model="asignacionEditada.catPlanta"
                        :items="categoriaMenu"
                        clearable
                      ></v-combobox>
                    </v-col>

                    <v-col cols="8" class="mb-6">
                      <p>Especie</p>
                      <v-combobox
                        v-model="asignacionEditada.especie"
                        :items="especieMenu"
                        clearable
                      ></v-combobox>
                    </v-col>
                    <v-col cols="6" sm="6" class="mb-6">
                      <p>Cantidad Meta</p>
                      <v-text-field
                        v-model="asignacionEditada.cantidadmeta"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" class="mb-6">
                      <p>Cantidad Avance</p>
                      <v-text-field
                        v-model="asignacionEditada.cantidadavance"
                        type="number"
                      ></v-text-field>
                    </v-col>
                      <v-col class="text-center">
                        <p>% Avance</p>
                        <v-progress-circular
                          :rotate="360"
                          :size="120"
                          :width="25"
                          :value="value"
                          color="teal"
                        >
                          {{ value }}
                        </v-progress-circular>
                      </v-col>    
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="530px">
            <v-card>
              <v-card-title class="headline"
                >¿Seguro que quieres borrar esta asignación?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Si</v-btn
                >
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >No</v-btn
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

      <template v-slot:no-data>
        <v-btn color="primary" @click="pedirInformacion"> Actualizar </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
/*global $*/
export default {
  name: "DisenoSistema",
  data: () => ({
    busqueda: "",
    interval: {},
    value: 60,
    date: null,
    menu: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      // { text: 'Sistema Agroforestal', value: 'sistemaagro' },
      { text: "Categoria Planta", value: "catPlanta",  align:'center' },
      { text: "Especie", value: "especie",  align:'center' },
      { text: "Cantidad Meta", value: "cantidadmeta", groupable: false,  align:'center' },
      { text: "Cantidad Avance", value: "cantidadavance", groupable: false,  align:'center' },
      { text: "Acciones", value: "actions", groupable: false, sortable: false,  align:'center' },
      { text: "Avance", value: "avance_grafico", groupable: false, sortable: false,  align:'center' },
    ],
    plantasAsignadas: [
      {
        catPlanta: "Agroindustrial",
        especie: "Theobroma Cacao - Cacao Guayaquil",
        cantidadmeta: "2000",
        cantidadavance: "1200",
        avance_grafico: "",
      },
      {
        catPlanta: "Frutal",
        especie: "Malus Domestica - Manzana var. Royal Gala",
        cantidadmeta: "500",
        cantidadavance: "200",
        avance_grafico: "",
      },
      {
        catPlanta: "Forestal",
        especie: "Theobroma Cacao - Cacao Guayaquil",
        cantidadmeta: "200",
        cantidadavance: "50",
        avance_grafico: "",
      },
    ],
    indiceEditado: -1,
    menuEdicion: {
      categoria: [
        {
          tipo: "",
          especies: [""],
        },
      ],
    },
    asignacionEditada: {
      catPlanta: "",
      especie: "",
      cantidadmeta: "",
      cantidadavance: "",
    },
    asignacionPredeterminada: {
      catPlanta: "",
      especie: "",
      cantidadmeta: "",
      cantidadavance: "",
    },
  beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },  
  }),

  computed: {
    formTitle() {
      return this.indiceEditado === -1 ? "" : "";
      
    },
    categoriaMenu() {
      return this.menuEdicion.categoria.map((obj) => obj.tipo);
    },
    especieMenu() {
      console.log("Categoría: " + this.asignacionEditada.catPlanta);
      const categoria = this.menuEdicion.categoria.filter(
        (obj) => obj.tipo === this.asignacionEditada.catPlanta
      );
      if (categoria.length === 0) {
        return [];
      } else {
        return categoria[0].especies.map((especie) =>
          this.formatoEspecie(especie)
        );
      }
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  created() {
    this.pedirInformacion();
  },

  methods: {
    formatoEspecie(s) {
      const s_array = s.split("(");
      s_array[0] = s_array[0]
        .toLocaleLowerCase()
        .split(" ")
        .map((s) => (s.length > 0 ? s[0].toLocaleUpperCase() + s.substr(1) : s))
        .join(" ");
      return s_array.join("(");
    },
    formatFecha(ts) {
      const fecha = new Date(ts);
      return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
    },
    pedirInformacion() {
      const that = this;
      $.getJSON("./data/tipo_especie.json", function (data) {
        that.menuEdicion.categoria = data;
      });
    },

    editItem(item) {
      this.indiceEditado = this.plantasAsignadas.indexOf(item);
      this.asignacionEditada = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.indiceEditado = this.plantasAsignadas.indexOf(item);
      this.asignacionEditada = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.plantasAsignadas.splice(this.indiceEditado, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.asignacionEditada = Object.assign(
          {},
          this.asignacionPredeterminada
        );
        this.indiceEditado = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.asignacionEditada = Object.assign(
          {},
          this.asignacionPredeterminada
        );
        this.indiceEditado = -1;
      });
    },
    save() {
      const nuevoItem = {
        ...this.asignacionEditada,
        ts: this.formatFecha(Date.now()),
      };
      if (this.indiceEditado > -1) {
        Object.assign(this.plantasAsignadas[this.indiceEditado], nuevoItem);
      } else {
        this.plantasAsignadas.push(nuevoItem);
      }
      this.close();
    },
  },
};
</script>