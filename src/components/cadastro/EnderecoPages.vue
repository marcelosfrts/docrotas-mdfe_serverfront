<template>
    <div class="endereco-pages">
        <PageTitle icon="fa fa-cogs" main="Endereco" sub="Pesquisa"/>
        <div class="endereco-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Endereços" active>
                        <Endereco/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import Endereco from './Endereco'

    export default {
        name: 'EnderecoPages',
        components: { PageTitle, Endereco }
    }
</script>

<style>

</style>