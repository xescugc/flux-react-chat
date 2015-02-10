var express = require('express');
var gzippo = require('gzippo');
var morgan  = require('morgan');

var app = express();

app.set('port', process.env.PORT || 5000);
app.use(morgan('tiny'));
app.use(gzippo.staticGzip('' + __dirname));
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


var router = express.Router();


router.route('/conversations')
  .get(function(req, res, next) {
  })
  .post(function(req, req, next) {
  })

router.route('/conversations/:id')
  .get(function(req, res, next) {
  })
  .put(function(req, res, next) {
  })
  .delete(function(req, req, next) {
  })

router.route('/conversations/:conversation_id/messages')
  .get(function(req, res, next) {
  })
  .post(function(req, req, next) {
  })

app.use('/api', router);

app.get('/_routes', function(req, res, next) {
  res.send(router.stack);
});

app.listen(process.env.PORT || 5000);

console.log('Express app started on port %d', app.get('port'));
