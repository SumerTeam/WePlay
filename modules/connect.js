/**
 * Created by liusifei on 15/5/5.
 */
var mongoose = require('mongoose');
var passpoadDB = mongoose.createConnection('localhost');
require('./user');
exports.user = passpoadDB.model('user');