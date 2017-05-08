module.exports = function(program){
    var common = require('yourttoo.common');
    var _ = require('underscore');

    program = program.toObject();
    program.title = program.title_es || program.title;
    program.provider = {
        code: program.dmc.code,
        company: {
            name: program.dmc.company.name
        },
        membership: {
            cancelpolicy: program.dmc.membership.cancelpolicy
        }
    };
    program.importantnotes = program.important_txt_es || program.important_txt_en;
    program.pvp = {
        minprice: program.pvp.b2b,
        currency: program.pvp.currency,
        minpricedate: new Date(program.pvp.year, common.staticdata.months_en.indexOf(program.pvp.month), program.pvp.day)
    }

    delete program['dmc'];
    delete program['release'];
    delete program['important_txt_es'];
    delete program['important_txt_en'];
    delete program['minprice'];
    delete program['_id'];

    return program;
}