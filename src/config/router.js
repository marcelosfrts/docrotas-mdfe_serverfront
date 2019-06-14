import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth.vue'
import EstadoPages from '@/components/cadastro/EstadoPages.vue'
import EnderecoPages from '@/components/cadastro/EnderecoPages.vue'
import BairroPages from '@/components/cadastro/BairroPages.vue'
import CidadePages from '@/components/cadastro/CidadePages.vue'
import VeiculoPages from '@/components/cadastro/VeiculoPages.vue'
import PessoaPages from '@/components/cadastro/PessoaPages.vue'
import MdfePages from '@/components/cadastro/MdfePages.vue'

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
    name: 'estadoPages',
    path: '/estado',
    component: EstadoPages
},{
    name: 'enderecoPages',
    path: '/endereco',
    component: EnderecoPages
},{
    name: 'bairroPages',
    path: '/bairro',
    component: BairroPages
},{
    name: 'cidadePages',
    path: '/cidade',
    component: CidadePages
},{
    name: 'veiculoPages',
    path: '/veiculo',
    component: VeiculoPages
},{
    name: 'pessoaPages',
    path: '/pessoa',
    component: PessoaPages
},{
    name: 'viagem mdf-ePages',
    path: '/viagem mdf-e',
    component: MdfePages
}]

export default new VueRouter({
    mode: 'history',
    routes: routes
})