<template> 
  <v-card class="pa-2" outlined tile>
    <v-card-title>
    </v-card-title>
      <v-data-table
        :headers="headers"
        :items="plantasAsignadas"
        sort-by="territorio"
        class="elevation-1"
        :search="busqueda"
        style="background-color: #f6f9ed"
        show-group-by
      >
    <template v-slot:top>
      <v-toolbar flat style="background-color: #1B5A7D" >
        <v-toolbar-title class="flex text-center white--text" >Planta en Parcela</v-toolbar-title>
        <v-divider
          class="mx-3"
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
          class="mx-3"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="1200px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="secondary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar Especie
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>

                    <v-col cols="12" sm="2"
                    class="mb-4">
                        <p>Objetivo</p>
                        <v-combobox
                        v-model="asignacionEditada.objetivo"
                        :items="menuEdicion.objetivo"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-2">
                        <p>Fuente de abastecimiento</p>
                        <v-combobox 
                        v-model="asignacionEditada.abastecimiento"
                        :items="abastecimientoMenu"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" class="mb-6">
                        <p>Vivero</p>
                        <v-combobox 
                        v-model="asignacionEditada.vivero"
                        :items="viveroMenu"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="4" sm="2" class="mb-4">
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


                    <v-col cols="12" sm="2"
                    class="mb-4">
                        <p>Arreglo Topológico</p>
                        <v-combobox
                        v-model="asignacionEditada.arregloTopologico"
                        :items="menuEdicion.arregloTopologico"
                        clearable
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="2"
                    class="mb-4">
                        <p>Distancia entre Plantas</p>
                        <v-combobox
                        v-model="asignacionEditada.distanciaEntrePlantas"
                        :items="menuEdicion.distanciaEntrePlantas"
                        clearable
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="2"
                    class="mb-4">
                        <p>Curvas de Nivel</p>
                        <v-combobox
                        v-model="asignacionEditada.curvasDeNivel"
                        :items="menuEdicion.curvasDeNivel"
                        clearable
                        ></v-combobox>
                    </v-col>


                    <v-col cols="12" sm="12"
                    class="mb-4">
                        <p>Estatus de la Planta</p>
                        <v-combobox
                        v-model="asignacionEditada.Estatuspla"
                        :items="menuEdicion.Estatuspla"
                        clearable
                        ></v-combobox>
                    </v-col>

                    <v-col cols="12" sm="6"
                    class="mb-4">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Fecha de Entrega"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="date"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6"
                    class="mb-4">
                        <v-text-field
                        v-model="asignacionEditada.cantidadentre"
                        type="number"
                        min="1" 
                        pattern="^[0-9]+"
                        label="Cantidad Entregada"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6"
                    class="mb-4">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Fecha de Siembra"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              ref="picker"
                              v-model="date"
                              :max="new Date().toISOString().substr(0, 10)"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                    </v-col>
                    
                    <v-col cols="12" sm="6"
                    class="mb-4">
                        <v-text-field
                        v-model="asignacionEditada.cantidadsobrev"
                        type="number"
                        label="Cantidad que Sobrevive"
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
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
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
    name: 'AsignacionDePlanta',
    data: () => ({
      busqueda: "",
      date: null,
      menu: false,
      dialog: false,
      dialogDelete: false,
      headers: [ 
        { text: 'Fuente de Abastecimiento', value: 'abastecimiento',  align:'center' }, 
        { text: 'Nombre del Vivero', value: 'vivero',  align:'center' },         
        { text: 'Categoria Planta', value: 'catPlanta',  align:'center' }, 
        { text: 'Especie', value: 'especie',  align:'center' }, 
        { text: 'Arreglo Topológico', value: 'arregloTopologico', groupable: false,  align:'center' }, 
        { text: 'Distancia entre plantas (mts)', value: 'distanciaEntrePlantas', groupable: false,  align:'center' }, 
        { text: 'Curvas de Nivel', value: 'curvasDeNivel', groupable: false,  align:'center' }, 
        { text: 'Estatus de la Planta', value: 'Estatuspla', groupable: false,  align:'center' }, 
        { text: 'Fecha de Entrega', value: 'fechaentre', groupable: false,  align:'center' },         
        { text: 'Cantidad Entregada', value: 'cantidadentre', groupable: false,  align:'center' }, 
        { text: 'Fecha de Siembra', value: 'fechasiem', groupable: false,  align:'center' }, 
        { text: 'Cantidad que Sobrevive', value: 'cantidadsobrev', groupable: false,  align:'center' }, 
        { text: 'Acciones', value: 'actions', groupable: false, sortable: false,  align:'center' }
      ],
      plantasAsignadas: [
            {   
                "abastecimiento":"Vivero Comercial",
                "vivero":"Accion y desarrollo para la mujer a.c.",
                "catPlanta":"Agroindustrial",
                "especie":"Theobroma Cacao - Cacao Guayaquil",
                "arregloTopologico":"Tres Bolillos",
                "distanciaEntrePlantas":"2x3",
                "curvasDeNivel":"Si",
                "Estatuspla":"Establecida en Parcela",
                "fechaentre":"20-12-2020",
                "cantidadentre":"2000",
                "fechasiem":"25-12-2020",
                "cantidadsobrev":"1950"
            },
                        {   
               "objetivo":"Productivo",
                "abastecimiento":"Vivero Comercial",
                "vivero":"Agrotropico SPR de RL",
                "catPlanta":"Frutal",
                "especie":"Malus Domestica - Manzana var. Royal Gala",
                "arregloTopologico":"rectangular",
                "distanciaEntrePlantas":"6x6",
                "curvasDeNivel":"Si",
                "Estatuspla":"Establecida en Parcela",
                "fechaentre":"20-12-2020",
                "cantidadentre":"500",
                "fechasiem":"25-12-2020",
                "cantidadsobrev":"500"
            },
                        {   
               "objetivo":"Productivo",
                "abastecimiento":"Vivero Forestal Militar",
                "vivero":"Vivero Forestal Militar Cardenas",
                "catPlanta":"Forestal",
                "especie":"Theobroma Cacao - Cacao Guayaquil",
                "arregloTopologico":"Marco Real",
                "distanciaEntrePlantas":"4x4",
                "curvasDeNivel":"Si",
                "Estatuspla":"Entregada al Sembrador",
                "fechaentre":"20-12-2020",
                "cantidadentre":"200",
                "fechasiem":"",
                "cantidadsobrev":""
            }
      ],
      indiceEditado: -1,
      menuEdicion: {
        
        arregloTopologico: ['Marco Real','Tres Bolillos','Rectangular','En hilera','Disperso'],
        curvasDeNivel: ['Si','No'],
        objetivo: ["Productivo", "Reforestación"],
        Estatuspla:["Entregada al Sembrador", "Establecida en Parcela"],
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
        objetivo:'',
        abastecimiento:'',
        vivero:'',
        catPlanta:'',
        especie:'',
        arregloTopologico:'',
        distancia_entre_plantas:'',
        curvasDeNivel:'', 
        Estatuspla:'',
        fechaentre:'',
        cantidadentre:'',
        fechasiem:'',
        cantidadsobrev:''

      },
      asignacionPredeterminada: {
        objetivo:'',
        abastecimiento:'',
        vivero:'',
        catPlanta:'',
        especie:'',
        arregloTopologico:'',
        distancia_entre_plantas:'',
        curvasDeNivel:'', 
        Estatuspla:'',
        fechaentre:'',
        cantidadentre:'',
        fechasiem:'',
        cantidadsobrev:''
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
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
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