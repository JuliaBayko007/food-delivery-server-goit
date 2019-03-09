const http = require('http');
const url = require('url');

const morgan = require('morgan')
const router = require('../routes/router');

const logger = morgan('combined');

const startServer = port => {
    const server = http.createServer(function(request, response) {

        const urlParsed = url.parse(request.url);

        const func = router[urlParsed.pathname] || router.default;

        logger(request, response, () => func(request, response));
    });

    server.listen(port);
};


module.exports = startServer;


