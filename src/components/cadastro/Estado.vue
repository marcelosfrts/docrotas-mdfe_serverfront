<template>
    <div class="action-state">
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
            <div class="formState">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-id-state" label="Código" label-for="id-state">
                                <b-form-input id="id-state" v-model="state.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-ibge" label="Cód. IBGE" label-for="ibge">
                                <b-form-input id="ibge" v-model="state.ibge" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-sigla" label="Sigla" label-for="sigla">
                                <b-form-input id="sigla" v-model="state.sigla" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-nome" label="Nome" label-for="nome">
                                <b-form-input id="nome" v-model="state.nome" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridState">
                <b-table hover :items="states" :fields="fields">
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
    name: 'Estado',
    data: function() {
        return {
            isForm: false,
            state: { id: null,
                     ibge: null,
                     nome: null,
                     sigla: null
                   },
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
                { key: 'sigla',
                  label: 'Sigla',
                  sortable: true
                },
                { key: 'nome',
                  label: 'Estado',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadEntity() {
            const url = `${baseApiUrl}/states`
            axios.get(url).then(res => {
                this.states = res.data
            })
            .catch(showError)
        },
        saveEntity() {
            const url = `${baseApiUrl}/state`
            axios.post(url, this.state).then(res => {
                this.resetEntity()
                this.colapsePanel()
                this.loadEntity()
            })
            .catch(showError)
        },
        editEntity(row) {
            this.state = row
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
            this.state.id = null
            this.state.ibge = null
            this.state.sigla = null
            this.state.nome = null
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
