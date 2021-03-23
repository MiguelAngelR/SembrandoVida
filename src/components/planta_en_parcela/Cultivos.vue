<template> 
    <v-card class="pa-6" outlined tile>
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
          <v-toolbar flat style="background-color: #1B5A7D">
            <v-toolbar-title class="flex text-center white--text">Establecimiento de Cultivos </v-toolbar-title>
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
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Agregar Cultivo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="12"
                        class="mb-12">
                            <p>Nombre del Cultivo</p>
                            <v-combobox
                            v-model="asignacionEditada.namecultivo"
                            :items="menuEdicion.namecultivo"
                            clearable
                            ></v-combobox>
                        </v-col>

                        <v-col cols="12" sm="6"
                        class="mb-6">
                            <p>Ciclo del Cultivo</p>
                            <v-combobox
                            v-model="asignacionEditada.ciclocultivo"
                            :items="menuEdicion.ciclocultivo"
                            clearable
                            ></v-combobox>
                        </v-col>
                        <v-col cols="12" sm="6"
                        class="mb-6">
                            <p>Estatus de Cultivo</p>
                            <v-combobox
                            v-model="asignacionEditada.estatusculti"
                            :items="menuEdicion.estatusculti"
                            clearable
                            ></v-combobox>
                        </v-col>

                        <v-col cols="12" sm="6" class="mb-6">
                            <p>Superficie Establecida (ha)</p>
                            <v-text-field
                            v-model="asignacionEditada.superestableculti"
                            type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="mb-6">
                            <p>Rendimiento</p>
                            <v-text-field
                            v-model="asignacionEditada.rendimi"
                            type="number"
                            ></v-text-field>
                            <v-combobox 
                            v-model="asignacionEditada.unidadmedid"
                            :items="menuEdicion.unidadmedid"
                            label="Unidad de Medida"
                            clearable
                            ></v-combobox>
                        </v-col>

                        <v-col cols="12" sm="6" class="mb-6">
                            <p>Precio del producto c/u</p>
                            <v-text-field
                            v-model="asignacionEditada.preciocu"
                            type="number"
                            label="$"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="mb-6">
                            <p>Destino de Producción</p>
                            <v-text-field
                            v-model="asignacionEditada.destinoAuto"
                            type="number"
                            label="Autoconsumo %"
                            ></v-text-field>
                            <v-text-field 
                            v-model="asignacionEditada.trueque"
                            type="number"
                            label="Trueque %"
                            ></v-text-field>
                            <v-text-field 
                            v-model="asignacionEditada.vtaloc"
                            type="number"
                            label="Venta Local %"
                            ></v-text-field>
                            <v-text-field 
                            v-model="asignacionEditada.vtareg"
                            type="number"
                            label="Venta Regional %"
                            ></v-text-field>
                            <v-text-field 
                            v-model="asignacionEditada.Destinootro"
                            type="number"
                            label="Otro %"
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
    name: 'Cultivos',
    data: () => ({
      busqueda: "",
      menu: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Nombre del Cultivo', value: 'namecultivo',  align:'center' }, 
        { text: 'Ciclo de Cultivo', value: 'ciclocultivo',  align:'center' }, 
        { text: 'Estatus del Cultivo', value: 'estatusculti',  align:'center' }, 
        { text: 'Superficie Establecida (ha)', value: 'superestableculti', groupable: false,  align:'center'  },         
        { text: 'Rendimiento', value: 'rendimi', groupable: false,  align:'center'  }, 
        { text: 'Unidad de Medida', value: 'unidadmedid',  align:'center'  }, 
        { text: 'Precio del Producto $', value: 'preciocu', groupable: false,  align:'center'  }, 
        { text: 'Autoconsumo %', value: 'destinoAuto', groupable: false,  align:'center'  },
        { text: 'Trueque %', value: 'trueque', groupable: false,  align:'center'  },
        { text: 'Venta Local %', value: 'vtaloc', groupable: false,  align:'center'  },
        { text: 'Venta Regional %', value: 'vtareg', groupable: false,  align:'center'  },
        { text: 'Otro %', value: 'Destinootro', groupable: false,  align:'center'  },
        { text: 'Acciones', value: 'actions', groupable: false, sortable: false,  align:'center'  }
      ],
      plantasAsignadas: [
            {   
                "namecultivo":"Calabaza",
                "ciclocultivo":"Primavera - Verano",
                "estatusculti":"Cosechado",
                "superestableculti":"0.5",
                "rendimi":"120",
                "unidadmedid":"Kilogramo",
                "preciocu":"4",
                "destinoAuto":"50",
                "trueque":"10",
                "vtaloc":"40",
                "vtareg":"0",
                "Destinootro":"0",
            },
            {   
                "namecultivo":"Frijol",
                "ciclocultivo":"Primavera - Verano",
                "estatusculti":"Cosechado",
                "superestableculti":"1.5",
                "rendimi":"20",
                "unidadmedid":"Tonelada",
                "preciocu":"6000",
                "destinoAuto":"10",
                "trueque":"10",
                "vtaloc":"70",
                "vtareg":"10",
                "Destinootro":"0",
          },           
            {   
                "namecultivo":"Sandia",
                "ciclocultivo":"Primavera - Verano",
                "estatusculti":"Cosechado",
                "superestableculti":"0.5",
                "rendimi":"200",
                "unidadmedid":"Pieza",
                "preciocu":"20",
                "destinoAuto":"10",
                "trueque":"10",
                "vtaloc":"80",
                "vtareg":"0",
                "Destinootro":"0",
          },
      ],
      indiceEditado: -1,
      menuEdicion: {
        namecultivo: [
                      "Acelga - Beta vulgaris var. cycla",
                      "Ajo - Allium sativum",
                      "Ajonjoli - Sesamum indicum",
                      "Albahaca o albacar - Ocimum basilicum",
                      "Alcachofa - Cynara cardunculus",
                      "Alfalfa - Medicago sativa",
                      "Algodón - Gossypium hirsutum",
                      "Amaranto - Amaranthus sp.",
                      "Apío - Apium graveolens var. Dulce",
                      "Arnica - Heterotheca inuloides",
                      "Arroz - Oryza sativa",
                      "Avena forrajera - Avena sativa",
                      "Berenjena - Solanum melongena",
                      "Betabel - Beta vulgaris var conditiva",
                      "Boleto - Boletus edulis",
                      "Cacahuate - Arachis hypogaea",
                      "Calabaza milpera - Cucurbita pepo",
                      "Calabaza, zapallo, pipian - Cucurbita maxima",
                      "Camote - Ipomoea batatas",
                      "Caña de azúcar - Saccharum officinarum",
                      "Cártamo - Carthamus tinctorius",
                      "Cebada - Hordeum vulgare",
                      "Cebolla, cebollina - Allium cepa",
                      "Cebollín - Allium fistulosum, A. schoenoprasum",
                      "Centeno - Secale cereale",
                      "Champiñon - Agaricus bisporus",
                      "Chayote - Sechium edule",
                      "Chilacayote - Cucurbita ficifolia",
                      "Chile arbol - Capsicum annuum var. annuum",
                      "Chile bolita - Capsicum annuum var. annuum",
                      "Chile - Capsicum sp.",
                      "Chile cascabel - Capsicum annuum var. annuum",
                      "Chile Habanero - Capsicum chinense",
                      "Chile jalapeño - Capsicum annuum var. annuum",
                      "Chile manzano - Capsicum pubescens",
                      "Chile morrón - Capsicum annuum var. Annuum",
                      "Chile mulato - Capsicum annuum var. annuum",
                      "Chile pasilla - Capsicum annuum var. annuum",
                      "Chile poblano - Capsicum annuum var. annuum",
                      "Chile serrano - Capsicum annuum var. annuum",
                      "Chile tabasco - Capsicum frutescens",
                      "Chiltepín, chile piquín - Capsicum annuum var. glabriusculum, sin. aviculare",
                      "Cilantro - Coriandrum sativum",
                      "Col o repollo - Brassica oleracea var. capitata",
                      "Coliflor - Brassica oleracea var. botrytis",
                      "Epazote, apazote - Dysphania ambrosioides",
                      "Esparrago - Asparagus officinalis",
                      "Espinaca - Spinacia oleracea",
                      "Frijol - Phaseolus vulgaris",
                      "Garbanzo - Cicer arietinum",
                      "Girasol - Helianthus annuus",
                      "Gordolobo mexicano, manzanilla del rio - Pseudognaphalium obtusifolium",
                      "Gordolobo - Verbascum thapsus",
                      "Haba - Vicia faba",
                      "Hierbabuena o yerbabuena - Mentha spicata",
                      "Hongo Seta - Agaricus arvensis",
                      "Jamaica - Hibiscus sabdariffa",
                      "Jenjibre - Zingiber officinale",
                      "Jícama - Pachyrhizus erosus",
                      "Lechuga - Lactuca sativa",
                      "Lenteja - Lens culinaris",
                      "Maiz - Zea mays",
                      "mala mujer de cerro - Cnidoscolus multilobus",
                      "Malanga - Colocasia esculenta",
                      "Melon - Cucumis melo",
                      "Menta - Mentha piperita",
                      "Papa - Solanum tuberosum",
                      "Pepino - Cucumis sativus",
                      "Perejil - Petroselinum sativum",
                      "Rabanos - Raphanus sativus",
                      "Romero - Rosmarinus officinalis",
                      "Ruda - Ruta graveolens",
                      "Sabila - Aloe vera",
                      "Sandia - Citrullus lanatus",
                      "Sorgo - Sorghum bicolor",
                      "Soya - Glycine max",
                      "Tomate, jitomate, tomate rojo - Solanum lycopersicum, sin. Lycopersicon esculentum",
                      "Tomate verde, tomatillo, tomate de cascara o tomate de milpa - Physalis Philadelphica",
                      "Tomillo - Thymus vulgaris",
                      "Toronjil - Agastache mexicana",
                      "Trigo - Triticum aestivum",
                      "Triticale - x Triticosecale spp.",
                      "Vaporuv - Plectranthus coleoides",
                      "Yuca - Manihot esculenta",
                      "Zanahoria - Daucus carota",
],
        ciclocultivo: ["Primavera - Verano", "Otoño - Invierno"],
        estatusculti: ["Establecimiento", "Desarrollo o Crecimiento", "Cosechado", "Siniestrado"],
        unidadmedid: ["Kilogramo", "Tonelada", "Pieza"],
        sistemaagro: [ "Saf", "Miaf"],
      },
      asignacionEditada: {
        namecultivo:'',
        ciclocultivo:'',
        estatusculti:'',
        superestableculti:'',
        rendimi: '',
        unidadmedid: '',
        preciocu:'',
        destinoAuto:'',
        trueque: '',
        vtaloc:'',
        vtareg:'',
        Destinootro:''

      },
      asignacionPredeterminada: {
        namecultivo:'',
        ciclocultivo:'',
        estatusculti:'',
        superestableculti:'',
        rendimi: '',
        unidadmedid: '',
        preciocu:'',
        destinoAuto:'',
        trueque: '',
        vtaloc:'',
        vtareg:'',
        Destinootro:''
      },
    }),

    computed: {
      formTitle () {
        return this.indiceEditado === -1 ? 'Agregar Cultivo' : 'Editar Cultivo'
      },
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