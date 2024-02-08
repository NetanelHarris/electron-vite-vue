<template>
    <div class="page ma-3" dir="rtl">
        <slot></slot>
    </div>
</template>
<style>
.page {
    display: block;
    /* height: 300px; */
    height: 300px;
    width: 500px;
    /* width: 400px; */

    /* box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5); */
    /* border: 1px solid black; */
}
@media screen {
    .page {
        box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
    }
}

@media print {
    .page {
        box-shadow: none;
        /* border: 1px solid black; */
        page-break-after: always;
    }

    .v-container {
        padding: 0;
        margin: 0;
    }
}
</style>
<script>
export default {
    name: 'PageComp',
    props: {
        autoHeight: {
            type: Boolean,
            default: false,
        },
    },
};
</script>