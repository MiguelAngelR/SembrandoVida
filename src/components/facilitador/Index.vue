<template>
  <v-card>
    <v-card-title>
      <v-spacer />
      CONTROL DE INVENTARIOS DE PLANTA
      <v-spacer />
    </v-card-title>
    <v-data-table
      dense
      :headers="inventario"
      :items="inventarioreal"
      item-key="name"
      style="background-color: #ddd"
      class="elevation-1">
      

      <template v-slot:top>
        <v-toolbar flat style="background-color: #9d8096">
          <v-toolbar-title>Inventario de Planta</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
      <hr color="9d8096" size=12 width="auto">
      <p>
      <hr color="9d8096" size=12 width="auto">
    <v-data-table
      :headers="headers"
      :items="plantasAsignadas"
      sort-by="territorio"
      class="elevation-1"
      :search="busqueda"
      show-group-by
      style="background-color: #ddd"
    >
    <template v-slot:top>
      <v-toolbar flat style="background-color: #9d8096">          
        <v-toolbar-title>Asignar Planta a Técnicos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
            v-model="busqueda"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
        ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Asignar...
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                    
                    <v-col cols="12" sm="4"
                    class="mb-4">
                        <p>Técnico</p>
                        <v-combobox
                        v-model="asignacionEditada.tecnico"
                        :items="menuEdicion.tecnico"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-4">
                        <p>Fuente de abastecimiento</p>
                        <v-combobox 
                        v-model="asignacionEditada.abastecimiento"
                        :items="abastecimientoMenu"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-4">
                        <p>Vivero</p>
                        <v-combobox 
                        v-model="asignacionEditada.vivero"
                        :items="viveroMenu"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-4">
                        <p>Categoría planta</p>
                        <v-combobox 
                        v-model="asignacionEditada.catPlanta"
                        :items="categoriaMenu"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-4">
                        <p>Especie</p>
                        <v-combobox 
                        v-model="asignacionEditada.especie"
                        :items="especieMenu"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-4">
                        <p>Cantidad</p>
                        <v-text-field
                        v-model="asignacionEditada.cantidad"
                        type="number"
                        label="Unidades"
                        ></v-text-field>
                    </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="530px">
          <v-card>
            <v-card-title class="headline">¿Seguro que quieres borrar esta asignación?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si</v-btn>
              <v-btn color="blue darken-1" text @click="closeDelete">No</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon @click="deleteItem(item)">
        mdi-delete-forever
      </v-icon>
    </template>
    
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="pedirInformacion"
      >
        Actualizar
      </v-btn>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
  /*global $*/
  export default {
    name: 'facilitador',
    data: () => ({
      busqueda: "",
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Técnico', value: 'tecnico', sortable: true, align: 'start' }, 
        { text: 'Origen', value: 'abastecimiento' }, 
        { text: 'Vivero', value: 'vivero' }, 
        { text: 'Tipo especie', value: 'catPlanta' }, 
        { text: 'Especie', value: 'especie' }, 
        { text: 'Cantidad', value: 'cantidad', groupable: false },
        { text: 'Creación', value: 'ts'},
        { text: 'Acciones', value: 'actions', groupable: false, sortable: false }
      ],
      inventario: [
        
        { text: 'Origen', value: 'abastecimiento' },
        { text: 'Vivero', value: 'vivero' },
        { text: 'Categoria', value: 'catPlanta' },
        { text: 'Especie', value: 'especie' },
        { text: 'Cantidad Recibida', value: 'cantidad_entre' },
        { text: 'Cantidad Asignada', value: 'cantidad_asig' },
      ],
      plantasAsignadas: [
            {
                "tecnico":"Dennise Rivera Romo",
                "abastecimiento":"Vivero comercial",
                "vivero":"Acción y desarrollo para la mujer A.C.",
                "catPlanta":"Forestal",
                "especie":"Acacia Farneasiana (HUIZACHE)",
                "cantidad":"1200",
                "ts": "03-03-2021"
            },
            {
                "tecnico":"Eduardo Flores Rivera",
                "abastecimiento":"Vivero Forestal Militar",
                "vivero":"VIVERO MILITAR, CARDENAS",
                "catPlanta":"Forestal",
                "especie":"Swietenia Macrophylla (CAOBA)",
                "cantidad":"20",
                "ts": "04-03-2021"
            },
            {
                "tecnico":"Jose Del Carmen Rodriguez",
                "abastecimiento":"Vivero comercial",
                "vivero":"KATSAKAT'N S DE PR DE RL",
                "catPlanta":"Forestal",
                "especie":"Adonidia Merrillii (PALMA)",
                "cantidad":"20",
                "ts": "04-03-2021"
            },
            {   
                "tecnico":"Priciliano Roblero Esqueda",
                "abastecimiento":"Vivero Estatal",
                "vivero":"ESTADO DE TABASCO",
                "catPlanta":"Agroindustrial",
                "especie":"Agave Americana (MAGUEY AMARILLO O PITA)",
                "cantidad":"50",
                "ts": "04-03-2021"
            },
            {
                "tecnico":"Ricardo Roberto Romero",
                "abastecimiento":"Vivero comercial",
                "vivero":"ACCION Y DESARROLLO PARA LA MUJER AC",
                "catPlanta":"Forestal",
                "especie":"Acacia Farneasiana (HUIZACHE)",
                "cantidad":"30",
                "ts": "05-03-2021"
            },
            {
                "tecnico":"Juan Perez Lopez",
                "abastecimiento":"Vivero Forestal Militar",
                "vivero":"VIVERO MILITAR, CARDENAS",
                "catPlanta":"Forestal",
                "especie":"Swietenia Macrophylla (CAOBA)",
                "cantidad":"20",
                "ts": "05-03-2021"
            },
            {
                "tecnico":"Ruben Rodriguez Roble",
                "abastecimiento":"Vivero comercial",
                "vivero":"KATSAKAT'N S DE PR DE RL",
                "catPlanta":"Forestal",
                "especie":"Adonidia Merrillii (PALMA)",
                "cantidad":"20",
                "ts": "05-03-2021"
            },
            {   
                "tecnico":"Luis Rodriguez Perez",
                "abastecimiento":"Vivero Estatal",
                "vivero":"ESTADO DE TABASCO",
                "catPlanta":"Agroindustrial",
                "especie":"Agave Americana (MAGUEY AMARILLO O PITA)",
                "cantidad":"50",
                "ts": "05-03-2021"
            }
      ],
      inventarioreal: [
        {
                "abastecimiento":"Vivero comercial",
                "vivero":"Acción y desarrollo para la mujer A.C.",
                "catPlanta":"Forestal",
                "especie":"Acacia Farneasiana (HUIZACHE)",
                "cantidad_entre":"2000",
                "cantidad_asig":"1200"
            },

      ],

      indiceEditado: -1,
      menuEdicion: {
        tecnico: [""],
        abastecimiento: [
            {
                "abastecimiento": "",
                "vivero": [
                    ""
                ]
            }
        ], 
        categoria: [
            {
                "tipo": "",
                "especies": [
                    ""
                ]
            }
        ],
      },
      asignacionEditada: {
        territorio: '',
        abastecimiento: '',
        vivero: '',
        catPlanta: '',
        especie: '',
        cantidad: ''
      },
      asignacionPredeterminada: {
        territorio: '',
        abastecimiento: '',
        vivero: '',
        catPlanta: '',
        especie: '',
        cantidad: ''
      },
    }),

    computed: {
      formTitle () {
        return this.indiceEditado === -1 ? 'Nueva asignación' : 'Editar asignación'
      },
      abastecimientoMenu() {
        return this.menuEdicion.abastecimiento.map( obj => obj.abastecimiento )
      },
      viveroMenu() {
        const viveros = this.menuEdicion.abastecimiento.filter( obj => obj.abastecimiento === this.asignacionEditada.abastecimiento )
        if(viveros.length === 0) {
          return []
        } else {
          return viveros[0].vivero
        }
      },
      categoriaMenu() {
        return this.menuEdicion.categoria.map( obj => obj.tipo )
      },
      especieMenu() {
          console.log("Categoría: " + this.asignacionEditada.catPlanta)
        const categoria = this.menuEdicion.categoria.filter( obj => obj.tipo === this.asignacionEditada.catPlanta )
        if(categoria.length === 0) {
          return []
        } else {
          return categoria[0].especies.map( especie => this.formatoEspecie(especie) )
        }
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.pedirInformacion()
    },

    methods: {
      formatoEspecie( s ) {
        const s_array = s.split("(")
        s_array[0] = s_array[0].toLocaleLowerCase().split(" ").map( s => (s.length > 0)? s[0].toLocaleUpperCase() + s.substr(1) : s ).join(" ")
        return s_array.join("(")
      },
      formatFecha(ts) {
          const fecha = new Date(ts)
          return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
      },
      pedirInformacion () {
        const that = this
        $.getJSON("./data/tipo_abastecimiento.json", function (data) {
            that.menuEdicion.abastecimiento = data
        })
        $.getJSON("./data/tipo_especie.json", function (data) {
            that.menuEdicion.categoria = data
        })
      },

      editItem (item) {
        this.indiceEditado = this.plantasAsignadas.indexOf(item)
        this.asignacionEditada = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.indiceEditado = this.plantasAsignadas.indexOf(item)
        this.asignacionEditada = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.plantasAsignadas.splice(this.indiceEditado, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.asignacionEditada = Object.assign({}, this.asignacionPredeterminada)
          this.indiceEditado = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.asignacionEditada = Object.assign({}, this.asignacionPredeterminada)
          this.indiceEditado = -1
        })
      },

      save () {
        const nuevoItem = {...this.asignacionEditada, ts: this.formatFecha(Date.now()) }
        if (this.indiceEditado > -1) {
          Object.assign(this.plantasAsignadas[this.indiceEditado], nuevoItem)
        } else {
          this.plantasAsignadas.push(nuevoItem)
        }
        this.close()
      },
    },
  }
</script>