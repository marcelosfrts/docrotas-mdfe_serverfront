<template>
    <div class="pessoa-pages">
        <PageTitle icon="fa fa-cogs" main="Pessoa" sub="Pesquisa"/>
        <div class="pessoa-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Pessoa" active>
                        <Pessoa/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Pessoa from './Pessoa'

export default {
    name: 'PessoaPages',
    components: { PageTitle, Pessoa }
}
</script>

<style>

</style>
