
var HashTable;

HashTable = function(obj) {
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }


    //Keys
    HashTable.prototype.keys = function () {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    //Values
    HashTable.prototype.values = function () {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    //Exists key
    HashTable.prototype.hasItem = function (key) {
        return this.items.hasOwnProperty(key);
    }

    //Get key value
    HashTable.prototype.get = function (key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    //Set key value
    HashTable.prototype.set = function (key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    //Remove key and value
    HashTable.prototype.remove = function (key) {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    //Iteration... returns (key, value)
    HashTable.prototype.each = function (fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    //Empty clear hashtable
    HashTable.prototype.clear = function () {
        this.items = {}
        this.length = 0;
    }
}

module.exports.HashTable = HashTable