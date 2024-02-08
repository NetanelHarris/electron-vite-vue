<script>
import SettingsComp from './components/SettingsComp.vue';
import PagesComp from './components/PagesComp.vue';
import CategoryComp from './components/CategoryComp.vue';
import { store } from './components/store';
import { webContents } from 'electron';
import fs from 'fs';
import { shell } from 'electron';
// import { electron } from 'process';
// electron.pd
export default {
  name: 'App',
  components: {
    SettingsComp,
    PagesComp,
    CategoryComp,
  },
  data() {
    return {
      overlay: false,
      store,
    };
  },
  methods: {
    savePDFToStorage() {

    }
  }
}

</script>

<template >
  <div class="container">
    <div id="form">
      <SettingsComp />
    </div>
    <div id="preview">
      <PagesComp ref="catalog">
          <CategoryComp v-for="(products, category) in store.products.getCategories()" :key="category"
            :category="category" :products="products" />
          <v-overlay :opacity="1" :value="overlay">
            <v-progress-circular indeterminate size="64">
              Loading...
            </v-progress-circular>
          </v-overlay>
        </PagesComp>
    </div>
  </div>
</template>

<style>
* {
  overflow: hidden;
}
body, #app {
  /* scrollbar-color: #c5c5c5 #f5f5f5; */
}
.container {
  display: flex;
  /* position: relative; */
  /* height: 300px; */
  max-height: 100vh;
}


#form {
  height: 100vh;
  flex: 0 1 50vw;
  overflow-y: auto;
}

#preview {
  height: 100vh;
  flex: 0 1 50vw;
  overflow-y: auto;
}
</style>
