<template>
    <div class="action-city">
        <div class="button-actions" v-if="isForm">
            <b-button variant="outline-success" size="sm" @click="saveCity">Save</b-button>
            <b-button variant="outline-primary" size="sm" @click="colapsePanel">Cancel</b-button>
        </div>
        <div class="button-actions" v-else>
            <b-button variant="outline-success" size="sm" @click="colapsePanel">Novo</b-button>
        </div>
        <div v-if="isForm">
            <div class="formCity">
                <b-form>
                    <b-form-group id="group-id-city" label="Código" label-for="id-city">
                        <b-form-input id="id-city" v-model="city.id" type="text" disabled></b-form-input>
                    </b-form-group>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridCity">
                <b-table hover :items="cities" :fields="fields">
                    <template slot=" " slot-scopt="row">
                        <b-button size="sm" variant="outline-primary" @click="alterCity()">Editar</b-button>
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
            mode: 'save',
            isForm: false,
            city: null,
            cities: [],
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
        }
    },
    mounted() {
        this.loadCities()
    }
}
</script>

<style>

</style>
