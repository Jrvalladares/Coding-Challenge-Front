<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        class="px-10 text-capitalize"
        depressed
        color="secondary"
        @click="restore()"
      >
        Restore
      </v-btn>
    </template>
    <span><small>Restore original content of fields</small></span>
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
    restore() {
      try {
        this.form.restore();
      } catch (error) {
        error;
        // alert("El Objeto no dispone de una función para restaurar datos a su origen"k);
      }
    }
  }
};
</script>