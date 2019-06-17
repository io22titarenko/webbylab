const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const keyEndpoint = Symbol(`server endpoint settings`)

class Server {
    constructor(listenHost, listenPort) {
        if(!listenHost || !listenPort) {
            throw new Error('Endpoint settings are incorrect or not specified');
        }

        this[keyEndpoint] = {host: listenHost, port: listenPort};
    }

    start(routers, errorHandler) {
        const ep = this[keyEndpoint];
        return startServer(ep.host, ep.port, routers, errorHandler);
    }
}
module.exports = Server;

function startServer(host, port, routers, errorHandler) {
    const app = express();
    app.disable('x-powered-by');
    app.use(morgan('dev'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next)=>{
        const allowedHeaders = ['Accept', 'Authorization', 'Content-Type', 'Server', 'ETag', 'Date', 'Link', 'Location',
            'Origin', 'If-Modified-Since', 'X-Requested-With', 'X-Result-Count'];
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': allowedHeaders.join(','),
            'Access-Control-Expose-Headers': allowedHeaders.join(',')
        })
        next()
    })
    app.use(express.static('dist'))
    routers.forEach(((router) => {
        app.use(router.prefix || '', router)
    }))
    app.use(function(err, req, res, next) {
        console.log(err.stack)
        res.status(err.code||500).json({message: err.message});

      });
    return new Promise(resolve => {
        app.listen(port, host, () => resolve({host, port}));
    });
}