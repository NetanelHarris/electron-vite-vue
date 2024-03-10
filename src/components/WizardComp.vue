<template>
    <v-stepper v-model="step" alt-labels hide-actions :items="items">
        <!-- <template v-slot:default="{ prev, next }">
            <v-stepper-actions disabled="next" @click:prev="prev" @click:next="next"></v-stepper-actions>
        </template> -->
        <template v-slot:item.1>
            <v-file-input v-model="data.catalog.dataFile" label="בחר קובץ נתונים" @change="readFile" accept=".csv, .xlsx">
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
            <v-btn :disabled="!fileLoaded" @click="step++" rounded="xl" color="green-darken-3" class="float-end">הבא</v-btn>
            <!-- <v-stepper-actions :disabled="!fileLoaded" @click:next="step++" prev="fals" next-text="הבא" prev-text=""></v-stepper-actions> -->
        </template>
        <template v-slot:item.2>
            <v-select class="mt-2" variant="outlined" v-model="data.catalog.fieldsMapData.sku" label='מק"ט'
                :items="data.catalog.fields"></v-select>
            <v-select variant="outlined" label='שם מוצר' v-model="data.catalog.fieldsMapData.name"
                :items="data.catalog.fields"></v-select>
            <v-select variant="outlined" label='קטגוריה' v-model="data.catalog.fieldsMapData.category"
                :items="data.catalog.fields"></v-select>
            <v-select variant="outlined" label='מינימום להזמנה' v-model="data.catalog.fieldsMapData.minOfOrder"
                :items="data.catalog.fields"></v-select>
            <v-stepper-actions :disabled="disableButton(!data.catalog.isDataMapped)" @click:next="mapFields(); step++;"
                next-text="הבא" prev-text="הקודם"></v-stepper-actions>
        </template>
        <template v-slot:item.3>
            <v-file-input class="mt-2" variant="outlined" webkitdirectory v-model="data.catalog.images" label="בחר תמונות" multiple accept="image/*">
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
            <v-stepper-actions :disabled="disableButton(!data.catalog.images[0])" @click:next="readFolder" next-text="הבא"
                prev-text="הקודם"></v-stepper-actions>

        </template>
        <template v-slot:item.4>
            <v-btn block size="x-large" :disabled="data.catalog.isImageLoaded || !exportButton" @click="exportCatalog"
                rounded="xl" color="success" class="mt-5 mb-1">
                צור קטלוג
                <!-- <template v-slot:loader>
                    <v-progress-circular
                        :model-value="data.catalog.compressImagesCount / (data.catalog.processedData.length / 100)"
                        size="30">
                    </v-progress-circular>
                </template> -->
            </v-btn>
            <!-- Progress -->
            <div v-if="progress !== null" class="export-progress">
                <v-list-item-title class="mt-3">
                    {{
                        [
                            'דוחס תמונות...',
                            'מייצא קטלוג...',
                            'הקובץ נשמר בהצלחה!'
                        ][progress]
                    }}
                </v-list-item-title>
                <v-progress-linear v-if="progress === 0 && !data.catalog.isImagesCompressed"
                    :model-value="data.catalog.compressImagesCount / (data.catalog.processedData.length / 100)"
                    color="success" class="mt-2">
                </v-progress-linear>
                <v-progress-linear v-else-if="progress === 1" indeterminate color="success" class="mt-2">
                </v-progress-linear>
            </div>

            <!-- <v-btn :disabled="!data.catalog.isImagesCompressed" block size="x-large" @click="savePDFToStorage" rounded="xl"
                color="green-darken-3" class="mt-5">
                שמור PDF
            </v-btn> -->
        </template>

    </v-stepper>
</template>
<script>
import { data } from './data.js'

export default {
    data() {
        return {
            data,
            step: 1,
            items: ['יבוא נתונים', 'בחירת נתונים', 'יבוא תמונות', 'יצירת הקטלוג'],
            buttons: ['הקודם', 'הבא'],
            next: false,
            exportButton: true,
            progress: null,
            compressProgress: 0
        }
    },
    computed: {
        disabled() {
            return this.e1 === 1 ? 'prev' : this.e1 === this.steps ? 'next' : undefined
        },
        fileLoaded() {
            return this.data.catalog && this.data.catalog.isLoaded ? true : false
        },

    },
    methods: {
        async readFile(event) {
            /** @type { File } */
            const file = event.target.files[0];
            await data.catalog.read(file);
            await data.catalog.addImageURLs();
            this.step++;
        },
        mapFields(event) {
            data.catalog.process();
        },
        disableButton(bul) {
            return bul ? 'next' : undefined
        },
        async readFolder() {
            await data.catalog.addImageURLs();
            Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                console.log('images loaded');
                data.catalog.isImageLoaded = true;
            });
            this.step++;
        },
        async compressImages() {
            console.log('compressing images');
            await data.catalog.addCompressedImageURLs();
            Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                data.catalog.isImagesCompressed = true;
            });
        },

        async openSaveDialog() {
            ipcRenderer.invoke('save-dialog').then((result) => {
                console.log(result);
            });
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
            const height = 1.04 * Number(getComputedStyle(document.querySelector('.product')).height.replace('px', '')) / 100;
            const width = 1.04 * Number(getComputedStyle(document.querySelector('.product')).width.replace('px', '')) / 100;
            return { height, width };
        },
        async exportCatalog() {
            // Get file path
            this.exportButton = false;
            ipcRenderer.invoke('save-dialog').then(async (respons) => {
                console.log(respons);
                if (respons === 'Canceled') {
                    console.log('File dialog canceled');
                    this.exportButton = true;
                    return;
                }
                // Compress images
                this.progress = 0;
                await data.catalog.addCompressedImageURLs();
                // Save PDF to storage after images are compressed
                Promise.all(Array.from(document.images)
                    .filter(img => !img.complete)
                    .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
                    .then(() => {
                        this.progress = 1;
                        const message = {
                            pageSizes: this.getPageSizes(),
                            path: respons
                        }
                        ipcRenderer.invoke('print', message).then((result) => {
                            this.progress = 2;
                            console.log(result);
                            this.exportButton = true;
                        });
                    }).catch((err) => {
                        console.log(err);
                        this.exportButton = true;
                    })
                    ;
            });
            // Compress images
        }
    }
}
</script>