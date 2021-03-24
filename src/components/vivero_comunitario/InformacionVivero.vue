<template>
  <v-card>
    <v-tabs v-model="tab" background-color="#815374" dark>
      <v-tab>1. Datos del Vivero</v-tab>
      <v-tab>2. Información del Vivero</v-tab>
      <v-tab>3. Sistema de Riego</v-tab>
      <v-tab>4. Planta en Producción</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <template>
          <v-form>
            <v-container grid-list-md>
              <v-row>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.1 Nombre del Vivero</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="nombre_vivero">El paraíso del campo</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2 Territorio</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="territorio">Papantla</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.3 Representante del Vivero</v-subheader>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-select id="vselectBeneficiarios" :items="beneficiarios" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2.1 Estado</v-subheader>
                </v-col>
                <v-col cols="12" md="4" >
                  <h4 id="estado">Veracruz</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.4 Nombre del Técnico Productivo</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="nombreTecnicoProductivo">Juan José Rodriguez García</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2.2 Municipio</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="municipio">Papantla</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.4.1 Nombre del Técnico Social</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="nombreTecnicoSocial">Rosa del Carmen Perez Lopez</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2.3 Localidad</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="localidad">Papantla</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.5 Nombre del Facilitador</v-subheader>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 id="nombreFacilitador">Juan Ricardo Solis Vergara</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2.4 Calle/Av./Predio</v-subheader>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-text-field outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.6 Superficie del Vivero</v-subheader>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-text-field
                    outlined
                    dense
                    placeholder="(Ha.)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2.5 Número externo</v-subheader>
                </v-col>
                <v-col cols="12" md="1" class="ma-0 pa-0">
                  <v-text-field outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.2.6 C.P.</v-subheader>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-text-field outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>1.6.1 Coordenadas</v-subheader>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-text-field 
                    id="coordenadaLatitud"
                    v-model="editedItem"
                    label="Latitud"
                    outlined dense>
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-text-field 
                    id="coordenadaLongitud"
                    v-model="editedItem"
                    label="Longitud" 
                    outlined dense>
                    </v-text-field>
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
          <v-form>
            <v-container grid-list-md>
              <v-row>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-subheader>2.1 Número de CAC's Pertenecientes</v-subheader>
                </v-col>
                <v-col cols="12" md="1">
                  <h4 id="numeroCac">1</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>2.2 Nombre de la CAC</v-subheader>
                </v-col>
                <v-col cols="12" md="2">
                  <h4 id="nombreCac">El Sol de México</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>2.2.1 Clave de CAC</v-subheader>
                </v-col>
                <v-col cols="12" md="2">
                  <h4 id="claveCac">TE-123-CALS-21-ACA</h4>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-subheader
                    >2.3 Número de Integrantes del Vivero</v-subheader>
                </v-col>
                <v-col cols="12" md="1" >
                  <h4 id="integrantesVivero">25</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>2.3.1 No. de Mujeres</v-subheader>
                </v-col>
                <v-col cols="12" md="2" >
                  <h4 id="numeroMujeres">15</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>2.3.2 No. de Hombres</v-subheader>
                </v-col>
                <v-col cols="12" md="2">
                  <h4 id="numeroHombres">10</h4>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader>2.4 Estatus del Vivero</v-subheader>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-select id="estatusVivero" :items="estatusvive" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-subheader
                    >2.5 Vivero Construido con Materiales:</v-subheader
                  >
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-select id="viveroConstruido" :items="contruivivero" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="7" class="ma-0 pa-0">
                  <v-subheader
                    >2.6 El vivero cuenta con un espacio o bodega para resguardo
                    de Materiales, Herramientas e Insumos</v-subheader
                  >
                </v-col>
                <v-col cols="12" md="1" class="ma-0 pa-0">
                  <v-select id="bodegaVivero" :items="yesonot" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="8" class="ma-0 pa-0">
                  <v-subheader
                    >2.6.1 ¿Se cuenta con una bitácora o cuaderno donde se señalen
                    las tareas a realizar, asi como el suministro de
                    insumos?
                  </v-subheader>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-select id="bitacoraVivero" :items="yesonot" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-subheader>2.7 ¿Cuenta con energía electrica?</v-subheader>
                </v-col>
                <v-col cols="12" md="1" class="ma-0 pa-0">
                  <v-select id="energiaElectrica" :items="yesonot" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-subheader>2.8 Tipo de acceso al vivero</v-subheader>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-select id="accesoVivero" :items="accesopav" outlined dense></v-select>
                </v-col>
                 <v-col cols="12" md="12" class="ma-0 pa-0">
                  <v-subheader
                    >2.9 Materiales de construcción y herramientas para el
                    vivero proporcionados por la Secretaría de Bienestar
                  </v-subheader>
                </v-col>
              </v-row>
            </v-container>
            <MallaBolsa style="margin: 0 auto;"/>
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
          </v-form>
        </template>
      </v-tab-item>

      <v-tab-item>
        <template>
          <v-form>
            <v-container grid-list-md>
              <v-row>
                <v-col cols="12" md="4">
                  <v-subheader
                    >3.1 Fuente de abastecimiento de Agua
                    (Primario)</v-subheader>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select id="abastecimientoAgua" :items="abastedeagua" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-subheader
                    >3.1.1 Fuente de abastecimiento de Agua
                    (Secundario)</v-subheader>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select :items="abastedeagua" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-subheader
                    >3.1.2 Fuente de abastecimiento de Agua
                    (Terciario)</v-subheader>
                </v-col>
                <v-col cols="12" md="2" class="ma-0 pa-0">
                  <v-select :items="abastedeagua" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-subheader>3.2 Estatus del sistema de riego</v-subheader>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-select :items="estatusriego" outlined dense></v-select>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-subheader>3.3 Tipo de sistema de riego</v-subheader>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <v-select :items="tiporiego" outlined dense></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-flex class="xs12 offset-xs9 pa-6">
                <v-btn 
                  class="ma-2"
                  :loading="loading3"
                  :disabled="loading3"
                  color="success"
                  @click="loader = 'loading3'"
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
            <v-card-title> </v-card-title>
            <v-data-table
              :headers="headers"
              :items="plantasAsignadas"
              sort-by="territorio"
              class="elevation-1"
              :search="busqueda"
              show-group-by
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title
                    >Planta dentro del Vivero Comunitario</v-toolbar-title
                  >
                  <v-divider class="mx-6" inset vertical></v-divider>
                  <v-text-field
                    v-model="busqueda"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-divider class="mx-3" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="1200px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
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
                            <v-col cols="12" sm="4" class="mb-2">
                              <p>CAC</p>
                              <v-combobox
                                v-model="asignacionEditada.cac"
                                :items="menuEdicion.cac"
                                clearable
                              ></v-combobox>
                            </v-col>

                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Categoría planta</p>
                              <v-combobox
                                v-model="asignacionEditada.catPlanta"
                                :items="categoriaMenu"
                                clearable
                              ></v-combobox>
                            </v-col>

                            <v-col cols="12" sm="6" class="mb-2">
                              <p>Especie</p>
                              <v-combobox
                                v-model="asignacionEditada.especie"
                                :items="especieMenu"
                                clearable
                              ></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Planta en Semillero</p>
                              <v-text-field
                                v-model="asignacionEditada.cantisemille"
                                :items="menuEdicion.cantisemille"
                                type="number"
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Planta en Desarrollo</p>
                              <v-text-field
                                v-model="asignacionEditada.cantidesarro"
                                :items="menuEdicion.cantidesarro"
                                type="number"
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Planta Lista para Extraer</p>
                              <v-text-field
                                v-model="asignacionEditada.cantidadlistext"
                                :items="menuEdicion.cantidadlistext"
                                type="number"
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Planta Extraída</p>
                              <v-text-field
                                v-model="asignacionEditada.cantidadextrai"
                                :items="menuEdicion.cantidadextrai"
                                type="number"
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Planta Total Producida</p>
                              <v-text-field
                                v-model="asignacionEditada.cantidadtotalp"
                                :items="menuEdicion.cantidadtotalp"
                                type="number"
                                clearable
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="mb-2">
                              <p>Fecha de Entrega</p>
                              <v-text-field
                                v-model="asignacionEditada.fechaactua"
                                type="date"
                              ></v-text-field>
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
                        >¿Seguro que quieres borrar esta
                        asignación?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
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
                <v-icon class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" @click="pedirInformacion">
                  Actualizar
                </v-btn>
              </template>
            </v-data-table>
              <v-card-actions>
                <v-flex class="xs12 offset-xs9 pa-6">
                  <v-btn 
                    class="ma-2"
                    :loading="loading4"
                    :disabled="loading4"
                    color="success"
                    @click="loader = 'loading4'"
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
import MallaBolsa from './MallaBolsa'

