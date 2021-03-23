<template>
  <v-card class="pa-2 d-flex mb-6" outlined tile >
    <v-data-table
      :headers="headers"
      :items="Mermas"
      sort-by="territorio"
      class="elevation-1"
      style="background-color: #f6f9ed"
      show-group-by
    >
      <template v-slot:top>
        <v-toolbar flat style="background-color: #f39200">
          <v-toolbar-title class="flex text-center white--text">Registro de mermas y siniestros</v-toolbar-title>
          <v-spacer>
          </v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="secondary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar Merma
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="3" class="mb-3">
                      <p>Cantidad</p>
                      <v-text-field
                        v-model="asignacionEditada.cantidad"
                        type="number"
                        min="1" 
                        pattern="^[0-9]+"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="9" class="mb-9">
                      <p>Razon de merma</p>
                      <v-combobox
                      v-model="asignacionEditada.merma"
                      :items="menuEdicion.merma"
                      clearable
                      ></v-combobox>
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
  name: "merma",
  data: () => ({
    menu: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Cantidad", value: "cantidad", groupable: false,  align:'center'  },
      { text: "Razón de Merma", value: "merma",  align:'center' },
      { text: "Acciones", value: "actions", groupable: false,  align:'center' }
    ],
    Mermas: [
      {
        cantidad: "120",
        merma: "Inundación"
      },
      {
        cantidad: "2500",
        merma: "Incendio"
      }
    ],
    indiceEditado: -1,
    menuEdicion: {
      merma:['Deslaves','Enfermedad','Falta de mantenimiento','Fauna Silvestre','Granizo','Helada','Incendio','Inundación','Plagas','Planta recibida en mal estado','Robo','Sequía','Traslado','Viento'],
    },
    asignacionEditada: {
      cantidad: "",
      merma: ""
    },
    asignacionPredeterminada: {
      cantidad: "",
      merma: ""
    },
  }),
  computed: {
    formTitle() {
      return this.indiceEditado === -1 ? "" : ""; 
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
      this.indiceEditado = this.Mermas.indexOf(item);
      this.asignacionEditada = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.indiceEditado = this.Mermas.indexOf(item);
      this.asignacionEditada = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.Mermas.splice(this.indiceEditado, 1);
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
        Object.assign(this.Mermas[this.indiceEditado], nuevoItem);
      } else {
        this.Mermas.push(nuevoItem);
      }
      this.close();
    },
  },
};
</script>