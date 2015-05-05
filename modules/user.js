/**
 * Created by liusifei on 15/5/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    loginName: {type: String, required: true},
    passWord: {type: String, required: true},
    sex: {type: String, default: '0'},
    nickName: {type: String, default: ''},
    createTime: {type: Date, default: Date.now()}
});

mongoose.model('user', userSchema);

