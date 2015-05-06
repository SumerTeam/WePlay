/**
 * Created by liusifei on 15/5/5.
 */
var model = require('../modules/connect');
var userProvide = model.user;

exports.login = function (req, callback) {
    var loginName = req.param('loginName');
    var passWord = req.param('passWord');
    if (loginName == null || loginName == undefined || loginName == '') {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    if (passWord == null || passWord == undefined || passWord == '') {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    userProvide.findOne({loginName: loginName}, {}, function (err, userInfo) {
        if (err) {
            callback({code: 5000, message: "db is err!"});
        } else {
            if (userInfo == null || userInfo == undefined) {
                callback({code: 2000});
                return;
            }
            if (userInfo.passWord == passWord) {
                var json = {
                    nickName: userInfo.nickName,
                    sex: userInfo.sex,
                    loginName: userInfo.loginName
                };
                callback({code: 0});
            } else {
                callback({code: 2000});
            }
        }
    });
};