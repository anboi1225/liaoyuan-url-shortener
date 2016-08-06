var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
// 短网址映射算法
var hash = require('./hash.js');
// 导入Url model
var Url = require('./models/url');

// 处理json, url格式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 链接数据库（使用mlab提供的MongoDB服务器服务）
mongoose.connect('mongodb://anboi:lovelife1225@ds139725.mlab.com:39725/liaoyuan_url_shortener');

//app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));

// 加入路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/views')));

app.use('/api',  require('./routes/api'));

//RESTful API
app.post('/api/shortening', function(req, res){
  var originalUrl = req.body.url;
  var shortUrl = ''; //要返回的短网址

  // 检查数据库中是否已经存在该URL的记录（避免在数据库中生成重复条目）
  Url.findOne({original_url: originalUrl}, function (err, doc){
    if (doc){
      // 如果数据库中已存储过该条URL，则直接从数据库中读取简化过的5位URL路径部分
      shortUrl = config.webhost + doc.path;
      // 返回短网址供前端Angular.js调用并显示
      res.send({'shortUrl': shortUrl});
    } else {
      // 如果数据库中不存在当前用户输入的URL，则需首先创建一条新的URL记录并存储到数据库中
      var newUrl = Url({
        original_url: originalUrl,
      });

      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
        // 根据hash算法生成短网址
        shortUrl = config.webhost + hash.encode(newUrl._id);
        // 返回短网址供前端Angular.js调用并显示
        res.send({'shortUrl': shortUrl});
      });

    }
  });

});

// 将短网址重定向到原网址
app.get('/:path', function(req, res){
  // 将短URL的5位路径部分提取出来，以便在数据库中查询原网址
  var base62code = req.params.path;

  Url.findOne({path: base62code}, function (err, doc){
    if (doc) {
      // 如果在数据库中找到相应的条目，则返回一个HTTP 301将用户重定向到原网址
      res.redirect(doc.original_url);
    } else {
      // 如果在数据库中找不到相应的条目，则返回到主页
      res.redirect(config.webhost);
    }
  });
});

// 因为项目部署在Heroku服务器上，根据Heroku提供的服务，并不支持设置固定的端口，需从Heroku上获取其实际分配的端口号
var server = app.listen(process.env.PORT || 5000, function(){
  console.log('Server listening on port process.env.PORT || 5000');
});