<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"/>
            <input type="text" placeholder="Localizar menu..." v-model="treeFilter" class="filter-field"/>
        </div>
        <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/>
    </aside>
</template>

<script>
import { baseApiUrl } from '@/global'
import  { mapState } from 'vuex'
import Tree from 'liquor-tree'
import axios from 'axios'

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'root-menu', 'children':'sub-menu' },
                filter: { emptyText: 'Menu não encontrado' }
            }
        }
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/menu`
            return axios.post(url).then(res => res.data)
        },
        onNodeSelect(node) {
            var map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"," ":""}
            this.$router.push({
                name: node.text.toLowerCase().replace(/[\W[\] ]/g,function(a){return map[a]||a}) + 'Pages'
            })
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 121%;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.haschild {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.0rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #AA0;
        margin-left: 20px;
    }

</style>
