module.exports = function (yourttoocore) {
    var ctypes = {
        Text : require('./text'),
        Textarea : require('./textarea'),
        Email : require('./email'),
        Url : require('./url'),
        Number : require('./number'),
        Money : require('./money'),
        Boolean : require('./boolean'),
        Date : require('./date'),
        Datetime : require('./datetime'),
        Html : require('./html'),
        Name : require('./name'),
        Password : require('./password'),
        Location : require('./location'),
        CloudinaryImage : require('./cloudinaryimage'),
        Arraystring: require('./arraystring'),
        Relationship : require('./relationship')(yourttoocore)
    }
    return ctypes;
}
