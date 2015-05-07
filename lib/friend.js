/**
 * Created by liusifei on 15/5/6.
 */
var model = require('../modules/connect');
var friendProvide = model.friend;
var userProvide = model.user;

exports.addFriend = function (req, callbcak) {
    var nickName = req.param('nickName');
    var friendName = req.param('friendName');
    var friendSex = req.param('friendSex');
    if (nickName == null || nickName == undefined) {
        callbcak({code: 4000, message: "参数不对！"});
        return;
    }
    userProvide.findOne({nickName: nickName}, {}, function (err, userInfo) {
        if (err) {
            callback({code: 5000, message: "db is err!"});
        } else {
            if (userInfo == null) {
                callbcak({code: 4100, message: "用户不存在"});
            } else {
                friendProvide.update({nickName: nickName}, {
                    "$set": {
                        "friends.$.nickName": friendName,
                        "friends.$.sex": friendSex
                    }
                }, function (err, result) {
                    if (err) {
                        callback({code: 5000, message: "db is err!"});
                    } else {
                        console.log("result=>", result);
                        callbcak({code: 0});
                    }
                });
            }
        }
    });
};