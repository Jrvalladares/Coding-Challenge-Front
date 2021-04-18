<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        class="px-10 text-capitalize"
        depressed
        color="secondary"
        outlined
        @click="clear()"
      >
        Clear
      </v-btn>
    </template>
    <span><small>Clear all fields </small></span>
  </v-tooltip>
</template>


<script>
export default {
  props: {
    form: {
      default: null
    }
  },
  methods: {
    clear() {
      try {
        this.form.clear();
      } catch (error) {
        error;
        // alert("El Objeto no dispone de una función para limpiar sus campos");
      }
    }
  }
};
</script>