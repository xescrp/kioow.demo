var _ = require('underscore');
var cheker = function (checkkeys, eventkeyonchecked, oncheckedhandler) {
    this.eventkey = eventkeyonchecked;
    this.keys = [];
    this.values = [];
    if (Array.isArray(checkkeys)) {
        this.keys = checkkeys;
    }
    else { 
        this.keys = checkkeys.split(',');
    }
    //initialization
    for (var i = 0, len = this.keys.length; i < len; i++) { 
        this.values[i] = false;
    }
    
    this.setdone = function (key, objectToSend) {
        var i = this.keys.indexOf(key);
        if (i >= 0) {
            this.values[i] = true;
        }
        if (this.check()) {
            if (this.eventkey != null && this.eventkey != '') { 
                this.emit(this.eventkey, objectToSend);
            }
            if (oncheckedhandler) { 
                oncheckedhandler(objectToSend);
            }
        }
    }

    this.check = function () {
        var unq = _.uniq(this.values);
        return (unq.length == 1 && unq[0] == true);
    }
}

//inherits
var eventThis = require('./eventtrigger').eventtrigger;
eventThis.eventtrigger(cheker);