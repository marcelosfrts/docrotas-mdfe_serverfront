<template>
    <div class="action-neighborhood">
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
            <div class="formNeighborhood">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-id-neighborhood" label="Código" label-for="id-neighborhood">
                                <b-form-input id="id-neighborhood" v-model="neighborhood.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-nome" label="Nome" label-for="nome">
                                <b-form-input id="nome" v-model="neighborhood.nome" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridNeighborhood">
                <b-table hover :items="neighborhoods" :fields="fields">
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
    name: 'Bairro',
    data: function() {
        return {
            isForm: false,
            neighborhood: { id: null, nome: null},
            neighborhoods: [],
            fields: [
                { key: ' ',
                  label: null
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'nome',
                  label: 'Bairro',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadEntity() {
            const url = `${baseApiUrl}/neighborhoods`
            axios.get(url).then(res => {
                this.neighborhoods = res.data
            })
            .catch(showError)
        },
        saveEntity() {
            const url = `${baseApiUrl}/neighborhood`
            axios.post(url, this.neighborhood).then(res => {
                this.resetEntity()
                this.colapsePanel()
                this.loadEntity()
            })
            .catch(showError)
        },
        editEntity(row) {
            this.neighborhood = row
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
            this.neighborhood.id = null
            this.neighborhood.nome = null
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
