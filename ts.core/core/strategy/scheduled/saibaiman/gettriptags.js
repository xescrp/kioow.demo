module.exports = function (conf, callback) {
    var core = conf.core;
    var _ = require('underscore');
    var common = require('yourttoo.common');
    var sorting = { sortOrder: 1 };
    console.log('fetching triptags from cms');
    core.list('TripTags').model.find({ state: 'published', slug: { $ne: null } })
    .limit(8)
    .sort(sorting)
    .exec(function (err, docs) {
        err != null ? process.nextTick(function () {
            callback(err, null);
        }) : process.nextTick(function () {
            conf.triptags = {};
            var tags = _.map(docs, function (tag) { return tag.toObject(); });
            _.each(tags, function (tag) { 
                conf.triptags[tag.slug] = {
                    slug : tag.slug,
                    label_es: tag.label,
                    label_en: tag.label_en,
                    title_en: tag.title,
                    title_es: tag.title_es,
                    titleSEO_es: tag.titleSEO,
                    titleSEO_en: tag.titleSEO_en,
                    mainImage: tag.mainImage
                };
            });
            callback(null, conf);
        });
    });
}
