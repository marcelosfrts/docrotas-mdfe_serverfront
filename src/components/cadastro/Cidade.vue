<template>
    <div class="action-city">
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
            <div class="formCity">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-city" label="Código" label-for="id-city">
                                <b-form-input id="id-city" v-model="city.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-city" label="Ibge" label-for="ibge-city">
                                <b-form-input id="ibge-city" v-model="city.ibge" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-id-state" label="UF" label-for="id-state">
                                <b-form-select id="id-state" v-model="city.stateEntity.id" :options="states">
                                    <template slot="first">
                                        <option :value="null" disabled>-- Selecione um estado --</option>
                                    </template>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-city" label="Nome" label-for="nome-city">
                                <b-form-input id="nome-city" v-model="city.nome" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridCity">
                <b-table hover :items="cities" :fields="fields">
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
    name: 'Cidade',
    data: function() {
        return {
            isForm: false,
            city: { id: null,
                    idState: null,
                    ibge: null,
                    nome: null
                  },
            cities: [],
            states: [],
            fields: [
                { key: ' ',
                  label: null
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'ibge',
                  label: 'Cód.IBGE',
                  sortable: true
                },
                { key: 'nome',
                  label: 'Cidade',
                  sortable: true
                },
                { key: 'stateEntity.sigla',
                  label: 'Estado',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadCities() {
            const url = `${baseApiUrl}/cities`
            axios.get(url).then(res => {
                this.cities = res.data
            })
            .catch(showError)
        },
        loadStates() {
            const url = `${baseApiUrl}/allstates`
            axios.get(url).then(res => {
                this.states = res.data
            })
            .catch(showError)
        },
        saveEntity() {
            const url = `${baseApiUrl}/city`
            axios.post(url, this.city).then(res => {
                this.resetCity()
                this.colapsePanel()
                this.loadCities()
            })
            .catch(showError)
        },
        editEntity(row) {
            this.city = row
            this.colapsePanel()
        },
        newEntity() {
            this.resetEntity()
            this.colapsePanel()
        },
        cancelEdition() {
            this.colapsePanel()
            this.loadCities()
            this.loadStates()
        },
        resetCity() {
            this.city.id = null;
            this.city.idState = null;
            this.city.ibge = null;
            this.city.nome = null;
        },
        colapsePanel() {
            this.isForm = !this.isForm
        }
    },
    mounted() {
        this.loadCities()
        this.loadStates()
    }
}
</script>

<style>

</style>
