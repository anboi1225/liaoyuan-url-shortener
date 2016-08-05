// require and instantiate express
var express = require('express');
var app = express();
// we'll need the path module to correctly concatenate our paths
var path = require('path');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var config = require('./config');
// base58 for encoding and decoding functions
var hash = require('./hash.js');

// grab the url model
var Url = require('./models/url');

// handles JSON bodies
app.use(bodyParser.json());
// handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect('mongodb://anboi:lovelife1225@ds139725.mlab.com:39725/liaoyuan_url_shortener');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/shortening', function(req, res){
  var originalUrl = req.body.url;
  var shortUrl = ''; // the shortened URL we will return

  // check if url already exists in database
  Url.findOne({original_url: originalUrl}, function (err, doc){
    if (doc){
      // URL has already been shortened
      shortUrl = config.webhost + hash.encode(doc._id);
      // since the document exists, we return it without creating a new entry
      res.send({'shortUrl': shortUrl});
    } else {
      // The long URL was not found in the long_url field in our urls
      // collection, so we need to create a new entry

      var newUrl = Url({
        original_url: originalUrl
      });

      // save the new link
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }

        // construct the short URL
        shortUrl = config.webhost + hash.encode(newUrl._id);

        res.send({'shortUrl': shortUrl});
      });

    }
  });

});

app.get('/', function(req, res){
  // route to serve up the homepage (index.html)
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

var server = app.listen(process.env.PORT || 5000, function(){
  console.log('Server listening on port process.env.PORT || 5000');
});
