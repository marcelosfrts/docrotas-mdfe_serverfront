import Vue from 'vue'

export const userKey = '_auth_docrotas'
export const baseApiUrl = 'http://localhost:8180'

export function showError(e) {
    if('401'.includes(e.response.status)) {
        Vue.toasted.global.defaultError({ msg : 'Usuário e/ou senha inválidos!'})
    } else if('400'.includes(e.response.status)) {
        Vue.toasted.global.defaultError({ msg : 'Ops! Ocorreu uma falha no procedimento solicitado. ' + e.response.data})
    } else if('500'.includes(e.response.status)) {
        Vue.toasted.global.defaultError({ msg : 'Ops! Ocorreu uma falha no procedimento solicitado. ' + e.response.data})
    } else if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : 'Ops! Ocorreu uma falha no procedimento solicitado. ' + e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : 'Ops! Ocorreu uma falha no procedimento solicitado. ' + e })
    } else {
        Vue.toasted.global.defaultError({ msg : 'Ops! Ocorreu uma falha no procedimento solicitado. '})
    }
}

export default { baseApiUrl, showError, userKey }