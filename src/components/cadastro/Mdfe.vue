<template>
    <div class="action-mdfe">
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
            <div class="form">
                <b-form>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-id-mdfe" label="Código" label-for="id-mdfe">
                                <b-form-input id="id-mdfe" v-model="mdfe.id" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-nro-mdfe" label="MDF-e" label-for="nro-mdfe">
                                <b-form-input id="nro-mdfe" v-model="mdfe.numero" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group id="group-empresa" label="Empresa" label-for="empresa-mdfe">
                                <b-form-input id="empresa-mdfe" v-model="mdfe.empresa.reason" type="text" disabled></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="1">
                            <b-form-group id="group-uf-origem" label="Origem" label-for="uf-origem">
                                <b-form-input id="uf-origem" v-model="mdfe.ufColeta" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="1">
                            <b-form-group id="group-uf-destino" label="Destino" label-for="uf-destino">
                                <b-form-input id="uf-destino" v-model="mdfe.ufEntrega" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-dt-emissao" label="Inicio da Viagem" label-for="dt-emissao">
                                <b-form-input id="dt-emissao" :value="convertDate(mdfe.dtEmissao)" type="datetime"/>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-dt-emissao" label="Fim da viagem" label-for="dt-encerramento">
                                <b-form-input id="dt-encerramento" :value="convertDate(mdfe.dtEncerramento)" type="datetime"/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="2">
                            <b-form-group id="group-placa" label="Veículo" label-for="veiculo">
                                <b-form-input id="veiculo" v-model="mdfe.placa" type="text"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group id="group-condutor" label="Condutor" label-for="condutor">
                                <b-form-input id="condutor" v-model="mdfe.condutor" type="text"/>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group id="group-valor" label="Valor Carga" label-for="valor">
                                <b-form-input id="valor" v-model="mdfe.vlrCarga" type="number"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group id="group-peso" label="Peso Carga" label-for="peso">
                                <b-form-input id="peso" v-model="mdfe.qtdCarga" type="number"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">
                        <b-col sm="6">
                            <b-input-group prepend="Chave CT-e" class="mt-3">
                                <b-form-input id="chavecte" type="text"></b-form-input>
                                <b-input-group-append>
                                    <b-button variant="outline-primary"><i class="fa fa-plus"/></b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row align-h="start">

                    </b-row>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="grid">
                <b-table hover :items="mdfes" :fields="fields">
                    <template slot=" " slot-scope="row">
                        <b-button variant="outline-secondary" size="sm-3" @click="editEntity(row.item)">
                            <i class="fa fa-search"></i>
                        </b-button>
                    </template>
                    <template slot="codSituacao" slot-scope="row">
                        <div v-if="row.value == '0'"><i class="fa fa-circle" style="color:blue" aria-hidden="true"></i> EM CARREGAMENTO</div>
                        <div v-else-if="row.value == '1'"><i class="fa fa-circle" style="color:orange" aria-hidden="true"></i> REJEITADO</div>
                        <div v-else-if="row.value == '2'"><i class="fa fa-circle" style="color:green" aria-hidden="true"></i> AUTORIZADO</div>
                        <div v-else-if="row.value == '3'"><i class="fa fa-circle" style="color:black" aria-hidden="true"></i> ENCERRADO</div>
                        <div v-else-if="row.value == '4'"><i class="fa fa-circle" style="color:red" aria-hidden="true"></i> CANCELADO</div>
                        <div v-else><i class="fa fa-circle" style="color:grey" aria-hidden="true"></i> INDEFINIDO</div>
                    </template>
                    <template slot="dtEmissao" slot-scope="row">
                        {{convertDate(row.value)}}
                    </template>
                    <template slot="dtEncerramento" slot-scope="row">
                        {{convertDate(row.value)}}
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
    name: 'MDFe',
    data: function() {
        return {
            isForm: false,
            mdfe: { id: null,
                    numero: null,
                    codsituacao: null,
                    placa: null,
                    ufColeta: null,
                    ufEntrega: null,
                    dtEmissao: null,
                    dtEncerramento: null
                  },
            mdfes: [],
            fields: [
                { key: ' ',
                  label: null
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'numero',
                  label: 'Nro.MDFe',
                  sortable: true
                },
                { key: 'codSituacao',
                  label: 'Situação',
                  sortable: true
                },
                { key: 'placa',
                  label: 'Veículo',
                  sortable: true
                },
                { key: 'ufColeta',
                  label: 'Origem',
                  sortable: true
                },
                { key: 'ufEntrega',
                  label: 'Destino',
                  sortable: true
                },
                { key: 'dtEmissao',
                  label: 'Saída',
                  sortable: true
                },
                { key: 'dtEncerramento',
                  label: 'Chegada',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadEntity() {
            axios.get(url + '/mdfes').then(res => {
                this.mdfes = res.data
            }).catch(showError)
        },
        saveEntity() {
            axios.post(url + '/mdfe', this.mdfe).then(res => {
                this.resetEntity()
                this.colapsePanel()
                this.loadEntity()
            }).catch(showError)
        },
        editEntity(row) {
            this.mdfe = row
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
            this.mdfe.id = null
            this.mdfe.numero = null
            this.mdfe.codsituacao = null
            this.mdfe.placa = null
            this.mdfe.ufColeta = null
            this.mdfe.ufEntrega = null
            this.mdfe.dtEmissao = null
            this.mdfe.dtEncerramento = null
        },
        convertDate(xDate) {
            if(xDate){
                var d = new Date(xDate)
                var formattedDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours()
                var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes()
                var formattedTime = hours + ":" + minutes
                return formattedDate = formattedDate + " " + formattedTime
            }
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