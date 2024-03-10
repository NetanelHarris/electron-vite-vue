// @ts-check
import { reactive } from 'vue'
import Compressor from 'compressorjs';
import * as XLSX from 'xlsx';
import { th } from 'vuetify/lib/locale/index.mjs';

// Utils
/**
 * Removes carriage return characters from a string.
 * @param {string} str - The input string.
 * @returns {string} - The string with carriage return characters removed.
 */
function stripReverse(str) {
    return str.replace(/\r/g, '');
}

// XLSX File reader
/**
 * Reads an XLSX file and returns its content as JSON.
 * @param {File} file - The XLSX file to read.
 * @returns {Promise<Object<string, string>[]>} - A promise that resolves to an array of objects representing the content of the XLSX file.
 */
async function readXLSX(file) {
    let buffer = await file.arrayBuffer();
    let workbook = XLSX.read(buffer, { type: 'array' });
    let sheet = workbook.Sheets[workbook.SheetNames[0]];
    let json = XLSX.utils.sheet_to_json(sheet);
    return json;
}

class FildsMapData {
    sku = null;
    name = null;
    category = null;
    minOfOrder = null;
    get isDataMapped() {
        return !Object.values(this).includes(null);
    }
    // set getter for FieldsMapData, if 
}
/**
 * @typedef {Object} CatalogFields
 * @property {string} sku - The SKU field name.
 * @property {string} name - The name field name.
 * @property {string} category - The category field name.
 * @property {string} minOfOrder - The minimum order field name.
 * @property {?File|Blob} imageFile - The image file.
 * @property {?string} imageURL - The URL of the image file.
 * @property {?File|Blob} compressedImageFile - The compressed image file.
 * @property {?string} compressedImageURL - The URL of the compressed image file.
 */



/**
 * Represents the catalog data.
 */
export class CatalogData {
    /**
     * Creates a new CatalogData object.
     */
    constructor() {
        this.isLoaded = false;
        this.isProcessed = false;
        /**
         * @type {Object.<string, string>[]}
         */
        this.data;
        /**
         * @type {CatalogFields}
         */
        this.fieldsMapData = {
            sku: '',
            name: '',
            category: '',
            minOfOrder: '',
            imageFile: null,
            imageURL: null,
            compressedImageFile: null,
            compressedImageURL: null,
        }
        this.isImageLoaded = false;
        this.compressImagesCount = 0;
        this.isImagesCompressed = false;
        this.dataFile = null;
        /**
         * @type {File[]}
         */
        this.images = [];
        /**
         * @type {CatalogFields[]}
         */
        this.processedData = [];
    }

