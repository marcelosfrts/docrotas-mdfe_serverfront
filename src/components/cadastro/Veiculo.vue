<template>
    <div class="action-vehicle">
        <div class="row my-0" v-if="isForm">
            <div class="col-md-1 text-center">
                <b-button variant="outline-success" size="sm" @click="saveEntity()">
                    Salvar  <i class="fa fa-check-square"></i>
                </b-button>
            </div>
            <div class="col-md-0 text-center">
                <b-button variant="outline-danger" size="sm">
                    Excluir  <i class="fa fa-minus-square"></i>
                </b-button>
            </div>
            <div class="col-md-1 text-center">
                <b-button variant="outline-dark" size="sm" @click="cancelEdition()">
                    Voltar  <i class="fa fa-arrow-circle-left"></i>
                </b-button>
            </div>
        </div>
        <div class="row my-0" v-else>
            <div class="col-md-1 text-center">
                <b-button variant="outline-primary" size="sm" @click="newEntity()">
                    Novo <i class="fa fa-plus-square"></i>
                </b-button>
            </div>
        </div>
        <hr/>
        <div v-if="isForm">
            <div class="formVehicle">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-id-vehicle" label="Código" label-for="id-vehicle">
                                <b-form-input id="id-vehicle" v-model="vehicle.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-placa" label="Placa" label-for="placa">
                                <b-form-input id="placa" v-model="vehicle.placa" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-tara" label="Tara" label-for="tara">
                                <b-form-input id="tara" v-model="vehicle.tara" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-capkg" label="Capacidade" label-for="capkg">
                                <b-form-input id="capkg" v-model="vehicle.capkg" type="number"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-tprodado" label="Tipo Veículo" label-for="tprodado">
                                <b-form-input id="tprodado" v-model="vehicle.tprodado" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-tpcarroceria" label="Tipo Carroceria" label-for="tpcarroceria">
                                <b-form-input id="tpcarroceria" v-model="vehicle.tpcarroceria" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridVehicle">
                <b-table hover :items="vehicles" :fields="fields">
                    <template slot=" " slot-scope="row">
                        <b-button variant="outline-secondary" size="sm-3" @click="editEntity(row.item)">
                            <i class="fa fa-search"></i>
                        </b-button>
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
const url = `${baseApiUrl}`

export default {
    name: 'Veiculo',
    data: function() {
        return {
            isForm: false,
            vehicle: { id: null,
                       placa: null,
                       tara: null,
                       capkg: null,
                       tipoRodado: null,
                       tipoCarroceria: null
                     },
            vehicles: [],
            fields: [
                { key: ' ',
                  label: null
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'placa',
                  label: 'Placa',
                  sortable: true
                },
                { key: 'tipoRodado',
                  label: 'Tipo Veículo',
                  sortable: true
                },
                { key: 'tipoCarroceria',
                  label: 'Tipo Carroceria',
                  sortable: true
                },
                { key: 'tara',
                  label: 'Tara'
                },
                { key: 'capkg',
                  label: 'Capacidade'
                }
            ]
        }
    },
    methods: {
        loadEntity() {
            axios.get(url + '/vehicles').then(res => {
                this.vehicles = res.data
            })
            .catch(showError)
        },
        saveEntity() {
            axios.post(url + '/vehicle', this.vehicle).then(res => {
                this.resetEntity()
                this.colapsePanel()
                this.loadEntity()
            })
            .catch(showError)
        },
        editEntity(row) {
            this.vehicle = row
            this.colapsePanel()
        },
        newEntity() {
            this.resetEntity()
            this.colapsePanel()
        },
        cancelEdition() {
           this.colapsePanel()
           this.loadEntity()
        },
        resetEntity() {
            this.vehicle.id = null,
            this.vehicle.placa = null,
            this.vehicle.tara = null,
            this.vehicle.capkg = null,
            this.vehicle.tipoRodado = null,
            this.vehicle.tipoCarroceria = null
        },
        colapsePanel() {
            this.isForm = !this.isForm
        }
    },
    mounted() {
        this.loadEntity()
    }
}
</script>

<style>

</style>