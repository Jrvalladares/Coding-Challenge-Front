<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        type="submit"
        class="px-10 text-capitalize"
        depressed
        color="primary"
      >
        {{label}}
      </v-btn>
    </template>
    <span><small>Send form</small></span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    label: {
      default: "Save"
    }
  }
};
</script>