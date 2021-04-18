<template>
    <v-layout v-if="display" py-6 row wrap align-center justify-center fill-height>
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </v-layout>
</template>

<script>
    export default {
        props: {
            display: {
                type: Boolean,
                default: true,
            }
        }
    };
</script>