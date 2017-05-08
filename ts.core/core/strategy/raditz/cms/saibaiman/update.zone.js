module.exports = function (options, callback) { 
    console.log('Update Destination zone subscriber worker started - ' + new Date());
    var core = options.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var zone = options.data;

    var cev = common.eventtrigger.eventcarrier(common.utils.getToken());
    
    cev.on('scheduler.trigger', function (result) {
        options.scheduletasks = ['DESTINATIONS.FILES'];
        console.log('destinations files work scheduled after cms update at ' + new Date());
        cev.emit('all.done', result);
    });

    cev.on('zone.saved', function (savedzone) {
        console.log('destination zone ' + savedzone.label_en + ' - ' + savedzone.slug + ' updated');
        cev.emit('scheduler.trigger', {
            ResultOK: true, Message: 'destination zone ' + savedzone.label_en + ' - ' + savedzone.slug + ' updated'
        });
    });
    
    cev.on('zone.process', function (findedzone) {
        console.log('lets process zone ' + findedzone.slug);
        findedzone.label_es = zone.label_es;
        findedzone.label_en = zone.label_en;
        findedzone.slug = zone.slug;
        findedzone.promotionArea = zone.promotionArea;
        findedzone.promotionOrder = zone.promotionOrder;
        findedzone.title_es = zone.title_es;
        findedzone.title_en = zone.title_en;
        findedzone.captionImage = zone.captionImage;
        findedzone.iconImage = zone.iconImage;
        findedzone.colorBg = zone.colorBg;

        findedzone.save(function (err, doc) {
            err != null ? cev.emit('all.error', err) : cev.emit('zone.saved', doc);
        });
    })

    cev.on('zones.found', function (zones) { 
        zones.length > 0 ? cev.emit('zone.process', zones[0]) : cev.emit('all.error', 'No zones found');
    });
    
    cev.on('create.zone', function () {
        var createdzone = core.list('DestinationCountriesZones').model({ slug: zone.slug });
        cev.emit('zone.process', createdzone)
    });

    cev.on('all.error', function (err) { 
        options.results.push(err);
        callback(err, options);
    });
    
    cev.on('all.done', function (result) {
        options.results.push(result);
        callback(null, options);
    });

    core.list('DestinationCountriesZones').model.find({ slug : zone.slug })
    .exec(function (err, zones) {
        err != null ? cev.emit('all.error', err) : null;
        zones != null && zones.length > 0 ? cev.emit('zones.found', zones) : cev.emit('all.error', 'No zones found with this slug: ' + zone.slug);
    });
}
