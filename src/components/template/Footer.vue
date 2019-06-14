<template>
    <footer class="footer">
        <span>Copyright <strong>docRotas</strong> © 2018-2019</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        position: fixed;
        left: 0;
        top: 95%;
        width: 100%;
        z-index: 200;
        height: 42px;
        grid-area: footer;
        background-color: #DDD;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        font-size: 13px;
    }

</style>
