const url = require('url');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');

const getProductId = url => {
    const lastIndex = url.lastIndexOf("/");
    let id = Number(url.slice(lastIndex + 1));
    return id;
};

console.log(1)

const getProductRouter = (request, response) => {
    console.log(__dirname);
    const allProdPath = path.join("D:/Study/food-delivery-server-goit/src/db/products/all-products.json");
    const productsFS = fs.readFileSync(allProdPath, "utf-8");
    const products = JSON.parse(productsFS);
    const parsedUrl = url.parse(request.url);
    const id = getProductId(parsedUrl.path);
    const qs = querystring.parse(parsedUrl.query);
    console.log(1);
    request.on("data", (err, data)=>{
        // if(err){ return response.writeHead(400, {"Content-Type": "json/application"})};
        const body = data;
        console.log(body)
    })
    // console.log(body)




    if (qs.category) {
        const productByCategory = products.filter(
            product => product.categories[0] === qs.category
        );

        const productByCategoryJson =
            productByCategory.length !== 0 ?
            JSON.stringify({
                status: "success",
                productByCategory: productByCategory
            }) :
            JSON.stringify({
                status: "no categories",
                products: []
            });

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(productByCategoryJson);
        response.end("1");
    } else if (qs.ids) {
        const ids = qs.ids.split(',').map(product => Number(product));
        const getProductsByIds = products.filter(product => ids.includes(product.id));
        const getProductsByIdsJSON =
            getProductsByIds.length !== 0 ?
            JSON.stringify({
                status: "success",
                products: getProductsByIds
            }) :
            JSON.stringify({
                status: "no products with that ids",
                products: []
            });

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(getProductsByIdsJSON);
        response.end("2");
    } else if (!Number.isNaN(id) && typeof id === "number") {
        const getProductById = products.find(product => product.id === id)
        const getProductByIdJSON =
            getProductById !== undefined ?
            JSON.stringify({
                status: "succsess",
                product: getProductById
            }) :
            JSON.stringify({
                status: "No product with such id",
                products: []
            })
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(getProductByIdJSON);
        response.end();
    } else {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(
            JSON.stringify({
                status: "success",
                products: products
            })
        );
        response.end();
    }
}

module.exports = getProductRouter;