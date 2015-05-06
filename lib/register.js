/**
 * Created by liusifei on 15/5/5.
 */
var model = require('../modules/connect');
var userProvide = model.user;
var friendProvide = model.friend;

exports.register = function (req, callback) {
    var loginName = req.param('loginName');
    var passWord = req.param('passWord');
    var sex = req.param('sex');
    var nickName = req.param('nickName');
    if (loginName == null || loginName == undefined || loginName == '') {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    if (passWord == null || passWord == undefined || passWord == '') {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    var json = {
        loginName: loginName,
        passWord: passWord,
        sex: sex ? sex : "0",
        nickName: nickName ? nickName : "",
        createTime: Date.now()
    };
    var user = new userProvide(json);
    user.save(function (err, result) {
        if (err) {
            callback({code: 5000, message: "db is err!"});
        } else {
            var friendInfo = {
                nickName: loginName,
                friends: []
            };
            var friend = new friendProvide(friendInfo);
            friend.save(function (err, result) {
                if (err) {
                    callback({code: 5000, message: "db is err!"});
                } else {
                    callback({code: 0});
                }
            });
        }
    });
};