<template>
    <v-container pt-5>
        <loader :display="loader" />

        <v-container v-show="!loader" class="home">
            <v-row class="text-center">
                <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3"> Trucks Data Table </h1>
                </v-col>
            </v-row>
        </v-container>

        <v-layout v-show="!loader" row wrap>
            <v-flex xs12>
                <v-card>
                    <v-app-bar flat color="white">
                        <v-text-field flat solo prepend-icon="mdi-search-web" placeholder="Search" v-model="search" hide-details class="hidden-sm-and-down elevation-0"></v-text-field>

                        <v-spacer></v-spacer>

                        <v-btn color="primary" @click="manageModalData(true)">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>

                    </v-app-bar>

                    <v-divider></v-divider>

                    <v-card-text class="pa-0">
                        <v-data-table  
                            v-bind:search="search"
                            :items="items"
                            :loading="table.loading"
                            :headers="table.headers"
                            :sort-by.sync="table.sortBy"
                            :options.sync="table.pagination"
                            :sort-desc.sync="table.sortDesc"
                            :footer-props="table.footerProps"
                            :server-items-length="table.totalItems"
                        >
                            <v-progress-linear slot="progress" height="4" indeterminate></v-progress-linear>

                            <template v-slot:[`item.actions`]="{ item }">
                                <td class="text-xs-center">
                                    <v-btn icon @click="manageModalData(true, item)">
                                        <v-icon color="info">mdi-pencil</v-icon>
                                    </v-btn>

                                    <v-btn icon @click="manageModalDelete(item)">
                                        <v-icon color="error">mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </template>

                            <template v-slot:no-data> 
                                <h5 class="ma-2 text-center"><b>No Data Available</b></h5>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <TruckModal :display="modalData.display" :editData="modalData.editData" :getTrucks="getTrucks" @onClose="manageModalData(false)"/>

        <delete-confirmation-dialog ref="deleteConfirmationDialog" :heading="modalDelete.heading" :message="modalDelete.message" @onConfirm="deleteTruck"/>
    </v-container>
</template>

<script>
    import ApiTrucks from "../../api/trucks";
    import TruckModal from "../../components/Views/TruckModal";

    export default {
        name: 'TrucksTable',

        components: {
            TruckModal,
        },

        data: () => ({
            loader: false,

            modalData: {  //Parámetros del Modal de Categoría (Crear/Editar)
                display: false,
                editData: null,
            },

            modalDelete: {  //Parámetros del Modal de Confirmación de Borrado (Delete)
                heading: '',
                message: '',
                deleteData: null,
            }, 

            items: [],  //Registros de la Tabla
            search: '', //Variable para búsqueda de registros en la Tabla
            table: {    //Parámetros de la Tabla de Datos
                sortBy: "id",
                totalItems: 0,
                loading: false,
                pagination: {},
                sortDesc: false,
                headers: [
                    { text: "Name",    value: "name" },
                    { text: "City",    value: "city" },
                    { text: "State",   value: "state" },
                    { text: "Zip",     value: "zip",},
                    { text: "Actions", value: "actions", sortable: false },
                ],
                footerProps: {
                    "items-per-page-options": [5, 15, 30, 50, 100],
                    itemsPerPageText: "Rows Per Page",
                },
            },
        }),

        mounted() {
            this.getTrucks();
            // this.manageLoading(false);
        },

        watch: {
        },

        computed: {
        },

        methods: {
            manageLoading(state = true) {
                this.loader = state;
            },

            manageModalData(show = false, item = null) {
                this.modalData = {display: show, editData: item}
            },

            manageModalDelete(item) {
				this.modalDelete = {
                    heading: "Are You Sure You Want To Delete?",
                    message: "Are you sure you want to delete this record permanently?",
                    deleteData: item,
                };

                this.$refs.deleteConfirmationDialog.openDialog();
            },

            getTrucks() {
                this.manageLoading();
                this.table.loading = true;
                const { page, itemsPerPage, sortBy, sortDesc } = this.table.pagination;

                ApiTrucks.fetch({page, itemsPerPage, sortBy: sortBy[0], descending: sortDesc[0] ? "desc" : "asc", search: this.search}).then((response) => {
                    const { data, total } = response.data;

                    this.items = data;
                    this.table.loading = false;
                    this.table.totalItems = total;
                }).catch((error) => {
                    this.table.loading = false;
                    this.$handleErrorResponse(error);
                }).finally(() => this.manageLoading(false));
            },

            deleteTruck() {
                this.manageLoading();

                ApiTrucks.delete(this.modalDelete.deleteData.id).then((response) => {
                    this.$refs.deleteConfirmationDialog.closeDialog();
                    this.getTrucks();
                    this.$handleSuccessResponse(response, "Registry Deleted Successfully");
                }).catch((error) => {
                    this.$handleErrorResponse(error);
                }).finally(() => this.manageLoading(false));
            },
        },
    }
</script>
