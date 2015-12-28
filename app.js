var sleep = require('sleep');
sleep.sleep(5);

var restify = require('restify'),
    status = require('./app/controllers/StatusCtrl').controller;

var server = restify.createServer({
    name: 'Team Sync',
    version: '1.0.0',
});

var url = 'localhost',
    port = 8080;

server.use(restify.gzipResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser({
    maxBodySize: 0
}));

server.on('uncaughtException', function (req, res, route, error) {
    /* jshint -W109 */
    console.error(error.toString());

    res.json(error.statusCode, {
        msg: error.message,
        stack: error.stack
    });
});

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/', function (req, res){
    res.send({'hello':'world'});
});

server.get('/status/:username/:statusDate', status.getByUserDate);
server.put('/status/:id', status.update);
server.post('/status', status.save);
server.del('/status/:id', status.delete);

server.get('/team-status/:teamName/:statusDate', status.getByTeamAndDate)

server.listen(port, function () {
  console.log(`${server.name} listening at ${url}:${port}`);
});
