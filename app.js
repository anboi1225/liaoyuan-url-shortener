// require and instantiate express
var express = require('express');
var app = express();
// we'll need the path module to correctly concatenate our paths
var path = require('path');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  // route to serve up the homepage (index.html)
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var server = app.listen(process.env.PORT || 5000, function(){
  console.log('Server listening on port process.env.PORT || 5000');
});
