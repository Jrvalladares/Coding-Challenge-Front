<template>
  <v-container class="home">
    <v-row class="text-center">
        <v-col cols="12">
            <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"/>
        </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3"> Welcome </h1>
          <br>
          <p class="subheading font-weight-regular">
              This is the main page of the frontend used to meet the coding challenge
          </p>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {
  }
}
</script>