export default {
  name: "InformacionVivero",
  components: {
    MallaBolsa
  },    

  data: () => ({
    tab: null,
    loader: null,
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    estatusvive: ['En construcción', 'Establecido', 'Con Producción de Planta','Reubicación','Siniestrado'],
    contruivivero: [
      'Proporcionados por Bienestar','Aportación de la CAC','Materiales de la Región','Ambos'],
    yesonot: ["Si", "No"],
    accesopav: ["Pavimiento", "Terraceria"],
    beneficiarios: [
      "Jose Castrejón Garcia",
      "Rodrigo Perez Lopez",
      "Lorena Campos Campos",
    ],
    abastedeagua: [
      "Arroyo",
      "Jaguey",
      "Laguna",
      "Manantial",
      "Pozo",
      "Red pública",
      "Río",
      "Pipa",
      "Otro",
    ],
    estatusriego: ["Por instalar", "En Proceso de instalación %", "Instalado"],
    tiporiego: [
      "Aéreo",
      "Manual",
      "Manual con manguera",
      "Aspersión",
      "Microaspersión",
      "Goteo",
      "Nebulización",
      "Otro",
    ],

    busqueda: "",
    menu: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "CAC", value: "cac" },
      { text: "Categoria Planta", value: "catPlanta" },
      { text: "Especie", value: "especie" },
      { text: "Planta en Semillero", value: "cantisemille", groupable: false },
      { text: "Planta en Desarrollo", value: "cantidesarro", groupable: false },
      {
        text: "Planta lista para Extraer",
        value: "cantidadlistext",
        groupable: false,
      },
      { text: "Planta Extraída", value: "cantidadextrai", groupable: false },
      {
        text: "Planta Total Producida",
        value: "cantidadtotalp",
        groupable: false,
      },
      { text: "Fecha de Actualización", value: "fechaactua", groupable: false },
      { text: "Acciones", value: "actions", groupable: false, sortable: false },
    ],
    plantasAsignadas: [
      {
        cac: "El resplandor",
        catPlanta: "Agroindustrial",
        especie: "Theobroma Cacao - Cacao Guayaquil",
        cantisemille: "1500",
        cantidesarro: "4100",
        cantidadlistext: "300",
        cantidadextrai: "20000",
        cantidadtotalp: "25900",
        fechaactua: "2020-12-15",
      },
      {
        cac: "El cafetal",
        catPlanta: "Frutal",
        especie: "Malus Domestica - Manzana var. Royal Gala",
        cantisemille: "500",
        cantidesarro: "1100",
        cantidadlistext: "105",
        cantidadextrai: "21000",
        cantidadtotalp: "22705",
        fechaactua: "2020-12-25",
      },
      {
        cac: "El vainillo",
        catPlanta: "Forestal",
        especie: "Theobroma Cacao - Cacao Guayaquil",
        cantisemille: "2300",
        cantidesarro: "1400",
        cantidadlistext: "4120",
        cantidadextrai: "12000",
        cantidadtotalp: "19820",
        fechaactua: "2020-12-22",
      },
    ],
    indiceEditado: -1,
    menuEdicion: {
      sistemaagro: ["Saf", "Miaf"],
      objetivo: ["Productivo", "Reforestación"],
      Estatuspla: ["Entregada al Sembrador", "Establecida en Parcela"],
      categoria: [
        {
          tipo: "",
          especies: [""],
        },
      ],
    },
    asignacionEditada: {
      cac: "",
      catPlanta: "",
      especie: "",
      cantisemille: "",
      cantidesarro: "",
      cantidadlistext: "",
      cantidadextrai: "",
      cantidadtotalp: "",
      fechaactua: "",
    },
    asignacionPredeterminada: {
      cac: "",
      catPlanta: "",
      especie: "",
      cantisemille: "",
      cantidesarro: "",
      cantidadlistext: "",
      cantidadextrai: "",
      cantidadtotalp: "",
      fechaactua: "",
    },
  }),

  computed: {
    formTitle() {
      return this.indiceEditado === -1
        ? "Nueva asignación"
        : "Editar asignación";
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
    loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
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


