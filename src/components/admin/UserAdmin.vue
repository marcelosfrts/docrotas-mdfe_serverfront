<template>
    <div class="action-admin">
        <div class="button-actions" v-if="isForm">
            <b-button variant="outline-success" size="sm" @click="saveUser">Save</b-button>
            <b-button variant="outline-primary" size="sm" @click="colapsePanel">Cancel</b-button>
        </div>
        <div class="button-actions" v-else>
            <b-button variant="outline-success" size="sm" @click="colapsePanel">Novo</b-button>
        </div>
        <div v-if="isForm">
            <div class="formUser-admin">
                <b-form>
                    <b-form-group id="group-id-user" label="Código" label-for="id-user">
                        <b-form-input id="id-user" v-model="user.id" type="text" disabled></b-form-input>
                    </b-form-group>
                    <b-form-group id="group-id-company" label="Empresa" label-for="id-company">
                        <b-form-select id="id-company" v-model="user.idCompany" :options="companys" required>
                            <template slot="first">
                                <option :value="null" disabled>-- Selecione uma empresa --</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group id="group-name-user" label="Usuário" label-for="name-user">
                        <b-form-input id="name-user" v-model="user.user" type="text"></b-form-input>
                    </b-form-group>
                    <b-form-group id="group-pwd-user" label="Senha" label-for="pwd-user">
                        <b-form-input id="pwd-user" v-model="user.password" type="password"></b-form-input>
                    </b-form-group>
                </b-form>
            </div>
        </div>
        <div v-else>
            <div class="user-admin">
                <b-table hover :items="users" :fields="fields">
                    <template slot="detalhes" slot-scope="row">
                        <b-button size="sm" variant="outline-primary" @click="alterUser(row.item)">Editar</b-button>
                    </template>
                    <template slot="active" slot-scope="row">
                        {{ row.value ? 'Sim :)' : 'Não :(' }}
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
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            isForm: false,
            company: null,
            companys: [],
            user: { id: null,
                    idCompany: null,
                    user: null,
                    password: null,
                    active: false
                  },
            users: [],
            fields: [
                { key: 'detalhes',
                  label: 'Detalhes'
                },
                { key: 'id',
                  label: 'Código',
                  sortable: true
                },
                { key: 'active',
                  label: 'Ativo',
                  sortable: true
                },
                { key: 'user',
                  label: 'Usuário',
                  sortable: true
                },
                { key: 'idCompany',
                  label: 'Cod. Empresa',
                  sortable: true
                }
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        loadCompanys() {
            const url = `${baseApiUrl}/icompanys`
            axios.get(url).then(res => {
                this.companys = res.data
            })
        },
        saveUser() {
            const url = `${baseApiUrl}/user`
            axios.post(url, this.user).then(res => {
                this.resetUser()
                this.colapsePanel()
                this.loadUsers()
            })
            .catch(showError)
        },
        alterUser(row) {
            this.user = row
            this.colapsePanel()
        },
        resetUser() {
            this.newUser.id = null,
            this.newUser.idCompany = null,
            this.newUser.user = null,
            this.newUser.password = null,
            this.newUser.active = false
        },
        colapsePanel() {
            this.isForm = !this.isForm
        }
    },
    mounted() {
        this.loadUsers()
        this.loadCompanys()
    }
}
</script>

<style>

</style>
