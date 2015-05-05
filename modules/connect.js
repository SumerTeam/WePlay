/**
 * Created by liusifei on 15/5/5.
 */
var mongoose = require('mongoose');
var passpoadDB = mongoose.createConnection('mongodb://localhost/user');
require('./user');
exports.user = passpoadDB.model('user');