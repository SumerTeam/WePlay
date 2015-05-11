/**
 * Created by liusifei on 15/5/6.
 */
var model = require('../modules/connect');
var friendProvide = model.friend;
var userProvide = model.user;

//获取好友列表
exports.getFriendList = function (req, callback) {
    var nickName = req.param("nickName");
    if (nickName == null || nickName == undefined) {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    userProvide.findOne({nickName: nickName}, {}, function (err, userInfo) {
        if (err) {
            callback({code: 5000, message: "db is err!"});
        } else {
            if (userInfo == null) {
                callback({code: 4100, message: "用户不存在"});
            } else {
                friendProvide.findOne({nickName: nickName}, {}, function (err, userFriendInfo) {
                    if (err || userFriendInfo == null || userFriendInfo == undefined) {
                        callback({code: 5000, message: "db is err!"});
                    } else {
                        callback({code: 0, friendInfo: userFriendInfo.friends});
                    }
                });
            }
        }
    })
};


//添加好友
exports.addFriend = function (req, callback) {
    var nickName = req.param('nickName');
    var friendName = req.param('friendName');
    var friendSex = req.param('friendSex');
    if (nickName == null || nickName == undefined || friendName == null || friendName == undefined) {
        callback({code: 4000, message: "参数不对！"});
        return;
    }
    userProvide.findOne({nickName: nickName}, {}, function (err, userInfo) {
        if (err) {
            callback({code: 5000, message: "db is err!"});
        } else {
            if (userInfo == null) {
                callback({code: 4100, message: "用户不存在"});
            } else {
                userProvide.findOne({nickName: friendName}, {}, function (err, friendInfo) {
                    if (err) {
                        callback({code: 5000, message: "db is err!"});
                    } else {
                        if (friendInfo == null) {
                            callback({code: 3000, message: "好友不存在"});
                        } else {
                            friendProvide.findOne({nickName: nickName}, {}, function (err, userFriendInfo) {
                                if (err) {
                                    callback({code: 5000, message: "db is err!"});
                                } else {
                                    var data = userFriendInfo.friend;
                                    var flag = 0;
                                    for (var index in data) {
                                        if (data[index].nickName == friendName) {
                                            flag = 1;
                                            break;
                                        }
                                    }
                                    if (flag == 0) {
                                        friendProvide.update({nickName: nickName}, {
                                            "$addToSet": {
                                                "friends.$.nickName": friendName,
                                                "friends.$.sex": friendSex
                                            }
                                        }, function (err, result) {
                                            if (err) {
                                                callback({code: 5000, message: "db is err!"});
                                            } else {
                                                console.log("result=>", result);
                                                callback({code: 0});
                                            }
                                        });
                                    } else {
                                        callback({code: 3100, message: "该用户已经是您的好友"});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};


//删除好友
exports.deleteFriend = function (req, callback) {
}