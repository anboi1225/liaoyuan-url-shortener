/**
 * Created by Boyang on 2016/8/5.
 */

var config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + base58 ID
// i.e.: http://localhost:3000/3Ys
config.webhost = 'http://localhost:3000/';

// your MongoDB host and database name
config.db.host = 'localhost';
config.db.name = 'liaoyuan-url-shortener';

module.exports = config;