<template>
    <CategoryIndex :category="category" :products="products" />
    <ProductComp v-for="product in products" :key="product.productId" :product="product"/>
</template>
<script>
import CategoryIndex from './CategoryIndex.vue';
import ProductComp from './ProductComp.vue';

export default {
    name: 'CategoryComp',
    components: {
    CategoryIndex,
    ProductComp
},
    data() {
        return {
            defaultImage: 'https://via.placeholder.com/150',
        }
    
    },
    props: {
        category: {
            type: String,
            required: true
        },
        products: {
            type: Array,
            required: true
        }
    },
}
</script>