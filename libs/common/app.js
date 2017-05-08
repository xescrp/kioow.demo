var common = require('./index');
var c = {
    comission: 13,
    amount: 1000, 
    //netamount: 461, 
    fee: 15,
    margin: 6
};

var rs = common.bookpricemachine(c);

console.log(rs);
