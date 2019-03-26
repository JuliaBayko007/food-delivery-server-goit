const getProducts = require('./get-products');
const createProduct = require('./create-product');

const handleProductsRoute = (request, response) => {
    const method = request.method;

    if (method === "GET") {
        getProducts(request, response);
        return
    }

    if (method === "POST") {
        createProduct(request, response)
        return
    }
}

module.exports = handleProductsRoute;