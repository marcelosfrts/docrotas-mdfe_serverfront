<template>
    <div class="estado-pages">
        <PageTitle icon="fa fa-cogs" main="Estados" sub="Pesquisa"/>
        <div class="estado-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Estados" active>
                        <Estado/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import Estado from './Estado'

    export default {
        name: 'EstadoPages',
        components: { PageTitle, Estado }
    }
</script>

<style>

</style>