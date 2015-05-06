/**
 * Created by liusifei on 15/5/5.
 */

exports.action = function (req, res) {
    try {
        var command = req.param('command');
        if (command && this[command]) {
            this[command](req, function (response) {
                res.send(response);
            })
        } else {
            throw ({code: 9999, message: "command is not exist"});
        }
    } catch (e) {
        console.log("err is:", e);
    }
};

//注册
register = require('../lib/register').register;

//登录
login = require('../lib/login').login;

//添加好友
addFriend = require();