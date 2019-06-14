<template>
    <div class="veiculo-pages">
        <PageTitle icon="fa fa-cogs" main="Veículos" sub="Pesquisa"/>
        <div class="veiculo-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Veículos" active>
                        <Veiculo/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Veiculo from './Veiculo'

export default {
    name: 'VeiculoPages',
    components: { PageTitle, Veiculo }
}
</script>

<style>

</style>
