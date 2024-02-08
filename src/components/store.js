import { reactive } from 'vue'


export const store = reactive({
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