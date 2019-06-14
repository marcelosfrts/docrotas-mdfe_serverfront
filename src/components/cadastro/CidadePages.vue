<template>
    <div class="cidade-pages">
        <PageTitle icon="fa fa-cogs" main="Cidades" sub="Pesquisa"/>
        <div class="cidade-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Cidades" active>
                        <Cidade/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Cidade from './Cidade'

export default {
    name: 'CidadePages',
    components: { PageTitle, Cidade }
}
</script>

<style>

</style>
