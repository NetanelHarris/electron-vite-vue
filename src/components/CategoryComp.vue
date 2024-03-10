<template>
    <div>
        <CategoryIndex :category="category" :products="data.catalog.getProductsByCategory(category)" />
        <ProductComp v-for="product in data.catalog.getProductsByCategory(category)" :key="product.sku" :product="product"/>
    </div>
</template>
<script>
import CategoryIndex from './CategoryIndex.vue';
import ProductComp from './ProductComp.vue';
import { data } from './data.js';

export default {
    name: 'CategoryComp',
    components: {
    CategoryIndex,
    ProductComp,
},
    data() {
        return {
            data,
            defaultImage: 'https://via.placeholder.com/150',
        }
    
    },
    props: {
        category: {
            type: String,
            required: true
        },
    },
    mounted() {
    }
}
</script>