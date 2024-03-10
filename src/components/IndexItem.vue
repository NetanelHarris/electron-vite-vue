<script>
import { data } from './data.js'

export default {
    data() {
        return {
            data
        }
    },
    props: {
        sku: {
            type: String,
            required: true
        },
    },
    computed: {
        product() {
            let p = this.data.catalog.products.find(product => product.sku === this.sku);
            return {
                sku: p.sku,
                name: p.name,
            }
        }
    },
}
</script>
<template>
    <v-btn block size="x-large" :href="`#${product.sku}`" color="indigo-darken-3">
        {{ product.name }}
    </v-btn>
</template>