/**
 * Created by Boyang on 2016/8/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hash = require('../hash.js');

// create the counters schema with an _id field and a seq field
var CounterSchema = Schema({
    _id: {type: String, required: true},
    value: { type: Number, default: 0 }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
    _id: {type: Number, index: true},
    original_url: String,
    path: String,
    created_at: Date
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
    var doc = this;
    // find the url_count and increment it by 1
    counter.findByIdAndUpdate({_id: 'current_number'}, {$inc: {value: 1} }, function(error, counter) {
        if (error)
            return next(error);
        // set the _id of the urls collection to the incremented value of the counter
        doc._id = counter.value;
        doc.path = hash.encode(counter.value);
        doc.created_at = new Date();
        next();
    });
});

var Url = mongoose.model('Url', urlSchema);
module.exports = Url;