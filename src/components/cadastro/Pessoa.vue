<template>
    <div class="action-pessoa">
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
            <div class="formPessoa">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-id-person" label="Código" label-for="id-person">
                                <b-form-input id="id-person" v-model="person.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="4">
                            <b-form-group id="group-nome" label="Nome" label-for="nome">
                                <b-form-input id="nome" v-model="person.nome" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-cpfcnpj" label="CPF/CNPJ" label-for="cpfcnpj">
                                <b-form-input id="cpfcnpj" v-model="person.cpfCnpj" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-ie" label="Inscr. Estadual" label-for="ie">
                                <b-form-input id="ie" v-model="person.ie" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-fone" label="Fone" label-for="fone">
                                <b-form-input id="fone" v-model="person.fone" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="4">
                            <b-form-group id="group-endereco" label="Endereço" label-for="endereco">
                                <b-form-input id="endereco" v-model="person.endereco.endereco" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="1">
                            <b-form-group id="group-numero" label="Número" label-for="numero">
                                <b-form-input id="numero" v-model="person.numero" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-cep" label="CEP" label-for="cep">
                                <b-form-input id="cep" v-model="person.endereco.cep" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="3">
                            <b-form-group id="group-bairro" label="Bairro" label-for="bairro">
                                <b-form-input id="bairro" v-model="person.bairro.nome" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="4">
                            <b-form-group id="group-cidade" label="Cidade" label-for="cidade">
                                <b-form-input id="cidade" v-model="person.cidade.nome" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="1">
                            <b-form-group id="group-estado" label="Estado" label-for="estado">
                                <b-form-input id="estado" v-model="person.cidade.stateEntity.sigla" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group label="Tipo de pessoa">
                                <b-form-checkbox id="chkEmpresa" v-model="person.ehEmpresa"> Empresa</b-form-checkbox>
                                <b-form-checkbox id="chkCondutor" v-model="person.ehCondutor"> Motorista</b-form-checkbox>
                                <b-form-checkbox id="chkSeguradora" v-model="person.ehSeguradora"> Seguradora</b-form-checkbox>
                                <b-form-checkbox id="chkProprietario" v-model="person.ehProprietário"> Proprietário</b-form-checkbox>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="pessoa-admin">
                <b-table hover :items="persons" :fields="fields">
                    <template slot=" " slot-scope="row">
                        <b-button variant="outline-secondary" size="sm-3" @click="editEntity(row.item)">
                            <i class="fa fa-search"></i>
                        </b-button>
                    </template>
                    <template slot="ehEmpresa" slot-scope="row">
                        <b-form-checkbox v-model="row.value" disabled/>
                    </template>
                    <template slot="ehCondutor" slot-scope="row">
                        <b-form-checkbox v-model="row.value" disabled/>
                    </template>
                    <template slot="ehSeguradora" slot-scope="row">
                        <b-form-checkbox v-model="row.value" disabled/>
                    </template>
                    <template slot="ehProprietário" slot-scope="row">
                        <b-form-checkbox v-model="row.value" disabled/>
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
    name: 'Pessoa',
    data: function() {
        return {
            isForm: false,
            person: { id: null,
                      cpfCnpj: null,
                      ie: null,
                      ehEmpresa: false,
                      ehCondutor: false,
                      ehSeguradora: false,
                      ehProprietário: false,
                      endereco: {
                        id: null,
                        endereco: null,
                        cep: null
                      },
                      numero: null,
                      bairro: {
                        id: null,
                        nome: null
                      },
                      cidade: {
                        id: null,
                        ibge: null,
                        nome: null,
                        stateEntity: {
                            id: null,
                            ibge: null,
                            nome: null,
                            sigla: null
                        }
                      },
                      nome: null,
                      fone: null
                    },
            persons: [],
            fields: [
                { key: ' ',
                  label: null
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'cpfCnpj',
                  label: 'Cpf/Cnpj',
                  sortable: true
                },
                { key: 'nome',
                  label: 'Nome',
                  sortable: true
                },
                { key: 'ie',
                  label: 'Inscr.Estadual',
                  sortable: true
                },
                { key: 'cidade.nome',
                  label: 'Cidade',
                  sortable: true
                },
                { key: 'cidade.stateEntity.sigla',
                  label: 'UF',
                  sortable: true
                },
                { key: 'ehEmpresa',
                  label: 'Empresa',
                  sortable: true
                },
                { key: 'ehCondutor',
                  label: 'Motorista',
                  sortable: true
                },
                { key: 'ehSeguradora',
                  label: 'Seguradora',
                  sortable: true
                },
                { key: 'ehProprietário',
                  label: 'Proprietário',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadEntity() {
            axios.get(url + '/persons').then(res => {
                this.persons = res.data
            }).catch(showError)
        },
        saveEntity() {
            axios.post(url + '/person', this.person).then(res => {
                this.resetEntity()
                this.colapsePanel()
                this.loadEntity()
            }).catch(showError)
        },
        newEntity() {
            this.resetEntity()
            this.colapsePanel()
        },
        cancelEdition() {
           this.colapsePanel()
           this.loadEntity()
        },
        editEntity(row) {
            this.person = row
            this.colapsePanel()
        },
        resetEntity() {
            this.person.id = null
            this.person.cpfCnpj = null
            this.person.ie = null
            this.person.ehEmpresa = false
            this.person.ehCondutor = false
            this.person.ehSeguradora = false
            this.person.ehProprietário = false
            this.person.nome = null
            this.person.fone = null
            this.person.numero = null
            this.person.endereco.id = null
            this.person.endereco.endereco = null
            this.person.endereco.cep = null
            this.person.bairro.id = null
            this.person.bairro.nome = null
            this.person.cidade.id = null
            this.person.cidade.ibge = null
            this.person.cidade.nome = null
            this.person.cidade.stateEntity.id = null
            this.person.cidade.stateEntity.ibge = null
            this.person.cidade.stateEntity.nome = null
            this.person.cidade.stateEntity.sigla = null
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