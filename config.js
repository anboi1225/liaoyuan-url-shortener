/**
 * Created by Boyang on 2016/8/5.
 */

//存储配置信息
var config = {};

config.db = {};
// 短网址服务器URL（即本项目部署在Heroku上的网址）
config.webhost = 'https://liaoyuan-url-shortener.herokuapp.com/';

// MongoDB 信息
config.db.host = 'localhost';
config.db.name = 'liaoyuan_url_shortener';

module.exports = config;