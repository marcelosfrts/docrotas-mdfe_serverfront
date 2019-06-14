<template>
    <div class="action-address">
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
            <div class="formAddress">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-id-address" label="Código" label-for="id-address">
                                <b-form-input id="id-address" v-model="address.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-address" label="Endereço" label-for="endereco">
                                <b-form-input id="endereco" v-model="address.endereco" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-address" label="CEP" label-for="cep">
                                <b-form-input id="cep" v-model="address.cep" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridAddress">
                <b-table hover :items="adresses" :fields="fields">
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

export default {
    name: 'Endereco',
    data: function() {
        return {
            isForm: false,
            address: { id: null,
                       endereco: null,
                       cep: null
                    },
            adresses: [],
            fields: [
                { key: ' ',
                  label: null
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'endereco',
                  label: 'Endereço',
                  sortable: true
                },
                { key: 'cep',
                  label: 'CEP',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadEntity() {
            const url = `${baseApiUrl}/adresses`
            axios.get(url).then(res => {
                this.adresses = res.data
            })
            .catch(showError)
        },
        saveEntity() {
            const url = `${baseApiUrl}/address`
            axios.post(url, this.address).then(res => {
                this.resetEntity()
                this.colapsePanel()
                this.loadEntity()
            })
            .catch(showErro)
        },
        editEntity(row) {
            this.address = row
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
            this.address.id = null
            this.address.cep = null
            this.address.endereco = null
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
