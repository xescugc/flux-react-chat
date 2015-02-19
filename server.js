var express    = require('express');
var app        = express();
var http       = require('http').Server(app);
var gzippo     = require('gzippo');
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var multer     = require('multer');
var mongoose   = require('mongoose');
var Room       = require('./models/room');
var Message    = require('./models/message');
var io         = require('socket.io')(http);
var md5        = require('blueimp-md5').md5;

mongoose.connect('mongodb://localhost/flux-react-chat');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(morgan('tiny'));
app.use(gzippo.staticGzip('' + __dirname));
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

var createUser = function(user) {
  var userName, userEmail, userImage;
  var date = Date.now();
  if (user.name) {
    userName = user.name;
  } else if (user.email){
    userName = user.email.split('@')[0];
  } else {
    userName = 'Guest_'+ Math.floor((Math.random() * 1000) + 1);
  }
  userEmail = user.email || userName.toLowerCase() + '@example.com';
  userImage = user.img   || 'http://www.gravatar.com/avatar/' + md5(userEmail) + '?s=64';

  var finalUser = {
    _id:    user._id   || 'u_' + date,
    name:   userName,
    email:  userEmail,
    img:    userImage
  };
  return finalUser;
};

var emitToClients = function(action) {
  io.emit(action.type, action.body);
};


var router = express.Router();

app.use(function(req, res, next) {
  setTimeout(function() {
    next();
  }, 1000);
});

router.route('/rooms')
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
      createdAt:  Date.now(),
      isCreated:  true
    });
    room.save(function(err, room, numberAffected) {
      if (err) {
        console.log('Error:', err);
      }
      emitToClients({
        name: 'createdRoom',
        body: room
      });
      res.json(room);
    });
  });

router.route('/rooms/:id')
  .get(function(req, res, next) {
  })
  .post(function(req, res, next) {
  })
  .put(function(req, res, next) {
  })
  .delete(function(req, res, next) {
  });

router.route('/rooms/:room_id/messages')
  .get(function(req, res, next) {
  })
  .post(function(req, res, next) {
    var pMessage = req.body.message;
    var message = new Message({
      text:       pMessage.text,
      roomId:     pMessage.roomId,
      date:       pMessage.date,
      author: {
        name: pMessage.author.name,
        img:  pMessage.author.img
      },
      isCreated:  true
    });
    function messageCreatedCallback (err, message, numberAffected){
      if (err) {
        console.log('Error:', err);
      }
      updateRoomLastMessage(message);
    }
    function updateRoomLastMessage(message){
      Room.update({_id: message.roomId}, {$set: {updatedAt: Date.now(), lastMessage: { author: message.author.name, text: message.text}}}, function(err, numberAffected, raw){
        if (err) {
          console.log('Error:', err);
        }
        Room.findOne({_id: message.roomId}, function(err, room){
          if (err) {
            console.log('Error:', err);
          }
          returnResult(message, room);
        });
      });
    }
    function returnResult(message, room) {
        message = message.toObject();
        message.oldId = pMessage._id;
        emitToClients({
          type: 'createdMessage',
          body: message 
        });
        emitToClients({
          type: 'updatedRoom',
          body: room 
        });
        res.json(message);
    }
    message.save(messageCreatedCallback);
  });

  router.route('/messages')
  .get(function(req, res, next) {
    Message.find({}, null, function(err, messages) {
      if (err) {
        console.log('Error:', err);
      }
      res.json(messages);
    });
  });
router.route('/user')
  .get(function(req, res, next) {
    var user = createUser({});
    res.json(user);
  })
  .post(function(req, res, next) {
    var user = createUser(req.body.user);
    res.json(user);
  });
app.use('/api', router);

app.get('/_routes', function(req, res, next) {
  res.send(router.stack);
});

//io.on('connection', function(socket) {
//});

var server = http.listen((process.env.PORT || 5000), function () {

  var host = server.address().addressr;
  var port = server.address().port;

  console.log('Express app listening at http://%s:%s', host, port);

});
