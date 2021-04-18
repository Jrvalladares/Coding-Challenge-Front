<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40"/>

        <h2>Challenge</h2>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/" class="white--text">
        <v-btn text>
          <v-icon>mdi-home</v-icon>
          Home
        </v-btn>
      </router-link>

      <router-link to="/trucks" class="white--text">
        <v-btn text>
          <v-icon>mdi-car</v-icon>
          Trucks Table
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>

       <notifications group="loggedIn" position="top right"/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    components: {
    },

    data: () => ({
    }),
  };
</script>
