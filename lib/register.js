/**
 * Created by liusifei on 15/5/5.
 */
var mongoose = require('mongoose');
var model = require('../modules/connect');
var user = model.user;

exports.register = function (req, callback) {
    var loginName = req.param('loginName');
    var passWord = req.param('passWord');
    var sex = req.param('sex');
    var nickName = req.param('nickName');
    if (loginName == null || loginName == undefined || loginName == '') {
        callback({code: 4000, message: "参数不对！"});
        console.log("err1");
    }
    if (passWord == null || passWord == undefined || passWord == '') {
        callback({code: 4000, message: "参数不对！"});
        console.log("err2");
    }
    var json = {
        loginName: loginName,
        passWord: passWord,
        sex: sex,
        nickName: nickName,
        createTime: Date()
    }
    user.insert(json, {}, function (err, result) {
        if (err) {
            callback({code: 5000, message: "db is err!"});
        } else {
            console.log("insert result is ", result);
            callback({code: 0});
        }
    })
};