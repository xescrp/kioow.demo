//******* price machine... TODO: review...
//parameter: options [Object] ->
//                   options.product [Object] //the dmc product object
//                   options.switcher [Object] //the Affiliate object (or other possible modificators..)
//                   options.feekey [string] //the name of the fee to apply for switcher modificator...(unique, groups, tailormade, flights)
//                   options.switcherkey [string] //the name of the modificator : 'affiliate' (or other possible modificators..)
module.exports = function (options) {
    //Review specifications table (with formulas) on sheet over Google Drive, URL: 
    //https://docs.google.com/spreadsheets/d/1zzONMRmoBIWw8zIiGN_CoMGyvwVTho4mBlSqS-VC5bk/edit#gid=1397606775
    
    var product = options.product; //REQUIRED: [ THE DMCPRODUCT ]
    var switcher = options.switcher; //a DMC, Affiliate model object (or successors...)
    var currentactivefee = options.feekey; //possible values: unique, groups, tailormade, flights
    var switcherkey = options.switcherkey; //possible values: affiliate

    if (product == null || product.minprice == null) {
        throw new Error('You must provide a valid DMC Product, with prices please!');
    }

    //By now Affiliate switcher is the only...
    var switchfields = {
        affiliate : function(){
            this.aavvomtmargin = 0, //MARGEN% B2B OMT (From affiliate)
            this.aavvnetomtmargin = 0, //MARGEN NETO OMT  (From affiliate)
            this.aavvcomission = 0, //COMISION % AAVV (From affiliate) 
            this.aavvpvp = 0, //PVP AAVV (From affiliate) - This is variable...
            this.aavvnetpricetopayOMT = 0, //NETO A PAGAR OMT (From affiliate)
            this.aavvnetprice = 0 //PRECIO NETO AAVV (From affiliate)
            this.updatepvp = function (newprice) { 
                this.aavvpvp = newprice;
                this.aavvnetpricetopayOMT = modifier.aavvpvp - ((modifier.aavvpvp * modifier.aavvcomission) / 100);
            }
            this.applyfee = function (feename) {
                if (feename != null && feename != '') {
                    this.aavvcomission = switcher.fees[feename];
                    this.aavvpvp = modifier.aavvnetprice + ((modifier.aavvnetprice * modifier.aavvcomission) / 100);
                    this.aavvnetpricetopayOMT = modifier.aavvpvp - ((modifier.aavvpvp * modifier.aavvcomission) / 100);
                }
            }
        }
    }

    product.dmc.membership.commission = product.dmc.membership.commission || 7;
    product.dmc.membership.b2bcommission = product.dmc.membership.b2bcommission || 7;

    var pricecontainer = {
        b2cpvp: product.minprice.value, //PVP DMC
        b2ccomissionOMT: product.dmc.membership.commission, //COMISION B2C %
        b2bcomissionOMT : product.dmc.membership.b2bcommission, //COMISION B2B %
        //NETO DMC
        b2cnetpriceDMC: (product.minprice.value - ((product.minprice.value * product.dmc.membership.commission) / 100)),
        b2bnetpriceDMC: (product.minprice.value - ((product.minprice.value * product.dmc.membership.b2bcommission) / 100))
    }

    if (switcher != null) {
        var modifier = new switchfields[switcherkey];
        //instance a modifier, and calculate...
        if (switcherkey == 'affiliate') {
            modifier.aavvomtmargin = switcher.membership.omtmargin || 3;
            modifier.aavvnetprice = pricecontainer.b2bnetpriceDMC + ((pricecontainer.b2bnetpriceDMC * switcher.membership.omtmargin) / 100);
            modifier.aavvnetomtmargin = modifier.aavvnetprice - pricecontainer.b2bnetpriceDMC;
            if (currentactivefee != null && currentactivefee != '') {
                modifier.aavvcomission = switcher.fees[currentactivefee];
                modifier.aavvpvp = modifier.aavvnetprice + ((modifier.aavvnetprice * modifier.aavvcomission) / 100);
                modifier.aavvnetpricetopayOMT = modifier.aavvpvp - ((modifier.aavvpvp * modifier.aavvcomission) / 100);
            }
        }
        //update price container...
        for (var prop in modifier) {
            //Switcher add-ons
            pricecontainer[prop] = modifier[prop];
        }
    }

    return pricecontainer;
}