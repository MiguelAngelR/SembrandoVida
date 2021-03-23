<template> 
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="#76B82A"
      dark
    >
      <v-tab>5. Datos Generales de la Biofabrica</v-tab>
      <v-tab>6. Objeto de la Biofabrica</v-tab>
    </v-tabs>  
    <v-tabs-items v-model="tab">
      <v-tab-item>  
      <template>
        <v-form>
          <v-container grid-list-md>
            <v-row>
              <v-col cols="12" md="2" >
                <v-subheader>5.1 Estatus de la Biofábrica</v-subheader>
              </v-col>
              <v-col cols="12" md="4" >
                <v-select :items="estatusBiofabrica" outlined dense></v-select>
              </v-col>
              <v-col cols="12" md="3" >
                <v-subheader>5.2 Biofábrica contruida con materiales </v-subheader>
              </v-col>
              <v-col cols="12" md="3" > 
                <v-select :items="materialesconstru" outlined  dense></v-select>  
              </v-col>
              <v-col cols="12" md="6" class="ma-0 pa-0">
              </v-col>
            </v-row>
          </v-container>
          <hr color="76B82A" size=12 width="auto">
          <p>
          <hr color="76B82A" size=12 width="auto">
          <v-container grid-list-md>
            <v-row>
              <v-col cols="12" md="12" class="ma-0 pa-0">
                <v-subheader>5.3 Insumos y materiales que se cuentan para la operación en la biofabrica</v-subheader>
              </v-col>
              <v-col cols="12" md="3" class="ma-0 pa-0">
                <v-subheader>5.3.1 Tambo de plástico de 1,000 lts.</v-subheader>
              </v-col>
              <v-col cols="12" md="1" class="ma-0 pa-0">
                <v-text-field type="number" placeholder="piezas" outlined  dense></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="ma-0 pa-0">
                <v-subheader>5.3.2 Tambo de plástico de 200 lts.</v-subheader>
              </v-col>
              <v-col cols="12" md="1" class="ma-0 pa-0">
                <v-text-field type="number" placeholder="piezas" outlined  dense></v-text-field>
              </v-col>
              <v-col cols="12" md="3" class="ma-0 pa-0">
                <v-subheader>5.3.3 Tambo de plástico de 20 lts.</v-subheader>
              </v-col>
              <v-col cols="12" md="1" class="ma-0 pa-0">
                <v-text-field type="number" placeholder="piezas" outlined  dense></v-text-field>
              </v-col>
              <v-col cols="12" md="10" class="ma-0 pa-0">
                <v-subheader>5.4 ¿Se cuenta con una bitacora o cuaderno donde se señalen las actividades a desempeñar, asi como el sumistro de insumos? </v-subheader>
              </v-col>
              <v-col cols="12" md="2" class="ma-0 pa-0"> 
                <v-select :items="yesonot" outlined  dense></v-select>  
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-flex class="xs12 offset-xs9 pa-6">
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
        </v-form>
      </template>
      </v-tab-item>

      <v-tab-item>
        <template> 
          <v-card>
            <v-card-title>
            </v-card-title>
              <v-data-table
                :headers="headers"
                :items="productoAsignado"
                sort-by="territorio"
                class="elevation-1"
                :search="busqueda"
                show-group-by
              >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>Productos elaborados en la biofábrica</v-toolbar-title>
                <v-divider
                  class="mx-6"
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
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Agregar producto
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
                                <p>CAC</p>
                                <v-combobox
                                v-model="asignacionEditada.cac"
                                :items="menuEdicion.cac"
                                clearable
                                ></v-combobox>
                            </v-col>

                             <v-col cols="4" class="mb-4">
                                <p>Categoría de Productos</p>
                                <v-combobox 
                                v-model="asignacionEditada.categoriaproducto"
                                :items="categoriaMenu"
                                clearable
                                ></v-combobox>
                            </v-col>

                            <v-col cols="4" class="mb-4">
                                <p>Producto</p>
                                <v-combobox 
                                v-model="asignacionEditada.producto"
                                :items="productoMenu"
                                clearable
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="2"
                            class="mb-4">
                                <p>Cantidad Producida</p>
                                <v-text-field
                                type="number"
                                v-model="asignacionEditada.cantidadProducida"
                                :items="cantidadProducida"
                                clearable
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2"
                            class="mb-4">
                                <p>Unidad de Medida</p>
                                <v-combobox
                                v-model="asignacionEditada.unidadmedi"
                                :items="unidadmedi"
                                clearable
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="2"
                            class="mb-4">
                                <p>Aplicación</p>
                                <v-combobox
                                v-model="asignacionEditada.aplicaci"
                                :items="aplicaci"
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
                                      <p> Fecha de Elaboración</p>
                                      <v-text-field
                                        v-model="fechaElaboracion"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      ref="picker"
                                      v-model="fechaElaboracion"
                                      :max="new Date().toISOString().substr(0, 10)"
                                      min="1950-01-01"
                                    ></v-date-picker>
                                  </v-menu>
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
            <v-card-actions>
              <v-flex class="xs12 offset-xs9 pa-6">
                <v-btn 
                  class="ma-2"
                  :loading="loading2"
                  :disabled="loading2"
                  color="success"
                  @click="loader = 'loading2'"
                  > Validar y Guardar 
                </v-btn>
                <template v-slot:loader>
                  <span>Loading...</span>
                </template>
              </v-flex>  
            </v-card-actions>  
          </v-card>
        </template>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

