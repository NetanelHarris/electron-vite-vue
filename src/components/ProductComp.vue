<template>
    <PageComp :id="product.productId" class="product" >
        <v-card-item >
            <v-img v-if="image === undefined" max-height="200px" src="@/assets/picture.png" alt="product image" class="pa-2 image"></v-img>
            <v-img v-else :src="image" alt="product image" max-height="200px" class="pa-2 image"></v-img>
            <!-- <img v-if="image === undefined" src="@/assets/picture.png" alt="product image" class="pa-2 image">
            <img v-else :src="image" alt="product image" class="pa-2 image"> -->
            <!-- <v-img v-once src="@/assets/picture.png" max-height="200px" class="pa-2 image"></v-img> -->
            <v-card-title class="title">
                {{ product.productName }}
            </v-card-title>
            <v-card-subtitle class="subtitle">
                מינימום להזמנה: {{ product.unitInPack }}<br />
                מק"ט: {{ product.productId }}
            </v-card-subtitle>
        </v-card-item>
    </PageComp>
</template>
<style></style>
<script>
import PageComp from './PageComp.vue';
import { store } from './store';

export default {
    name: 'ProductComp',
    components: {
        PageComp,
    },
    data() {
        return {
            defaultImage: '',
            image: undefined,
            store
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.image = this.store.imageFiles.getUrlWithId(this.product.productId);
    },
};
</script>
<style>
/* .page {
    display: grid;
    row-gap: 0rem;
    justify-items: center;
    align-content: stretch;

}

img {
    width: 100%;
    height: auto;
} */
.image {
    display: flex;
    position: relative;
    width: auto;
    height: auto;
    max-height: 200px;
    margin-left: auto;
    margin-right: auto;
}
.product {
    z-index: 3;
}
</style>