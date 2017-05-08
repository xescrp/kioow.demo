module.exports = function (core, dbname) {
    require('./operations')(core, dbname);
    require('./sessions')(core, dbname);
}
