/**
 * Created by liusifei on 15/5/5.
 */

exports.action = function (req, res) {
    try {
        var command = req.param('command');
        console.log("command=>", command);
        console.log("this[command]", this[command]);
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
var register = require('../lib/register').register;

//登录
var login = require('../lib/login').login;