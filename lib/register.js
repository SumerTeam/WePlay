/**
 * Created by liusifei on 15/5/5.
 */

exports.register = function (req, callback) {
    var loginName = req.param('loginName');
    var passWord = req.param('passWord');
    var sex = req.param('sex');
    var nickName = req.param('nickName');
    callback({code: 0});
}