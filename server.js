load('vertx.js');

var httpServ = vertx.createHttpServer();
var sockJsServ = vertx.createSockJSServer(httpServ);

sockJsServ.bridge({
  prefix : '/eventbus'
}, [ {} ], [ {} ]);

httpServ.requestHandler(function(req) {
  var file = 'index.html';
  if (req.path === '/') {
    req.response.sendFile(file);
  } else if (req.path === '/sockjs.js') {
    file = 'sockjs.js';
    req.response.sendFile(file);
  } else if (req.path === '/vertxbus.js') {
    file = 'vertxbus.js';
    req.response.sendFile(file);
  } else {
    console.log('request for ' + req.path + ' -> hmm... no reply!?');
  }
});

httpServ.listen(8080, 'localhost');
