<script>
import SettingsComp from './components/SettingsComp.vue';
import PagesComp from './components/PagesComp.vue';
import CategoryComp from './components/CategoryComp.vue';
import WizardComp from './components/WizardComp.vue';
import { store, Catalog } from './components/store';
import CategoriesIndex from './components/CategoriesIndex.vue';
import StartPage from './components/StartPage.vue';
import { data } from './components/data.js';

export default {
  name: 'App',
  components: {
    SettingsComp,
    PagesComp,
    CategoryComp,
    CategoriesIndex,
    StartPage,
    WizardComp
  },
  data() {
    return {
      overlay: true,
      isEditable: true,
      data,
    };
  },
  methods: {
    createCatalog() {
      store.catalog = new Catalog();
      store.catalog.importProducts(store.dataTable[0]);
    },
    savePDFToStorage() {
      // document.querySelector('#form').remove();
      let message = {
        pageSizes: this.getPageSizes()
      }
      ipcRenderer.invoke('print', message).then((result) => {
      });
    },
    getPageSizes() {
      const height = Number(getComputedStyle(document.querySelector('.product')).height.replace('px', '')) / 100;
      const width = Number(getComputedStyle(document.querySelector('.product')).width.replace('px', '')) / 100;
      return { height, width };
    },
  },
  mounted() {
    setTimeout(() => {
      postMessage({ payload: 'removeLoading' }, '*')
    }, 500);
  }
}

</script>

<template >
  <div class="main-container">
    <div id="form">
      <v-container>
        <WizardComp />
      </v-container>
    </div>
    <v-divider vertical />
    <div id="preview" class="">
      <PagesComp ref="window">
        <StartPage />
        <CategoriesIndex id="categories" v-show="data.catalog.categories" :categoryes="data.catalog.categories" />
        <CategoryComp v-for="category in data.catalog.categories" :key="category"
          :category="category" />
      </PagesComp>
    </div>
  </div>
</template>
<style>
.main-container {
  display: flex;
  /* position: relative; */
  /* height: 300px; */
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
}

#form {
  height: 100vh;
  flex: 0 1 50vw;
  overflow-y: auto;
  max-width: 600px;
  min-width: 500px;
}

html {
  overflow-y: hidden !important;
}

#preview {
  display: flex;
  height: 100vh;
  flex: 0 1 100vw;
  overflow-y: auto;
  min-width: 0;
}

@media print {
  .catalog {
    grid-row-gap: 0;
  }

  .main-container > .v-divider,
  #form,
  #form * {
    display: none;
    position: absolute;
    height: 0;
    width: 0;
  }


  .v-row,
  .v-container,
  .main-container,
  body,
  #form,
  #app,
  #preview {
    display: initial;
    width: fit-content !important;
  }
}
</style>