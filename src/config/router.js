import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth.vue'
import Estado from '@/components/cadastro/Estado.vue'
import Cidade from '@/components/cadastro/Cidade.vue'
import Veiculo from '@/components/cadastro/Veiculo.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'adminPages',
    path:'/admin',
    component: AdminPages
},{
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'estado',
    path: '/cadastro/estado',
    component: Estado
},{
    name: 'cidade',
    path: '/cadastro/cidade',
    component: Cidade
},{
    name: 'veiculo',
    path: '/cadastro/veiculo',
    component: Veiculo
}]

export default new VueRouter({
    mode: 'history',
    routes: routes
})