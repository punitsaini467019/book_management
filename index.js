#!/usr/bin/env node

/**
 * Module dependencies.
 */
const http  = require("http");
const app   = require("./app.js");
const port  = Number(process.env.PORT) || 3000;


/**
 * Do stuff and exit the process
 * @param {NodeJS.SignalsListener} signal
 */
function signalHandler(signal) {
    console.log(`Stopping the server 🙁 [${process.pid}]`);
    process.exit()
}
process.on('SIGINT', signalHandler)
process.on('SIGTERM', signalHandler)
process.on('SIGQUIT', signalHandler)
process.on('warning', e => console.warn(e.stack));



/**
 * Create HTTP server
 * @param {Express.Application} app
 */
const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
 
    switch (error.code) {
        case "EACCES":
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    // const addr = server.address();
    // const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`The Server [${process.pid}] started listining on port ${port} 🥳`);
}
