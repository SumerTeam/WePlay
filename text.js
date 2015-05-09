/**
 * Created by liusifei on 15/5/8.
 */
var date = Date.now();
for (var i = 0; i < 100000000; i++) {
}
var date2 = Date.now();
console.log("date=>", date);
console.log("date2=>", date2);
console.log(date2 - date);