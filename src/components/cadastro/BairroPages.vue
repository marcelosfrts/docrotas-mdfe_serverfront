<template>
    <div class="bairro-pages">
        <PageTitle icon="fa fa-cogs" main="Bairros" sub="Pesquisa"/>
        <div class="bairro-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Bairros" active>
                        <Bairro/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>

    import PageTitle from '../template/PageTitle'
    import Bairro from './Bairro'

    export default {
        name: 'BairroPages',
        components: { PageTitle, Bairro }
    }
</script>

<style>

</style>
