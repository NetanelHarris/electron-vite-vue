<!-- Settings form -->
<template>
    <!-- Open csv file of products -->
    <v-file-input prepend-icon="mdi-format-list-bulleted" variant="outlined" accept=".csv,.xlsx,aplication/msexcel" label="נתונים" outlined dense
        @change="readFile"></v-file-input>
    <v-file-input webkitdirectory counter label="תקיית תמונות" multiple placeholder="Select your files"
        prepend-icon="mdi-image" variant="outlined" :show-size="1000" @change="readFolder">
        <template v-slot:selection="{ fileNames }">
            <template v-for="(fileName, index) in fileNames" :key="fileName">
                <v-chip v-if="index < 2" label size="small" class="me-2">
                    {{ fileName }}
                </v-chip>

                <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                    +{{ data.catalog.images.length - 2 }} קבצים
                </span>
            </template>
        </template>
    </v-file-input>
    <v-select variant="outlined" v-if="(data.catalog && data.catalog.isLoaded)" v-model="data.catalog.fieldsMapData.sku" label='מק"ט'
        :items="data.catalog.fields"></v-select>
    <v-select variant="outlined" label='שם מוצר' v-if="(data.catalog && data.catalog.isLoaded)" v-model="data.catalog.fieldsMapData.name"
        :items="data.catalog.fields"></v-select>
    <v-select variant="outlined" label='קטגוריה' v-if="(data.catalog && data.catalog.isLoaded)" v-model="data.catalog.fieldsMapData.category"
        :items="data.catalog.fields"></v-select>
    <v-select variant="outlined" label='מינימום להזמנה' v-if="(data.catalog && data.catalog.isLoaded)"
        v-model="data.catalog.fieldsMapData.minOfOrder" :items="data.catalog.fields"></v-select>
</template>
<script>
import { store } from './store';
import { csvJSON } from './loadCsvFile'
import { read } from 'xlsx';
import { getXlsxFile } from './loadXlsxFile'
import { CatalogData, data } from './data.js'

export default {
    data() {
        return {
            dataTable: null,
            images: null,
            store,
            data
        }
    },
    methods: {
        /**
         * Reads the content of a selected file and saves it to the cache.
         * Converts the file content from CSV format to JSON format.
         * Updates the `store.productsFile` with the converted JSON data.
         * @param {Event} event - The event object triggered by selecting a file.
         */
        async readFile(event) {
            /** @type {File} */
            const file = event.target.files[0];
            await data.catalog.read(file);
            await data.catalog.addImageURLs();
            // Get file content
            file.text().then(text => {
                // Save file to cache
                let json = csvJSON(text);
                // store.products = json;
                store.products.products = json;
            });
        },
        onDataTableSelected(event) {
        },
        // Save file to cache
        // let json = csvJSON(text);
        // store.productsFile = json;
        async readFolder(event) {
            // Upload all images from folder to server
            const files = event.target.files;
            data.catalog.images = files;
            await data.catalog.addImageURLs();
            store.imageFiles.setUrlWithId(files);
        },
        /**
         * @param {Event} event
         * @returns {Array<Object>} 
         */
        readXlsxFile(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = read(data, { type: 'array' });
            }
            reader.readAsArrayBuffer(file);
        },
    },
}
</script>
<style></style>