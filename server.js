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


//var server = http.createServer(app);

app.get('/api/test', function(req, res) {
  res.send({
    'hi': 'true'
  });
})



app.listen(process.env.PORT || 5000);

console.log('Express app started on port %d', app.get('port'));
