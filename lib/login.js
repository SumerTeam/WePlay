/**
 * Created by liusifei on 15/5/5.
 */
var mongoose = require('mongoose');
var ObjectID = mongoose.mongo.ObjectID;
var model = require('../modules/connect');
var userProvide = model.user;

exports.login = function (req, callback) {
    var loginName = req.param('loginName');
    var passWord = req.param('passWord');
    var tokenSaveTime = req.param('tokenSaveTime');
    if (loginName == null || loginName == undefined || loginName == '') {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    if (passWord == null || passWord == undefined || passWord == '') {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    if (tokenSaveTime == null || tokenSaveTime == undefined || tokenSaveTime == '') {
        tokenSaveTime = 1;
    }
    if (typeof tokenSaveTime !== 'number') {
        tokenSaveTime = parseInt(tokenSaveTime);
    }
    userProvide.findOne({loginName: loginName}, {}, function (err, userInfo) {
        if (err) {
            callback({code: 5000, message: "数据库错误！"});
        } else {
            if (userInfo == null || userInfo == undefined) {
                callback({code: 2000, message: "用户不存在！"});
                return;
            }
            if (userInfo.passWord == passWord) {
                var token = new ObjectID().toString();
                userProvide.update({loginName: loginName}, {
                    "$set": {
                        token: token,
                        updateTokenTime: new Date(),
                        timeOut: tokenSaveTime * 24 * 60 * 60 * 1000
                    }
                }, function (err, result) {
                    if (err) {
                        callback({code: 5000, message: "db is err!"});
                    } else {
                        var json = {
                            nickName: userInfo.nickName,
                            sex: userInfo.sex,
                            loginName: userInfo.loginName,
                            token: token
                        };
                        callback({code: 0, date: json});
                    }
                });
            } else {
                callback({code: 2000});
            }
        }
    });
};