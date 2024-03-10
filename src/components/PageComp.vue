<template>
    <div class="page ma-3 elevation-5">
        <div class="page-container pa-2">
            <slot></slot>
        </div>
        <v-breadcrumbs bg-color="success" class="breadcrumb justify-center" :items="breadcrumbsItems">
            <template v-slot:divider>
                <v-icon>mdi-chevron-left</v-icon>
            </template>
        </v-breadcrumbs>
    </div>
</template>
<style>
.page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 16/9 Ratio */
    height: 450px;
    width: 336px;
    /* min-height: 600px; */

    .page-container {
        height: 100%;
        width: 100%;
    }
}


.breadcrumb {
    margin: 0 !important;
    padding: 0 !important;
}

@media screen {
    .page {
        border-radius: 5px;
    }
}

@media print {
    .page.ma-3 {
        margin: 0 !important;
        box-shadow: unset !important;
        /* page-break-after: always; */
    }

    .v-container.ma-5.pa-5,
    .ma-3.pa-3 {
        padding: 0 !important;
        margin: 0 !important;
    }

    .elevation-5 {
        box-shadow: none !important;
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
        breadcrumbsItems: {
            type: Array,
            default: () => [],
        },
    },
};
</script>