<template>
  <v-app> 
    <!-- 
        *** Colores: ***
        Verde: #76B82A;
        Azul:  #1B5A7D;
        Morado:#815374;
    -->
    <v-app-bar app color="#1B5A7D" dark > 
      <!-- Menú de hamburguesa -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- Logo SEMBRANDO VIDA -->
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/Sembrando Vida_Logo_azul_negativo.png')"
          transition="scale-transition"
          width="90"
        />
      </router-link>
    </v-app-bar>

  <div id="app">
    <div id="nav" >
    <v-navigation-drawer v-model="drawer" fixed width="280px" temporary >
      <!-- Datos del usuario -->
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ usuario.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ usuario.login }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- Secciones de la aplicación -->
      <v-list nav dense>
        <router-link to="/PlantaEnParcela">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-nature-people</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Plantas en parcela</v-list-item-title>
          </v-list-item>
        </router-link> 
        <router-link to="/ViverosComunitarios">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-sprout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>V. Comunitario y Biofabrica</v-list-item-title>
          </v-list-item>
        </router-link> 
        <router-link to="/Capacitaciones">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-bookshelf</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Capacitaciones</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
      <v-divider></v-divider>
      <!-- Menú para logout y para configuración -->
      <v-list nav dense>
      <!-- TODO : Crear opciones para el usuario, por ejemplo que puedan escoger entre modo Día y modo Oscuro -->
        <router-link to="/">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Opciones</v-list-item-title>
          </v-list-item>
        </router-link>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
          <!-- TODO : Crear opciones para el usuario, por ejemplo que puedan escoger entre modo Día y modo Oscuro -->
        <router-link to="/Administrador">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/Territorial">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Territorial</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/Facilitador">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Facilitador</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer> 


      <!--router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link-->
    </div>
      <router-view class="view_one"></router-view>
  </div>
  </v-app>
</template>

<script>

export default {
  name: "App",


  data: () => ({
    drawer: false, // Para mostrar el menú lateral
    usuario: {
      // Datos del usuario que se está conectando
      id: 0,
      name: "",
      login: "",
      perfil: 5,
    }
  }),

    // Para la máquina de estados que selecciona las diferentes secciones de la app
    created() {
      // Se conecta a la base de datos
      // Se revisa si el usuario tinen perfil de técnico
      // Solicita sus datos y los datps de sus sembradores

      // TODO: Conectar con el API ajustar a vue router
      if (localStorage.appEstado) {
        //this.cambiarEstado(localStorage.appEstado);
      }

      this.usuario = {
        id: 12345,
        name: "José Luis Romero García",
        login: "luisroga7@gmail.com",
        perfil: 5,
      };

      if (this.usuario.perfil !== 5 && this.usuario.perfil !== 6) {
        alert("No eres un técnico, no puedes entrar en esta sección.");
        document.body.style.display = "none";
      } else {
        document.body.style.display = "block";
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>