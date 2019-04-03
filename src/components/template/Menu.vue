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
                propertyNames: { 'text': 'root-menu' },
                filter: { emptyText: 'Menu não encontrado' }
            }
        }
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/menu`
            return axios.post(url).then(res => res.data)
        }
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
