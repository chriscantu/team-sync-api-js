var restify = require('restify'),
    status = require('./controllers/StatusCtrl');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
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

server.get('/status/:username/:statusDate', status.getByUserDate);
server.put('/status/:username/:statusDate', status.update);
server.post('/status/:username', status.save);
server.del('/status/:id', status.delete);


server.listen(9000, function () {
  console.log('%s listening at %s', server.name, server.url);
});
