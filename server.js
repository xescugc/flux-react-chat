var express = require('express');
var gzippo = require('gzippo');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var mongoose = require('mongoose');
var Room = require('./models/room');

mongoose.connect('mongodb://localhost/flux-react-chat');


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
  .all(function(req, res, next) {
    setTimeout(function() {
      next();
    }, 1000);
  })
  .get(function(req, res, next) {
    Room.find({}, null, function(err, rooms){
      if (err) {
        console.log('Error:', err);
      }
      res.json(rooms);
    });
  })
  .post(function(req, res, next) {
    var room = new Room({
      name:       req.body.room.name,
      isCreated:  true
    });
    room.save(function(err, room, numberAffected) {
      if (err) {
        console.log('Error:', err);
      }
      res.json(room);
    });
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
