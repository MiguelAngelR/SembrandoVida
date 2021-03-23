import Vue from 'vue'
import VueRouter from 'vue-router'
import ViverosComunitarios from "../components/vivero_comunitario/Index";
import PlantaEnParcela from "../components/planta_en_parcela/Index";
import Capacitaciones from "../components/capacitaciones/Index";
import Administrador from "../components/admin/Index"; 
import Territorial from "../components/territorial/Index";
import Facilitador from "../components/facilitador/Index";
import Inicio from "../components/inicio";
import InformacionVivero from "../components/vivero_comunitario/InformacionVivero";
import InformacionBiofabrica from "../components/biofabrica/InformacionBiofabrica";
import index2 from "../components/planta_en_parcela/index2";
import Cultivos from "../components/planta_en_parcela/indexcultivo";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ViverosComunitarios',
    name: 'ViverosComunitarios',
    component: ViverosComunitarios
  },
  {
    path: '/InformacionVivero',
    name: 'informacionVivero',
    component: InformacionVivero
  },
  {
    path: '/InformacionBiofabrica',
    name: 'informacionBiofabrica',
    component: InformacionBiofabrica
  },
  {
    path: '/PlantaEnParcela',
    name: 'PlantaEnParcela',
    component: PlantaEnParcela
  },
  {
    path: '/index2',
    name: 'index2',
    component: index2
  },
  {
    path: '/Cultivos',
    name: 'Cultivos',
    component: Cultivos
  },
  {
    path: '/Administrador',
    name: 'Administrador',
    component: Administrador
  },
  {
    path: '/Capacitaciones',
    name: 'Capacitaciones',
    component: Capacitaciones
  },
  {
    path: '/Territorial',
    name: 'Territorial',
    component: Territorial
  },
  {
    path: '/Facilitador',
    name: 'Facilitador',
    component: Facilitador
  },
]

const router = new VueRouter({
  routes
})

export default router
