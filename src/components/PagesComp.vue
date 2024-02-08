<script>
export default {
    name: 'PagesComp',
};
</script>
<template>
    <v-container fluid class="fill cont pa-5 ma-5">
        <v-row class="row">
            <v-col cols="auto" class="ma-3 pa-3">
            <slot></slot>
            <!-- <v-col cols="2">
            </v-col> -->
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
.catalog {
    /* display: grid; */
    /* row-gap: 1rem; */
    /* margin: 0 auto; */
}

.row {
    gap: 1rem;
}


@media print {
    .row {
        gap: 0;
        margin: 0!important;
    }

    .cont {
        padding: 0 !important;
        margin: 0 !important;
    }

    /* Page size: */
    @page {
        /* padding: auto; */
        size: 500px auto;
    }

}

/* .row {
    gap: 1rem;
} */
</style>