<script>
import PageComp from './PageComp.vue';

export default {
    name: 'CategoryIndex',
    components: {
        PageComp
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
<template>
    <PageComp class="index">
        <v-card-item>
            <h1>{{ category }}</h1>
            <ul>
                <li v-for="product in products" :key="product.productId">
                    <a :href="'#'+product.productId">{{ product.productName }}</a>
                </li>
            </ul>
        </v-card-item>
        <!-- <v-btn>
            <v-img src="@/assets/picture.png" aspect-ratio="2.5" />
        </v-btn> -->
        <!-- <v-card-item>
            <v-row>
                <v-col v-for="product in products" :key="product.productId" cols="6">
                    <v-card>
                        <v-card-item>
                            <v-img src="@/assets/picture.png" aspect-ratio="2.5" />
                            <span class="l-title">
                                {{ product.productName }}
                            </span>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-item> -->
    </PageComp>
</template>
<style>
.index {
    height: auto;
}
ul {
    column-count: 2;
}
@media print {
    /* @page {
        size: landscape;
    }     */
}

.l-title {
    font-size: 80%!important;
}
</style>