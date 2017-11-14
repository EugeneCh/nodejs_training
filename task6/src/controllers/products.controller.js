import Product from '../models/Product';

let fakeProducts = [new Product(1, 'first', 20), new Product(2, 'second', 30)];

export const Products = {
    all() {
        return fakeProducts;
    },

    getProductById(id) {
        return fakeProducts.find(product => product.id === id);
    },

    getReviewsById(id) {
        const product = this.getProductById(id);
        return product.reviews;
    },

    addNewProduct() {
        const newProduct = new Product(Math.floor(Math.random() * (100 - 10)) + 10, 'random', Math.floor(Math.random() * (1000 - 100)) + 100);
        fakeProducts.push(newProduct);
        return newProduct;
    }
};
