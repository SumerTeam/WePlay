/**
 * Created by liusifei on 15/5/8.
 */
var model = require('../modules/connect');
var userProvide = model.user;

exports.checkToken = function (req, res, next) {
    var reqUrlList = req.url.split('?')[0].split('/');
    if (reqUrlList.length == 2) {
        if (reqUrlList[1] == 'action') {
            var token = req.param('token');
            var command = req.param('command');
            if (command != 'login' && command != 'register') {
                userProvide.findOne({token: token}, {}, function (err, userInfo) {
                    if (err) {
                        res.send({code: 5000, message: "数据库错误！"});
                    } else {
                        if (userInfo == null) {
                            res.send({code: 1900, message: "无效的token"});
                        } else {
                            var nowTime = new Date();
                            if (nowTime - userInfo.updateTokenTime > userInfo.timeOut) {
                                res.send({code: 1910, message: "token已过期"});
                            } else {
                                next();
                            }
                        }
                    }
                })
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
};