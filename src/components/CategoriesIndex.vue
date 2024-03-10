<script>
import PageComp from './PageComp.vue';
import IndexContainer from './IndexContainer.vue';

export default {
    name: 'CategoryesIndex',
    components: {
        PageComp,
        IndexContainer
    },
    props: {
        categoryes: {
            // type: Array,
            required: true
        }
    },
    methods: {
        formatCategoryNameToId(categoryName) {
            if (categoryName) {
                return categoryName.replace(/ /g, '-');
            }
        }
    }
}
</script>
<template>
    <PageComp class="index pa-2">
        <h1 id="#categories">מחלקות</h1>
        <v-divider class="pb-3" />
        <IndexContainer>
            <a :href="`#${formatCategoryNameToId(category)}`" v-for="category in categoryes" :key="category">
                <v-chip size="default" variant="elevated" color="green" class="chip-overflow">
                    {{ category }}
                </v-chip>
            </a>
        </IndexContainer>
    </PageComp>
</template>
<style>
</style>
