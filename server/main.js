const Server = require('./server');
const MyRouter = require('./router');
const settings = require('./settings')
const logger = require('./logger')

const routers = [ new MyRouter() ];

const server = new Server(settings.endpoint.listenHost, settings.endpoint.listenPort);

server.start(routers)
    .then(endpoint => {
        logger.info(`Server has been successfully initialized on HOST: ${endpoint.host} and PORT: ${endpoint.port}`);
    })
    .catch((err)=> {
        logger.error(err)
    });