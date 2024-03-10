<template>
    <PageComp :id="product.sku" class="product" :breadcrumbsItems="breadcrumbsItems">
        <div class="gr">
            <v-icon v-if="!product.imageURL" class="image justify-center text-grey-lighten-2">
                mdi-image
            </v-icon>
            <img v-else :src="image" alt="product image" class="image">
            <h2 class="title text-red">
                {{ product.name }}
            </h2>
            <span class="subtitle">
                <div>
                    מינימום להזמנה: {{ product.minOfOrder }}
                </div>
                <div>
                    מק"ט: {{ product.sku }}
                </div>
            </span>
        </div>
    </PageComp>
</template>
<script>
import PageComp from './PageComp.vue';
import { data } from './data.js';

export default {
    name: 'ProductComp',
    components: {
        PageComp,
    },
    data() {
        return {
            defaultImage: '',
            data,
            breadcrumbsItems: [
                {
                    title: 'מחלקות',
                    disabled: false,
                    href: '#categories'
                },
                {
                    title: this.$props.product.category,
                    disabled: false,
                    // Replace spaces with dashes
                    href: `#${this.$props.product.category.replace(/ /g, '-')}`
                },
                {
                    title: this.$props.product.sku,
                    disabled: true,
                    href: `#${this.$props.product.sku}`
                },
            ],
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    computed: {
        image() {
            if (data.catalog.isImagesCompressed) {
                return this.$props.product.compressedImageURL
            } else {
                return this.$props.product.imageURL
            }
        }
    },
    mounted() {
        // console.log(this.data.catalog)
    }
};
</script>
<style>
.product {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: safe center; */
    box-sizing: border-box;
    page-break-before: always;

    > * {
        box-sizing: border-box;
        min-height: 0;
        min-width: 0;
    }

    .gr {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-rows: auto min-content min-content min-content;
        grid-template-columns: 1fr 1fr;

        .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            grid-row: 1 / 2;
            grid-column: 1 / 3;
            min-width: 0;
            min-height: 0;

            font-size: 15rem;
        }

        .title {
            font-size: 26pt;
            line-height: 1.2em;
            font-weight: bold;
            grid-row: 2;
            grid-column: 1 / 3;

        }

        .subtitle {
            font-size: 18pt;
            line-height: 1.2em;
            grid-row: 3;
            grid-column: 1 / 3;


        }

    }


}
</style>