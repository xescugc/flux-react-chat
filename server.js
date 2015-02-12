var express = require('express');
var gzippo = require('gzippo');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer'); 


var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(morgan('tiny'));
app.use(gzippo.staticGzip('' + __dirname));
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


var router = express.Router();


router.route('/rooms')
  .get(function(req, res, next) {
  })
  .post(function(req, res, next) {
    //console.log(req.body);
    res.status(202).send(req.body);
  })

router.route('/rooms/:id')
  .get(function(req, res, next) {
  })
  .put(function(req, res, next) {
  })
  .delete(function(req, req, next) {
  })

router.route('/rooms/:room_id/messages')
  .get(function(req, res, next) {
  })
  .post(function(req, req, next) {
  })

app.use('/api', router);

app.get('/_routes', function(req, res, next) {
  res.send(router.stack);
});

var server = app.listen((process.env.PORT || 5000), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Express app listening at http://%s:%s', host, port)

})
