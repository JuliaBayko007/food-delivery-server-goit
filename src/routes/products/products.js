//  const fs = require("fs");
//  const path = require("path");
//  const allProductsPath = path.join(__dirname, "../../db/products/all-products.json");
//  const productsRoute = (request, response) => {
//      response.writeHead(200, {"Content-Type": "application/json"});
//      const readStream = fs.createReadStream(allProductsPath);

//      readStream.pipe(response);
// };

//  module.exports = productsRoute;
