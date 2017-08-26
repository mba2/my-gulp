var StaticServer = require("static-server");

var server = new StaticServer({
    rootPath : "./dist",
    port: 3300
});

server.start(function() {
    console.log("Starting a new server on port " + server.port);
});