    /**
     * Reads the data from a file.
     * @param {File} file - The file to read.
     */
    async read(file) {
        // if file is xlsx file then read it with xlsx
        if (file.name.split(".")[1] === "xlsx") {
            this.data = await readXLSX(file);
            this.isLoaded = true;
            return;
        }
        if (this.isLoaded) { return; }
        this.data = await file.text().then(text => {
            let lines = text.split("\n");
            let headers = stripReverse(lines[0]).split(",");
            /**
             * @type {{}[] | PromiseLike<{}[]>}
             */
            let _data = []
            for (let i = 1; i < lines.length; i++) {
                /**
                 * @type {Object<string, string>}
                 */
                let obj = {};
                let currentline = stripReverse(lines[i]).split(",");
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                    if (_data.includes(obj)) { continue; }
                    _data.push(obj);
                }
            }
            return _data;
        });
        this.isLoaded = true;
    }

    /**
     * Gets the fields of the products.
     * @returns {string[]} An array of field names.
     */
    get fields() {
        /**
         * @type {string[]}
         */
        let _fields = [];
        if (this.data.length > 0) {
            for (let product of this.data) {
                for (let field in product) {
                    if (!_fields.includes(field)) { // Update this.fields to fields
                        _fields.push(field); // Update this.fields to fields
                    }
                }
            }
            return _fields;
        } else {
            // Raise an error
            throw new Error("Data is not loaded");
        }
    }

    get isDataMapped() {
        return !Object.values(this.fieldsMapData).includes('');
    }

    /**
     * Processes the data.
     */
    process() {
        if (
            !Object.values(this.fieldsMapData).includes('') &&
            this.isLoaded &&
            this.fields.length > 0
        ) {
            // this.processedData = [];
            for (let product of this.data) {
                let processedProduct = {
                    sku: String(product[this.fieldsMapData.sku]),
                    name: String(product[this.fieldsMapData.name]),
                    category: String(product[this.fieldsMapData.category]),
                    minOfOrder: product[this.fieldsMapData.minOfOrder],
                    imageFile: null,
                    imageURL: null,
                    compressedImageFile: null,
                    compressedImageURL: null,
                };
                if (processedProduct.sku === 'undefined' ||
                    processedProduct.name === 'undefined' ||
                    processedProduct.category === 'undefined'
                ) {
                    console.log("Invalid product", processedProduct);
                    continue;
                }
                this.processedData.push(processedProduct);
            }
            this.isProcessed = true;
        }
    }

    /**
     * Gets the categories of the products.
     * @returns {string[]|null} An array of category names.
     */
    get categories() {
        if (this.isProcessed) {
            /**
             * @type {string[]}
             */
            let _categories = [];
            for (let product of this.processedData) {
                if (!_categories.includes(product.category)) {
                    _categories.push(product.category);
                }
            }
            return _categories;
        } else {
            return null;
        }
    }

    /**
     * Gets the products by category.
     * @param {string} category - The category name.
     * @returns {Object[]} An array of products.
     */
    getProductsByCategory(category) {
        return this.processedData.filter(product => product.category === category);
    }

    /**
     * Compresses an image file.
     * @param {File|Blob} imageFile - The image file to compress.
     * @returns {Promise<File|Blob>} A promise that resolves to the compressed image file.
     */
    async _compressImage(imageFile) {
        // Use Promise API
        return new Promise((resolve, reject) => {
            new Compressor(imageFile, {
                quality: 0.5,
                convertTypes: ['image/jpeg', 'image/png'],
                convertSize: 1000,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    console.error("Error compressing image", err)
                    reject(err);
                }
            });
        });
    }

    /**
     * Gets the URL of an image file.
     * @param {File|Blob} imageFile - The image file.
     * @returns {Promise<string>} A promise that resolves to the URL of the image file.
     */
    async _getImageUrl(imageFile) {
        return URL.createObjectURL(imageFile);
    }

    /**
     * Adds image URLs to the processed data.
     * @returns {Promise<void>} A promise that resolves when the image URLs are added.
     */
    async addImageURLs() {
        // Not using _addCprsdImageURL
        if (this.images.length < 1 || !this.isProcessed) { return; }
        for (let product of this.processedData) {
            // Check if `product.sku` is in `image.name`
            if (typeof product.sku !== 'string') { continue; }
            let imageFile = this.images.find(image => {
                let imageName = image.name.replace(/\.[^/.]+$/, "").toLowerCase();
                return imageName === product.sku.toLowerCase();
            }) || null;
            // console.log(`Product SKU: ${product.sku}`, imageFile); // Debug
            if (imageFile) {
                product.imageFile = imageFile;
                product.imageURL = await this._getImageUrl(product.imageFile);
            }
        }
    }

    /**
     * Adds compressed image URLs to the processed data.
     * @returns {Promise<void>} A promise that resolves when the compressed image URLs are added.
     */
    async addCompressedImageURLs() {
        console.log('Adding compressed image URLs');
        for (let product of this.processedData) {
            let imageFile = product.imageFile;
            if (imageFile) {
                product.compressedImageFile = await this._compressImage(imageFile);
                product.compressedImageURL = await this._getImageUrl(product.compressedImageFile);
            }
            this.compressImagesCount++;
        }
        this.isImagesCompressed = true;
    }
}

export const data = reactive({
    catalog: new CatalogData(),
});