<template>
    <div class="action-state">
        <div class="button-actions" v-if="isForm">
            <b-button variant="outline-success" size="sm" @click="saveState">Save</b-button>
            <b-button variant="outline-primary" size="sm" @click="colapsePanel">Cancel</b-button>
        </div>
        <div class="button-actions" v-else>
            <b-button variant="outline-success" size="sm" @click="colapsePanel">Novo</b-button>
        </div>
        <div v-if="isForm">
            <div class="formState">
                <b-form>
                    <b-form-group id="group-id-state" label="Código" label-for="id-state">
                        <b-form-input id="id-state" v-model="state.id" type="text" disabled></b-form-input>
                    </b-form-group>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridState">
                <b-table hover :items="states" :fields="fields">
                    <template slot=" " slot-scopt="row">
                        <b-button size="sm" variant="outline-primary" @click="alterState()">Editar</b-button>
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
            mode: 'save',
            isForm: false,
            state: null,
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
        loadStates() {
            const url = `${baseApiUrl}/states`
            axios.get(url).then(res => {
                this.states = res.data
            })
        }
    },
    mounted() {
        this.loadStates()
    }
}
</script>

<style>

</style>
