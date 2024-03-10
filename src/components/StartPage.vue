<template>
    <PageComp>
        <!-- <div class="white-arrow-bg" /> -->
        <div class="start-page">
            <!-- Catalog name: -->
            <ContentEditable class="title text-center text-red font-weight-light" tag="h1" contenteditable="true"
                v-model="catalogName" :no-nl="true" :no-html="true" />
            <img src="../assets/לללא רקע.png" alt="logo" class="logo" />
            <ContentEditable class="text-center" tag="h3" contenteditable="true" v-model="catalogDescription"
                :no-nl="true" :no-html="true" />
            <!-- Catalog description: -->
            <ContentEditable class="desc text-center text-grey-darken-1" tag="h2" contenteditable="true"
                v-model="catalogDate" :no-nl="true" />
        </div>
    </PageComp>
</template>
<script>
import PageComp from './PageComp.vue';
import ContentEditable from './ContentEditable.vue';

export default {
    name: 'StartPage',
    components: {
        PageComp,
        ContentEditable
    },
    data() {
        return {
            isEditable: true,
            catalogName: 'קטלוג משחקים',
            // Example: יוני 2021
            catalogDescription: `${new Date().toLocaleDateString('he-IL', { month: 'long' })} ${new Date().getFullYear()}`,
            catalogDate: `תאריך עדכון: ${new Date().toLocaleDateString()}`
        };
    }
}



</script>
<style>
.white-arrow-bg {
    /* top: 0px; */
    /* left: 0px; */
    width: 336px;
    height: 128px;
    background: transparent url('src/assets/white arrow bg.svg') 0% 0% no-repeat padding-box;
    opacity: 1;
    position: absolute;
    /* z-index: -1; */
}

.start-page {
    /* background-color: #2C4295; */

    display: grid !important;
    grid-template-rows: auto min-content auto min-content;
    align-items: center;
    grid-auto-flow: dense;
    height: 100%;
    width: 100%;

    .title {
        font-size: 3rem;
        font-weight: 800 !important;
        /* grid-row: 1 / 2; */
    }

    .desc {
        font-size: 1rem;
        /* grid-row: 2 / 3; */
    }

    .logo {
        width: 300px;
        height: auto;
        /* align to center: */
        justify-self: center;
        /* Drop shadow: */
        filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.5));
    }
}
</style>