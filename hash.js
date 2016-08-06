/**
 * Created by Boyang on 2016/8/5.
 */

//利用base62编码作为一一映射的哈希算法，将原URL的id转化为唯一固定的5位数字加字母的组合({0~9, a~z, A~Z})
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