<template>
    <div class="mdfe-pages">
        <PageTitle icon="fa fa-cogs" main="MDFe" sub="Pesquisa"/>
        <div class="mdfe-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="MDFe" active>
                        <Mdfe/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>

    import PageTitle from '../template/PageTitle'
    import Mdfe from './Mdfe'

    export default {
        name: 'MdfePages',
        components: { PageTitle, Mdfe }
    }
</script>

<style>

</style>