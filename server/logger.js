const PrettyStream = require('bunyan-prettystream');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

/**
 * @namespace
 * @property trace
 * @property debug
 * @property info
 * @property warning
 * @property error
 * @property fatal
 * @property child
 * @property level
 */
const logger = require('bunyan').createLogger({
    name: 'film',
    streams: [{
        type: 'raw',
        stream: prettyStdOut
    }]
});

module.exports = logger;