<template>
    <v-dialog v-model="display" max-width="500">
      <v-card class="pa-4">
        <v-card-title class="headline px-0 pt-0">{{heading}}</v-card-title>

        <v-card-text class="px-0 pt-0">{{message}}</v-card-text>

        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn color="error" @click="$emit('onConfirm')">Confirm</v-btn>
          <v-btn color="primary" @click="display=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: {
      heading: {
        type: String,
        default: 'Are You Sure You Want To Delete?'
      },
      message: {
        type: String,
        default: 'Are you sure you want to delete this record permanently?'
      },
      onConfirm: {
        
      }
    },
    
    data() {
      return {
        display: false
      };
    },

    methods: {
      openDialog() {
        this.display = true;
      },
      closeDialog() {
        this.display = false;
      },
    }
  };
</script>

