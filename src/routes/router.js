const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const signupRoute = require('./users/signup');


const router = {
    '/products': productsRoute,
    '/signup': signupRoute,
    '/main': mainRoute,
    default: mainRoute
};


module.exports = router;