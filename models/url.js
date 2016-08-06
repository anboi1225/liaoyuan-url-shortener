/**
 * Created by Boyang on 2016/8/5.
 */

// 数据库模型定义
/* 使用'node-restful'库建立可从外部query的功能，
例如: https://liaoyuan-url-shortener.herokuapp.com/api/url/6000001
可以通过浏览器返回id为:6000001的url表中的条目信息，支持POST, PUT, DELETE, GET操作
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;
var hash = require('../hash.js');

// 创建计数器表格，存储当前的id变量值
var CounterSchema = Schema({
    _id: {type: String, required: true},
    value: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// 创建URL表格，存储原URL及其对应的id和简化后的5位路径信息
var urlSchema = new Schema({
    _id: {type: Number, index: true},
    original_url: String,
    path: String,
    created_at: Date
});

// 通过 pre('save', callback) 进行新的url条目存储前的预处理
urlSchema.pre('save', function(next){
    var doc = this;
    // 首先找到计数器表格中当前的id值，将其增1作为新的url条目的id值
    counter.findByIdAndUpdate({_id: 'current_number'}, {$inc: {value: 1} }, function(error, counter) {
        if (error)
            return next(error);
        // 设置新url条目的id，路径值以及创建的时间
        doc._id = counter.value;
        doc.path = hash.encode(counter.value);
        doc.created_at = new Date();
        next();
    });
});

var Url = restful.model('Url', urlSchema);
module.exports = Url;