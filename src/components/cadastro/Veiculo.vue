<template>
    <div class="action-vehicle">
        <div class="button-actions" v-if="isForm">
            <b-button variant="outline-success" size="sm" @click="saveVehicle">Save</b-button>
            <b-button variant="outline-primary" size="sm" @click="colapsePanel">Cancel</b-button>
        </div>
        <div class="button-actions" v-else>
            <b-button variant="outline-success" size="sm" @click="colapsePanel">Novo</b-button>
        </div>
        <div v-if="isForm">
            <div class="formVehicle">
                <b-form>
                    <b-form-group id="group-id-vehicle" label="Código" label-for="id-vehicle">
                        <b-form-input id="id-vehicle" v-model="vehicle.id" type="text" disabled></b-form-input>
                    </b-form-group>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="gridVehicle">
                <b-table hover :items="vehicles" :fields="fields">
                    <template slot=" " slot-scopt="row">
                        <b-button size="sm" variant="outline-primary" @click="alterVehicle()">Editar</b-button>
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
    name: 'Veiculo',
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
                }
            ]
        }
    },
    methods: {
        loadVehicles() {
            const url = `${baseApiUrl}/vehicles`
            axios.get(url).then(res => {
                this.vehicles = res.data
            })
        }
    },
    mounted() {
        this.loadVehicles()
    }
}
</script>

<style>

</style>