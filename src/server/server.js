const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const getRoutHandler = require('./../routes/get-rout-handler');

const morgan = require('morgan')
const router = require('../routes/router');

const logger = morgan('combined');

const keyPath = path.join(__dirname, 'key-20190317-222128.pem');
const certPath = path.join(__dirname, 'cert-20190317-222128.crt');
const sslOptions = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
}

const startServer = port => {
    const server = https.createServer(sslOptions, function(request, response) {

        const urlParsed = url.parse(request.url);

        const func = getRoutHandler(router, urlParsed.pathname) || router.default;

        logger(request, response, () => func(request, response));
    });

    server.listen(port);
};


module.exports = startServer;


