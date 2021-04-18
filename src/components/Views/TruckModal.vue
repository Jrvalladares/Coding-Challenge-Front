<template>
    <v-dialog v-model="display" scrollable persistent max-width="600px">
        <v-card>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="$emit('onClose')">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-menu>

            <v-card-title py-2>
                <span class="headline">{{ form.id ? 'Edit' : 'Create' }} Truck</span>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-form ref="formTruck" autocomplete="off">
                    <v-layout row wrap pt-6 justify-space-around>
                        <v-flex xs12 sm5 lg5 pa-1>
                            <v-text-field label="Name" type="text" v-model="form.name" :rules="[rules.required]"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm5 lg5 pa-1>
                            <v-text-field label="City" type="text" v-model="form.city" :rules="[rules.required]"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm5 lg5 pa-1>
                            <v-text-field label="State" type="text" v-model="form.state" :rules="[rules.required]"></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm5 lg5 pa-1>
                            <v-text-field label="Zip Code" type="text" v-model="form.zip" :rules="[rules.required]"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <div class="button-group">
                    <ButtonRestore v-if="form.id" :form="form" />
                    <ButtonClear :form="form" />

                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" depressed color="primary" class="px-10 text-capitalize" @click="sendTruckRequest()">
                                Save
                            </v-btn>
                        </template>
                        <span><small>Enviar formulario</small></span>
                    </v-tooltip>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import Truck from "../../models/Truck";
    import { rules } from "../../plugins/Utility";
    import ApiTrucks from "../../api/trucks";

    import ButtonClear from "../Widgets/Buttons/ButtonClear";
    import ButtonRestore from "../Widgets/Buttons/ButtonRestore";

    export default {
        components: {
            ButtonClear,
            ButtonRestore,
        },

        props: {
            editData: {
                type: Object,
                default: null
            },
            display: {
                type: Boolean,
                default: false
            },
            closeModal: Function,
            getTrucks: Function,
        },

        data: () => ({
            rules,
            form: new Truck(),
        }),

        created() {

        },
        
        mounted() {
        },

        computed: {
        },
        
        watch: {
            display: {
                deep: true,
                immediate: true,
                handler: function (newVal) {
                    if (this.$refs.formTruck) this.$refs.formTruck.reset();

                    if (newVal == true)
                    { this.form = new Truck(this.editData); }
                }
            },
        },

        methods: {
            sendTruckRequest() {
                if (this.$refs.formTruck.validate()) {
                    if (this.form.id)
                    { this.updateTruck(); }
                    else
                    { this.storeTruck(); }
                } else {
                    this.$handleErrorValidation();
                }
            },

            storeTruck() {
                ApiTrucks.create(this.form)
                .then((response) => {
                    this.getTrucks();
                    this.$emit('onClose', true);
                    this.$handleSuccessResponse(response);
                })
                .catch((error) => {
                    this.$handleErrorResponse(error);
                });
            },

            updateTruck() {
                ApiTrucks.update(this.form.id, this.form)
                .then((response) => {
                    this.getTrucks();
                    this.$emit('onClose', true);
                    this.$handleSuccessResponse(response);
                })
                .catch((error) => { this.$handleErrorResponse(error); });
            },
        },
    };
</script>

<style scoped>
.button-group {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;

    @media (max-width: 599px) and (min-width: 320px) {
      button {
        margin: 5px auto;
      }
    }
}
</style>