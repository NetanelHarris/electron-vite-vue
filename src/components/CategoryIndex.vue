<script>
import PageComp from './PageComp.vue';
import IndexItem from './IndexItem.vue';
import { data } from './data';
import IndexContainer from './IndexContainer.vue';

export default {
    name: 'CategoryIndex',
    components: {
        PageComp,
        IndexItem,
        IndexContainer,

    },
    data() {
        return {
            products: data.catalog.getProductsByCategory(this.category),
            breadcrumbsItems: [
                {
                    title: 'מחלקות',
                    disabled: false,
                    href: '#categories'
                },
                {
                    title: this.$props.category,
                    disabled: true,
                    // Replace spaces with dashes
                    href: `#${this.$props.category.replace(/ /g, '-')}`
                },
            ],
        }
    },
    props: {
        category: {
            type: String,
            required: true
        },
    },
    methods: {
        formatCategoryNameToId(categoryName) {
            return categoryName.replace(/ /g, '-');
        }
    }
}
</script>
<template>
    <PageComp class="index pt-2 pi-2" :breadcrumbsItems="breadcrumbsItems">
        <h1 :id="formatCategoryNameToId(category)">{{ category }}</h1>
        <v-divider class="pb-3" />
        <IndexContainer>
            <a :href="`#${product.sku}`" v-for="product in products" :key="product.productId">
                <v-chip size="x-large" variant="elevated" color="green" class="chip-overflow">
                    {{ product.name }}
                </v-chip>
            </a>
        </IndexContainer>
    </PageComp>
</template>
<style>
.index {
    height: auto;

    .chip-group {
        align-items: center !important;
        justify-content: center !important;
    }

    .container {
        justify-content: center !important;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        gap: 4px;



    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .index-item {
        display: block;
        background-color: #ff4e4e;
        border-radius: 20px;
        padding-block: 4px;
        padding-inline: 10px;
        margin: 2px;
        text-align: center;
        line-height: 90%;
        color: white;
        max-height: 2.5em;
        /* height: auto; */
        /* max-width: 150px; */
    }
}

.chip-overflow {
    max-width: 150px;
    padding: 2px 5px;
}

.v-chip__content {
    display: inline-block !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

ul {
    column-count: 2;
    list-style: none;
    gap: 5px;
}

@media print {
    /* @page {
        size: landscape;
    }     */
}

.l-title {
    font-size: 80% !important;
}

.index .c {

    * {
        min-height: 0;
    }

    .item {
        color: #ff4e4e;
    }
}</style>