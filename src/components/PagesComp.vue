<script>
export default {
    name: 'PagesComp',
    data: () => ({
        overlay: false,
    }),
    methods: {
        loading() {
            this.overlay = false;
        },
    },
    mounted() {
        // this.overlay = true;
        const observer = new MutationObserver(
            (mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        this.overlay = true;
                        Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                            this.overlay = false;
                        });
                    }
                });
            }
        );
        observer.observe(document.querySelector('#pages-list'), {
            subtree: true,
            childList: true,
            characterData: true
        });
    }
};
</script>
<template>
    <v-container class="cont pa-5 ma-5">
        <v-row class="row justify-center">
            <v-col id="pages-list" cols="auto" class="ma-3 pa-3">
                <slot></slot>
            </v-col>
        </v-row>
        <!-- Loading Spinner -->
        <v-overlay contained :model-value="overlay" class="align-center justify-center">
            <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>
<style>
.row {
    gap: 1rem;
}

.cont {
    min-height: 0;

}

.v-chip {
    max-width: 300px !important;
}


@media print {
    .row {
        gap: 0;
        margin: 0 !important;
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
</style>