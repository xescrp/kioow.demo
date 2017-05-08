﻿module.exports = function (yourttoocore) {

    var _ = require('underscore'),
        async = require('async'),
        moment = require('moment'),
	// util = require('util'),
	//yourttoocore = { mongoose: require('mongoose') },
        schemaPlugins = require('./schemaPlugins'),
        utils = require('../tools'),
        Field = require('./field'),
        UpdateHandler = require('../tools/updateHandler');

    function List(key, options) {
        
        if (!(this instanceof List))
            return new List(key, options);
        
        var list = this;
        
        this.options = utils.options({
            noedit: false,
            nocreate: false,
            nodelete: false,
            sortable: false,
            searchFields: '__name__',
            defaultSort: '__default__',
            defaultColumns: '__name__'
        }, options);
        
        this.key = key;
        this.path = this.get('path') || utils.keyToPath(key, true);
        this.schema = new yourttoocore.mongoose.Schema();
        this.uiElements = [];
        this.underscoreMethods = {};
        this.fields = {};
        this.relationships = {};
        
        
        this.populate = [];
        
        this.mappings = {
            name: null,
            createdBy: null,
            createdOn: null,
            modifiedBy: null,
            modifiedOn: null
        };
        
        
        _.each(this.options.map, function (val, key) { this.map(key, val) }, this);
        
        Object.defineProperty(this, 'label', {
            get: function () {
                return this.get('label') || this.set('label', utils.plural(utils.keyToLabel(key)));
            }
        });
        
        Object.defineProperty(this, 'singular', {
            get: function () {
                return this.get('singular') || this.set('singular', utils.singular(this.label));
            }
        });
        
        Object.defineProperty(this, 'plural', {
            get: function () {
                return this.get('plural') || this.set('plural', utils.plural(this.singular));
            }
        });
        
        Object.defineProperty(this, 'namePath', {
            get: function () {
                return this.mappings.name || '_id';
            }
        });
        
        Object.defineProperty(this, 'nameField', {
            get: function () {
                return this.fields[this.mappings.name];
            }
        });
        
        Object.defineProperty(this, 'nameIsVirtual', {
            get: function () {
                return this.model.schema.virtuals[this.mappings.name] ? true : false;
            }
        });
        
        Object.defineProperty(this, 'nameIsEditable', {
            get: function () {
                return (this.fields[this.mappings.name] && this.fields[this.mappings.name].type == 'text') ? !this.fields[this.mappings.name].noedit : false;
            }
        });
        
        Object.defineProperty(this, 'nameIsInitial', {
            get: function () {
                return (this.fields[this.mappings.name] && this.fields[this.mappings.name].options.initial === undefined);
            }
        });
        
        var initialFields;
        Object.defineProperty(this, 'initialFields', {
            get: function () {
                return initialFields || (initialFields = _.filter(this.fields, function (i) { return i.initial }));
            }
        });

    }
    
    
    List.prototype.set = function (key, value) {
        if (arguments.length == 1)
            return this.options[key];
        this.options[key] = value;
        return value;
    };
    
    
    
    
    List.prototype.get = List.prototype.set;
    
    
    
    
    List.prototype.map = function (field, path) {
        if (path)
            this.mappings[field] = path;
        return this.mappings[field];
    }
    
    
    
    
    List.prototype.automap = function (field) {
        if (_.has(this.mappings, field.path) && !this.mappings[field.path])
            this.map(field.path, field.path);
    }
    
    
    
    List.prototype.add = function () {
        
        var add = (function (obj, prefix) {
            
            prefix = prefix || '';
            var keys = Object.keys(obj);
            
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                
                if (null == obj[key]) {
                    throw new Error('Invalid value for schema path `' + prefix + key + '`');
                }
                
                if (utils.isObject(obj[key]) && (!obj[key].constructor || 'Object' == obj[key].constructor.name) &&
                (!obj[key].type || obj[key].type.type)) {
                    if (Object.keys(obj[key]).length) {
                        // nested object, e.g. { last: { name: String }}
                        // matches logic in mongoose/Schema:add
                        this.schema.nested[this.path] = true;
                        add(obj[key], prefix + key + '.');
                    } else {
                        addField(prefix + key, obj[key]); // mixed type field
                    }
                } else {
                    addField(prefix + key, obj[key]);
                }
            }

        }).bind(this);
        
        var addField = (function (path, options) {
            this.uiElements.push({
                type: 'field',
                field: this.field(path, options)
            });
        }).bind(this);
        
        _.each(arguments, function (def) {
            
            if ('string' == typeof def) {
                if (def == '>>>') {
                    this.uiElements.push({
                        type: 'indent'
                    });
                } else if (def == '<<<') {
                    this.uiElements.push({
                        type: 'outdent'
                    });
                } else {
                    this.uiElements.push({
                        type: 'heading',
                        heading: def,
                        options: {}
                    });
                }
            } else {
                if (def.heading && 'string' == typeof def.heading)
                    this.uiElements.push({
                        type: 'heading',
                        heading: def.heading,
                        options: def
                    });
                else
                    add(def);
            }

        }, this);
        
        return this;

    }
    
    
    
    List.prototype.addPattern = function (pattern) {
        
        switch (pattern) {

            case 'standard meta':
                this.schema.add({
                    createdOn: { type: Date, default: Date.now, hidden: true, index: true },
                    updatedOn: { type: Date, default: Date.now, hidden: true, index: true }
                });
                this.schema.pre('save', function (next) {
                    
                    if (!this.isModified('updatedOn')) {
                        this.updatedOn = new Date();
                    }
                    
                    next();
                });
                break;

        }
        
        return this;

    }
    
    
    
    
    List.prototype.field = function (path, options) {
        
        if (arguments.length == 1) {
            return this.fields[path];
        }
        
        if ('function' == typeof options) {
            options = { type: options };
        }
        
        if (this.get('noedit')) {
            options.noedit = true;
        }
        
        if (!options.note && this.get('notes')) {
            options.note = this.get('notes')[path];
        }        ;
        
        if ('function' != typeof options.type) {
            throw new Error('Fields must be specified with a type function');
        }
        
        if (options.type.prototype.__proto__ != Field.prototype) {
            
            // Convert native field types to their default yourttoocore counterpart
            
            if (options.type == String)
                options.type = Field.Types.Text;
            else if (options.type == Number)
                options.type = Field.Types.Number;
            else if (options.type == Boolean)
                options.type = Field.Types.Boolean;
            else if (options.type == Date)
                options.type = Field.Types.Datetime;
            else
                throw new Error('Unrecognised field constructor: ' + options.type);

        }
        
        var field = new options.type(this, path, options);
        
        return this.fields[path] = field;

    }
    
    
    
    
    List.prototype.underscoreMethod = function (path, fn) {
        
        var target = this.underscoreMethods,
            path = path.split('.'),
            last = path.pop();
        
        path.forEach(function (part) {
            if (!target[part]) target[part] = {};
            target = target[part];
        });
        
        target[last] = fn;
        
        return this;

    }
    
    
    
    Object.defineProperty(List.prototype, 'defaultSort', {
        
        get: function () {
            
            var ds = this.get('defaultSort');
            
            return (ds == '__default__') ? (this.get('sortable') ? 'sortOrder' : this.namePath) : ds;

        }, set: function (value) {
            
            this.set('defaultSort', value);

        }

    });
    
    
    
    
    List.prototype.expandColumns = function (cols) {
        
        if (typeof cols == 'string')
            cols = cols.split(',');
        
        if (!Array.isArray(cols)) {
            throw new Error("List.expandColumns: cols must be an array.");
        }
        
        var list = this,
            expanded = [],
            nameCol = false;
        
        var getCol = function (def) {
            
            if (def.path == '__name__') {
                def.path = list.namePath;
            }
            
            var field = list.fields[def.path],
                col = null;
            
            if (field) {
                
                col = {
                    field: field,
                    path: field.path,
                    type: field.type,
                    label: def.label || field.label
                };
                
                if (col.type == 'relationship') {
                    
                    col.refList = col.field.refList;
                    
                    if (col.refList) {
                        col.refPath = def.subpath || col.refList.namePath;
                        col.subField = col.refList.fields[col.refPath];
                        col.populate = { path: col.field.path, subpath: col.refPath };
                    }
                    
                    if (!def.label && def.subpath) {
                        col.label = field.label + ': ' + (col.subField ? col.subField.label : utils.keyToLabel(def.subpath));
                    }
                }

            } else if (list.model.schema.paths[def.path] || list.model.schema.virtuals[def.path]) {
                // column refers to a path in the schema
                // TODO: this needs to handle sophisticated types, including arrays, nested Schemas, and mixed types
                col = {
                    path: def.path,
                    label: def.label || utils.keyToLabel(def.path)
                };
            }
            
            if (col) {
                
                col.width = def.width;
                
                if (col.path == list.namePath) {
                    col.isName = true;
                    nameCol = col;
                }
                
                if (field && field.col) {
                    _.extend(col, field.col);
                }

            }
            
            return col;
        }
        
        for (var i = 0; i < cols.length; i++) {
            
            if (typeof cols[i] == 'string') {
                
                var def = {},
                    parts = cols[i].trim().split('|');
                
                def.width = parts[1] || false;
                
                parts = parts[0].split(':');
                
                def.path = parts[0];
                def.subpath = parts[1];

            }
            
            if (!utils.isObject(def) || !def.path) {
                throw new Error('List.expandColumns: column definition must contain a path.');
            }
            
            var col = getCol(def);
            
            if (col) {
                expanded.push(col);
            }

        }
        
        if (!nameCol) {
            nameCol = getCol({ path: list.namePath });
            if (nameCol) {
                expanded.unshift(nameCol);
            }
        }
        
        return expanded;

    }
    
    
    List.prototype.selectColumns = function (q, cols) {
        
        // Populate relationship columns
        
        var select = [],
            populate = {};
        
        cols.forEach(function (col) {
            select.push(col.path);
            if (col.populate) {
                if (!populate[col.populate.path]) {
                    populate[col.populate.path] = [];
                }
                populate[col.populate.path].push(col.populate.subpath);
            }
        });
        
        q.select(select.join(' '));
        
        for (var path in populate) {
            q.populate(path, populate[path].join(' '));
        }

    }
    
    
    
    
    Object.defineProperty(List.prototype, 'defaultColumns', {
        
        get: function () {
            
            if (!this._defaultColumns) {
                this._defaultColumns = this.expandColumns(this.get('defaultColumns'));
            }
            
            return this._defaultColumns;

        }, set: function (value) {
            
            this.set('defaultColumns', value);
            delete this._defaultColumns;

        }

    });
    
    
    
    List.prototype.relationship = function (def) {
        
        if (arguments.length > 1) {
            _.map(arguments, function (def) { this.relationship(def) }, this);
            return this;
        }
        
        if ('string' == typeof def) {
            def = { ref: def };
        }
        
        if (!def.ref) {
            throw new Error('List Relationships must be specified with an object containing ref (' + this.key + ')');
        }
        
        if (!def.refPath) {
            def.refPath = utils.downcase(this.key);
        }
        
        if (!def.path) {
            def.path = utils.keyToProperty(def.ref, true);
        }
        
        Object.defineProperty(def, 'refList', {
            get: function () {
                return yourttoocore.list(def.ref);
            }
        });
        
        Object.defineProperty(def, 'isValid', {
            get: function () {
                return yourttoocore.list(def.ref) ? true : false;
            }
        });
        
        this.relationships[def.path] = def;
        
        return this;

    }
    
    
    
    List.prototype.register = function (dbname) {
        
        var list = this;
        
        this.schema.virtual('list').get(function () {
            return list;
        });
        
        if (this.get('sortable')) {
            schemaPlugins.sortable.apply(this);
        }
        
        if (this.get('autokey')) {
            schemaPlugins.autokey.apply(this);
        }
        
        if (!_.isEmpty(this.relationships)) {
            this.schema.methods.getRelated = schemaPlugins.methods.getRelated;
            this.schema.methods.populateRelated = schemaPlugins.methods.populateRelated;
            if (!this.schema.options.toObject) this.schema.options.toObject = {};
            this.schema.options.toObject.transform = schemaPlugins.options.transform;
        }
        
        this.schema.virtual('_').get(function () {
            if (!this.__methods) {
                this.__methods = utils.bindMethods(list.underscoreMethods, this);
            }
            return this.__methods;
        });
        
        this.schema.method('getUpdateHandler', function (req, res, ops) {
            return new UpdateHandler(list, this, req, res, ops);
        });
        
        //this.model = yourttoocore.mongoose.model(this.key, this.schema);
       
        this.model = yourttoocore.dbconnections.get(dbname).model(this.key, this.schema);
        
        yourttoocore.list(this);
        
        return this;
    }
    
    
    
    
    List.prototype.getDocumentName = function (doc, escape) {
        var name = (this.nameField) ? this.nameField.format(doc) : doc.get(this.namePath);
        return (escape) ? utils.encodeHTMLEntities(name) : name;
    }
    
    
    
    
    List.prototype.processFilters = function (q) {
        
        var filters = {},
            list = this;
        
        q.split(';').forEach(function (filter) {
            
            var filter = filter.split(':'),
                path = filter.shift(),
                ops = { field: list.fields[path] };
            
            if (filter[0] == '!') {
                ops.inv = true;
                filter.shift();
            }
            
            if (filter[0] == '=') {
                ops.exact = true;
                filter.shift();
            }
            
            if (ops.field) {
                switch (ops.field.type) {
                    case 'cloudinaryimage':
                    case 'cloudinaryimages':
                    case 's3file':
                    case 'boolean':
                        ops.value = (filter[0] == 'true') ? true : false;
                        break;
                    case 'location':
                        ops.address = filter[0];
                        ops.suburb = filter[1];
                        ops.state = filter[2];
                        ops.postcode = filter[3];
                        ops.country = filter[4];
                        break;
                    case 'number':
                    case 'money':
                    case 'date':
                    case 'datetime':
                        if (filter[0] == 'gt' || filter[0] == 'lt') {
                            ops.operator = filter[0];
                            filter.shift();
                        }
                        ops.value = filter[0];
                    case 'name':
                    case 'password':
                    case 'relationship':
                        // TODO;
                        break;
                    default:
                        ops.value = filter[0];
                }
            } else {
                ops.value = filter[0];
            }
            
            filters[path] = ops;

        });
        
        return filters;

    }
    
    
    
    
    List.prototype.getSearchFilters = function (search, add) {
        
        var filters = {},
            list = this;
        
        search = String(search || '').trim();
        
        if (search.length) {
            
            var searchFilter,
                searchParts = search.split(' '),
                searchRx = new RegExp(utils.escapeRegExp(search), 'i'),
                splitSearchRx = new RegExp((searchParts.length > 1) ? _.map(searchParts, utils.escapeRegExp).join('|') : search, 'i'),
                searchFields = this.get('searchFields'),
                searchFilters = [],
                searchIdField = utils.isValidObjectId(search);
            
            if ('string' == typeof searchFields) {
                searchFields = searchFields.split(',');
            }
            
            searchFields.forEach(function (path) {
                
                path = path.trim();
                
                if (path == '__name__') {
                    path = list.mappings.name;
                }
                
                var field = list.fields[path];
                
                if (field && field.type == 'name') {
                    
                    var first = {};
                    first[field.paths.first] = splitSearchRx;
                    
                    var last = {};
                    last[field.paths.last] = splitSearchRx;
                    
                    searchFilter = {};
                    searchFilter['$or'] = [first, last];
                    searchFilters.push(searchFilter);

                } else {
                    
                    searchFilter = {};
                    searchFilter[path] = searchRx;
                    searchFilters.push(searchFilter);
                }

            });
            
            if (list.autokey) {
                searchFilter = {};
                searchFilter[list.autokey.path] = searchRx;
                searchFilters.push(searchFilter);
            }            ;
            
            if (searchIdField) {
                searchFilter = {};
                searchFilter._id = search;
                searchFilters.push(searchFilter);
            }
            
            if (searchFilters.length > 1) {
                filters['$or'] = searchFilters;
            } else if (searchFilters.length) {
                filters = searchFilters[0];
            }

        }
        
        if (add) {
            _.each(add, function (filter) {
                
                if (filter.field) {
                    switch (filter.field.type) {

                        case 'boolean':
                            if (filter.value) {
                                filters[filter.field.path] = true;
                            } else {
                                filters[filter.field.path] = { $ne: true };
                            }
                            break;

                        case 'cloudinaryimage':
                        case 'cloudinaryimages':
                        case 's3file':
                            // TODO
                            break;

                        case 'location':
                            // TODO
                            break;

                        case 'name':
                            // TODO
                            break;

                        case 'password':
                            // TODO
                            break;

                        case 'relationship':
                            // TODO
                            break;

                        case 'select':
                            if (filter.value) {
                                filters[filter.field.path] = (filter.inv) ? { $ne: filter.value } : filter.value;
                            } else {
                                filters[filter.field.path] = (filter.inv) ? { $nin: ['', null] } : { $in: ['', null] };
                            }
                            break;

                        case 'number':
                        case 'money':
                            var val = utils.number(filter.value);
                            if (!isNaN(val)) {
                                if (filter.operator == 'gt') {
                                    filters[filter.field.path] = { $gt: val };
                                } else if (filter.operator == 'lt') {
                                    filters[filter.field.path] = { $lt: val };
                                } else {
                                    filters[filter.field.path] = val;
                                }
                            }
                            break;

                        case 'date':
                        case 'datetime':
                            var val = moment(filter.value);
                            if (val && val.isValid()) {
                                var start = moment(filter.value).startOf('day');
                                var end = moment(filter.value).endOf('day');
                                if (filter.operator == 'gt') {
                                    filters[filter.field.path] = { $gt: end.toDate() };
                                } else if (filter.operator == 'lt') {
                                    filters[filter.field.path] = { $lt: start.toDate() };
                                } else {
                                    filters[filter.field.path] = { $lte: end.toDate(), $gte: start.toDate() };
                                }
                            }
                            break;

                        case 'text':
                        case 'textarea':
                        case 'html':
                        case 'email':
                        case 'url':
                        case 'key':
                            if (filter.exact) {
                                if (filter.value) {
                                    var cond = new RegExp('^' + utils.escapeRegExp(filter.value) + '$', 'i');
                                    filters[filter.field.path] = filter.inv ? { $not: cond } : cond;
                                } else {
                                    if (filter.inv) {
                                        filters[filter.field.path] = { $nin: ['', null] };
                                    } else {
                                        filters[filter.field.path] = { $in: ['', null] };
                                    }
                                }
                            } else if (filter.value) {
                                var cond = new RegExp(utils.escapeRegExp(filter.value), 'i');
                                filters[filter.field.path] = filter.inv ? { $not: cond } : cond;
                            }
                            break;

                    }
                }
            });
        }
        
        
        return filters;

    }
    
    
    
    
    List.prototype.updateAll = function (data, callback) {
        
        if ('function' == typeof data) {
            callback = data;
            data = null;
        }
        callback = callback || function () { };
        
        this.model.find(function (err, results) {
            
            if (err) return callback(err);
            
            async.eachSeries(results, function (doc, next) {
                
                if (data) {
                    doc.set(data);
                }
                
                doc.save(next);

            }, function (err) {
                callback(err);
            });

        });

    }
    
    
    List.prototype.getUniqueValue = function (path, generator, limit, callback) {
        
        var model = this.model,
            count = 0,
            value;
        
        if (utils.isFunction(limit)) {
            callback = limit;
            limit = 10;
        }
        
        if (utils.isArray(generator)) {
            
            var fn = generator[0],
                args = generator.slice(1);
            
            generator = function () {
                return fn.apply(this, args);
            }

        }
        
        var check = function () {
            
            if (count++ > 10) {
                return callback(undefined, undefined);
            }
            
            value = generator();
            
            model.count().where(path, value).exec(function (err, matches) {
                if (err) return callback(err);
                if (matches) return check();
                callback(undefined, value);
            });

        }
        
        check();

    }
    
    
    
    List.prototype.paginate = function (options, callback) {
        
        var model = this.model;
        
        options = options || {};
        
        var query = model.find(options.filters);
        
        query._original_exec = query.exec;
        query._original_sort = query.sort;
        query._original_select = query.select;
        
        var currentPage = Number(options.page) || 1,
            resultsPerPage = Number(options.perPage) || 50,
            maxPages = Number(options.maxPages) || 10,
            skip = (currentPage - 1) * resultsPerPage;
        
        
        query.select = function () {
            options.select = arguments[0];
            return query;
        }
        
        query.sort = function () {
            options.sort = arguments[0];
            return query;
        }
        
        query.exec = function (callback) {
            
            query.count(function (err, count) {
                
                if (err) return callback(err);
                
                query.find().limit(resultsPerPage).skip(skip);
                
                // apply the select and sort options before calling exec
                if (options.select) {
                    query._original_select(options.select);
                }
                
                if (options.sort) {
                    query._original_sort(options.sort);
                }
                
                query._original_exec(function (err, results) {
                    
                    if (err) return callback(err);
                    
                    var totalPages = Math.ceil(count / resultsPerPage);
                    
                    var rtn = {
                        total: count,
                        results: results,
                        currentPage: currentPage,
                        totalPages: totalPages,
                        pages: [],
                        previous: (currentPage > 1) ? (currentPage - 1) : false,
                        next: (currentPage < totalPages) ? (currentPage + 1) : false,
                        first: skip + 1,
                        last: skip + results.length
                    };
                    
                    var surround = Math.floor(maxPages / 2);
                    var firstPage = maxPages ? Math.max(1, currentPage - surround) : 1;
                    var padRight = Math.max(((currentPage - surround) - 1) * -1, 0);
                    
                    var lastPage = maxPages ? Math.min(totalPages, currentPage + surround + padRight) : totalPages;
                    
                    var padLeft = Math.max(((currentPage + surround) - lastPage), 0);
                    firstPage = Math.max(Math.min(firstPage, firstPage - padLeft), 1);
                    
                    for (var i = firstPage; i <= lastPage; i++) {
                        rtn.pages.push(i);
                    }
                    
                    if (firstPage != 1) {
                        rtn.pages.shift();
                        rtn.pages.unshift('...');
                    }
                    
                    if (lastPage != totalPages) {
                        rtn.pages.pop();
                        rtn.pages.push('...');
                    }
                    
                    callback(err, rtn);

                });
            });

        }
        
        if (callback) {
            return query(callback);
        } else {
            return query;
        }
    }
    
    
    
    //exports = module.exports = List;
    return List;

}


