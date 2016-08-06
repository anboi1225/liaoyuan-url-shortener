var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
// 哈希算法
var hash = require('./hash.js');
// 导入Url model
var Url = require('./models/url');

// handles JSON bodies
app.use(bodyParser.json());
// handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// 链接数据库（mlab）
mongoose.connect('mongodb://anboi:lovelife1225@ds139725.mlab.com:39725/liaoyuan_url_shortener');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 加入路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/views')));

app.use('/api',  require('./routes/api'));

app.post('/api/shortening', function(req, res){
  var originalUrl = req.body.url;
  var shortUrl = ''; //要返回的短网址

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
        original_url: originalUrl,
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

app.get('/:path', function(req, res){
  var base62code = req.params.path;

  // check if url already exists in database
  Url.findOne({path: base62code}, function (err, doc){
    if (doc) {
      // found an entry in the DB, redirect the user to their destination
      //res.redirect(doc.original_url);
      res.send({'nu' : doc.original_url});
    } else {
      // nothing found, take 'em home
      //res.redirect(config.webhost);
      res.send({'nu' : config.webhost});
    }
  });
});

// app.get('/', function(req, res){
//   // route to serve up the homepage (index.html)
//   res.sendFile(path.join(__dirname, 'views/index.html'));
// });

var server = app.listen(process.env.PORT || 5000, function(){
  console.log('Server listening on port process.env.PORT || 5000');
});