</template>

<script>
  /*global $*/
  export default {
name: "InformacionBiofabrica",
    data: () => ({
      tab: null, 
      materialesconstru: ['Proporcionados por Bienestar', 'Aportación de la CAC', 'Materiales de la región'],
      yesonot: ['Si', 'No'],
      unidadmedi: ['Litro', 'Kilogramo'],
      aplicaci: ['Parcela', 'Vivero Comunitario'],
      busqueda: "",
      estatusBiofabrica: ["En contrucción", "Establecido", "Con Producción"],
      loader: null,
      loading1: false,
      date: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'CAC', value: 'cac' }, 
        { text: 'Categoria Producto', value: 'categoriaproducto' }, 
        { text: 'Producto', value: 'producto' }, 
        { text: 'Cantidad', value: 'cantidadProducida', groupable: false },  
        { text: 'Unidad de Medida', value: 'unidadmedi', groupable: false },       
        { text: 'Aplicación', value: 'aplicaci', groupable: false },
        { text: 'Fecha de Elaboración', value: 'fechaElaboracion', groupable: false },
        { text: 'Acciones', value: 'actions', groupable: false, sortable: false }
      ],
      productoAsignado: [
            {   
                "cac":"El resplandor",
                "categoriaproducto":"Mejoradores de suelo",
                "producto":"Composta",
                "cantidadProducida":"1500",
                "unidadmedi":"Kilogramo",
                "aplicaci":"Parcela",
                "fechaElaboracion": "25-19-2021"
            },
                        {   
                "cac":"El cafetal",
                "categoriaproducto":"Manejo Fitosanitario",
                "producto":"Extracto de Neem",
                "cantidadProducida":"40",
                "unidadmedi":"Litro",
                "aplicaci":"Vivero Comunitario",
                "fechaElaboracion": "25-19-2021"
            },
                        {   
                "cac":"El vainillo",
                "categoriaproducto":"Nutrición Vegetal",
                "producto":"Enraizadores a base de lentejas",
                "cantidadProducida":"150",
                "unidadmedi":"Litro",
                "aplicaci":"Parcela",
                "fechaElaboracion": "25-19-2021"
            }
      ],
      indiceEditado: -1,
      menuEdicion: {
    
      },
      asignacionEditada: {
        cac:'',
        categoriaproducto:'',
        producto:'',
        cantidadProducida:'',
        unidadmedi:'',
        aplicaci:'',
        fechaElaboracion: ''
      },
      asignacionPredeterminada: {
        cac:'',
        categoriaproducto:'',
        producto:'',
        cantidadProducida:'',
        unidadmedi:'',
        aplicaci:'',
        fechaElaboracion: ''
      },
    }),

    computed: {
      formTitle () {
        return this.indiceEditado === -1 ? 'Nueva asignación' : 'Editar asignación'
      },

      categoriaMenu() {
        return this.menuEdicion.categoria.map( obj => obj.categoriaproducto )
      },
      productoMenu() {
          console.log("Categoría: " + this.asignacionEditada.categoriaproducto)
        const categoria = this.menuEdicion.categoria.filter( obj => obj.categoriaproducto === this.asignacionEditada.categoriaproducto )
        if(categoria.length === 0) {
          return []
        } else {
          return categoria[0].productos.map( producto => this.formatoProducto(producto) )
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
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },

    created () {
      this.pedirInformacion()
    },

    methods: {
      formatoProducto( s ) {
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
        $.getJSON("./data/tipo_producto.json", function (data) {
            that.menuEdicion.categoria = data
        })
      },

      editItem (item) {
        this.indiceEditado = this.productoAsignado.indexOf(item)
        this.asignacionEditada = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.indiceEditado = this.productoAsignado.indexOf(item)
        this.asignacionEditada = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.productoAsignado.splice(this.indiceEditado, 1)
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
          Object.assign(this.productoAsignado[this.indiceEditado], nuevoItem)
        } else {
          this.productoAsignado.push(nuevoItem)
        }
        this.close()
      }, 
    }, 
  }
 

</script>
