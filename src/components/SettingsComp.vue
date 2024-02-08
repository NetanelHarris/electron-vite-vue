<!-- Settings form -->
<template>
    <v-card class="ma-5 pa-5">
        <!-- Open csv file of products -->
        <v-file-input v-model="file" variant="outlined" accept=".csv" label="Select CSV file" outlined dense @change="readFile"></v-file-input>
        <!-- Import images folder -->
        <!-- <v-file-input webkitdirectory v-model="images" accept="image/*" label="Select images folder" outlined dense
            @change="readFolder"></v-file-input> -->
        <v-file-input webkitdirectory color="deep-purple-accent-4" counter label="Images folder" multiple placeholder="Select your files"
            prepend-icon="mdi-paperclip" variant="outlined" :show-size="1000" @change="readFolder">
            <template v-slot:selection="{ fileNames }">
                <template v-for="(fileName, index) in fileNames" :key="fileName">
                    <v-chip v-if="index < 2" label size="small" class="me-2">
                        {{ fileName }}
                    </v-chip>

                    <span v-else-if="index === 2" class="text-overline text-grey-darken-3 mx-2">
                        +{{ store.imageFiles.length() - 2 }} File(s)
                    </span>
                </template>
            </template>
        </v-file-input>
    </v-card>
</template>
<script>
import { store } from './store';
import { csvJSON } from './loadCsvFile'

export default {
    data() {
        return {
            file: null,
            images: null,
            store,
        }
    },
    methods: {
        /**
         * Reads the content of a selected file and saves it to the cache.
         * Converts the file content from CSV format to JSON format.
         * Updates the `store.productsFile` with the converted JSON data.
         * @param {Event} event - The event object triggered by selecting a file.
         */
        readFile(event) {
            /** @type {File} */
            const file = event.target.files[0];
            console.log(event, file);
            // Get file content
            file.text().then(text => {
                console.log(text);
                // Save file to cache
                let json = csvJSON(text);
                // store.products = json;
                store.products.products = json;
            });
        },
        // console.log(text);
        // Save file to cache
        // let json = csvJSON(text);
        // store.productsFile = json;
        // console.log(json);
        readFolder(event) {
            // Upload all images from folder to server
            const files = event.target.files;
            console.log(files);
            store.imageFiles.setUrlWithId(files);
            console.log(store.imageFiles);
        },
    },
}
</script>
<style></style>