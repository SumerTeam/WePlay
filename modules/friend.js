/**
 * Created by liusifei on 15/5/6.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendSchema = new Schema({
    nickName: {type: String, required: true},
    friends: [{
        nickName: String,
        sex: String
    }]
}, {collection: 'friend'});

mongoose.model('friend', friendSchema);
