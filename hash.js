/**
 * Created by Boyang on 2016/8/5.
 */

var alphabet = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var base = alphabet.length;

function encode(num){
    var encoded = '';
    while (num){
        var remainder = num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}

module.exports.encode = encode;