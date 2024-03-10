import { reactive } from 'vue'

// Remove \r for a string
function stripReverse(str) {
    return str.replace(/\r/g, '');
}

function convertToWebp(image) {
    // Convert the image to webp
    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
            // Now we have a `blob` containing webp data
            // Use the file rename trick to turn it back into a file
            const myImage = new File([blob], 'my-new-name.webp', { type: blob.type });
        }, 'image/webp');
    };
    return URL.createObjectURL(image);
}


function csvJSON(csv) {

    let lines = csv.split("\n");
    let result = [];
    let headers = stripReverse(lines[0]).split(",");
    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = stripReverse(lines[i]).split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JavaScript object
}

class Product {
    constructor(productData) {
        /**
         * The data of the product.
         * @type {Object<string, string>}
         */
        this.rowData = productData;
    }
    /**
     * The SKU of the product.
     * @type {string | null}
     */
    sku = null;
    /**
     * The name of the product.
     * @type {string | null}
     */
    name = null;
    /**
     * The category of the product.
     * @type {string | null}
     */
    category = null;
    /**
     * The minimum order of the product.
     * @type {string | null}
     */
    minOrder = null;
    /**
     * The data map of the product.
     * @type {Object<string, string>}
     */
    dataIsMaped = false;
    mapData(dataMap) {
        for (let key in dataMap) {
            // If the key not in this object, raise an error
            if (this.hasOwnProperty(key)) {
                this[key] = this.rowData[dataMap[key]];
            } else {
                throw new Error(`Key ${key} not in this object.`);
            }
        }
        this.dataIsMaped = true;
    }
}

class Category {
    constructor(categoryName, products) {
        this.name = categoryName;
        this.products = products;
    }
}

class Categories {
    categories = [];
    /**
     * 
     * @param {Category} category 
     */
    addProduct(mapedProduct) {
        let category = this.categories.find(category => category.name === mapedProduct.category);
        if (category) {
            category.products.push(mapedProduct);
        } else {
            this.categories.push(new Category(mapedProduct.category, [mapedProduct]));
        }
    }
    get getCategoriesAsObject() {
        let categories = {};
        this.categories.forEach(category => {
            categories[category.name] = category.products;
        });
        return categories;
    }
    get categoriesNames() {
        return this.categories.map(category => category.name);
    }
}

export class Catalog {
    // constructor(productsData) {
    //     this.rowProducts = [];
    //     for (let productData of productsData) {
    //         this.rowProducts.push(new Product(productData));
    //     }
    // }
    rowProducts = [];
    images = [];
    dataIsMaped = false;
    mapData(dataMap) {
        for (let product of this.rowProducts) {
            product.mapData(dataMap);
        }
        this.categories = new Categories();
        for (let product of this.rowProducts) {
            if (product.dataIsMaped) {
                this.categories.addProduct(product);
            } else {
                throw new Error('Data not maped');
            }
        }
        this.dataIsMaped = true;
    }
    getProductBySku(sku) {
        return this.rowProducts.find(product => product.sku === sku);
    }
    /**
     * 
     * @param {File[]} files 
     */
    importImages(files) {
        for (let file of files) {
            const imageName = file.name.split('.')[0];
            let product = this.getProductBySku(imageName);
            if (product) {
                product.image = URL.createObjectURL(file);
            }
        }
    }
    // getCategories() {
    //     return this.categories.getCategoriesAsObject;
    // }
    get categoriesNames() {
        return this.categories.categoriesNames;
    }
    /**
     * 
     * @param {File} csvFile 
     */
    importProducts(csvFile) {
        // import products from a csv file
        // Read the file
        let misComplete = false;
        let rowProducts = this.rowProducts;
        let jsonData = null;
        const reader = new FileReader();
        reader.readAsText(csvFile);
        reader.onload = function () {
            jsonData = csvJSON(reader.result);
            rowProducts.push(new Product(productData));
            misComplete = true;
        }
        // Wait for the file to be read
        reader.onloadend = () => {
        }
    }

}



const product = new Product({
    sku: 'ABC123',
    name: 'Ball',
    category: 'Toys',
    minOrder: 12
});


export const store = reactive({
    dataTable: null,
    images: null,
    rowProducts: [],
    catalog: new Catalog(),
    products: {
        products: [],
        getCategory: function (category) {
            return this.products.filter(product => product.category === category);
        },
        _getCategories: function () {
            let categories = {};
            this.products.forEach(product => {
                if (categories[product.category]) {
                    categories[product.category].push(product);
                } else {
                    categories[product.category] = [product];
                }
            });
            return categories;
        },
        get getCategories() {
            return this._getCategories;
        },
        set getCategories(value) {
            this._getCategories = value;
        },
        get categoriesArray() {
            return Object.keys(this._getCategories());
        }
    },
    imageFiles: {
        idUrls: {
            // 'file-name': 'file-url',
            // 'file-name': 'file-url',
        },
        /**
         * @param { String } id
         */
        getUrlWithId(id) {
            if (!id) return;
            // Id is the file name without the extension, insensitive to case
            id = id.toLowerCase();
            return this.idUrls[id];
        },
        /**
         * @param { FileList } files
         */
        setUrlWithId(files) {
            // Remove extension from file name
            for (let file of files) {
                let id = file.name.split('.')[0].toLowerCase();
                this.idUrls[id] = URL.createObjectURL(file);
            }
        },
        length() {
            return Object.keys(this.idUrls).length;
        }
    },
});