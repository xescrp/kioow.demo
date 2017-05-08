var sce = null;
var tools = null;
app.provider('tsImhotep', function tsImhotepProvider() {
    this.$get = ['$sce', 'tools_service', function ($sce, tools_service) {
        sce = $sce;
        tools = tools_service;
        return tsImhotep;
    }];
});

var schemafields = {
    WLCustomizations: [
        "_id",
        "code",
        "name",
        "slug",
        "css.brand_background",
        "css.brand_primary",
        "css.brand_alternate",
        "css.brand_info",
        "css.brand_warning",
        "css.brand_danger",
        "web.header",
        "web.footer",
        "createdOn",
        "updatedOn",
    ],
    Affiliate: [
        "_id",
        "code",
        "name",
        "slug",
        "company",
        "contact",
        "contact",
        "bankinfo",
        "membership",
        "images",
        "currency",
        "timeZone",
        "omtcomment",
        "fees",
        "companynameindexing",
        "contactnameindexing",
        "companylocationindexing",
        "user",
        "wlcustom",
        "createdOn",
        "updatedOn"
    ],
    SigninRegister: [
        "_id",
        "code",
        "username",
        "name",
        "lastname",
        "email",
        "phone",
        "kind",
        "createdOn",
        "updatedOn"
    ],
    Bookings: [
        "_id",
        "idBooking",
        "slug",
        "idBookingExt",
        "comission",
        "iva",
        "start",
        "end",
        "enddate",
        "enddateindexing",
        "createdonindexing",
        "holderindexing",
        "destinationindexing",
        "destinationindexinges",
        "productDmc",
        "product",
        "dmc",
        "dmcindexing",
        "traveler",
        "affiliate",
        "affiliateindexing",
        "flights",
        "createDate",
        "cancelDate",
        "lastModifiedDate",
        "isGroup",
        "isB2C",
        "b2bcommission",
        "omtmargin",
        "fees",
        "invoice",
        "invoiceDate",
        "invoiceProvider",
        "invoiceProviderDate",
        "invoiceProviderFile",
        "invoiceAffiliate",
        "invoiceAffiliateDate",
        "invoiceAffiliateFile",
        "finalDatePaymentAffiliate",
        "voucherFile",
        "status",
        "meetingdata",
        "queryCode",
        "quoteCode",
        "budgetCode",
        "budget",
        "timeZone",
        "discount",
        "lastVisitUser",
        "lastVisitDMC",
        "lastVisitOMT",
        "historic",
        "observations",
        "affiliateobservations",
        "affiliateuser",
        "cancelpolicy._es",
        "cancelpolicy._en",
        "comments",
        "pvpAffiliate",
        "amount",
        "amountflights",
        "netPrice",
        "userinvoicedata",
        "roomDistribution",
        "payStatus",
        "payProvider",
        "accountingEntries",
        "createdOn",
        "updatedOn"
    ],
    Bookings2: [
        "_id",
        "idBooking",
        "slug",
        "idBookingExt",
        "code",
        "agentid",
        "agencyid",
        "bookingmodel",
        "paymentmodel",
        "dates",
        "meetingdata",
        "previousstatus",
        "status",
        "chargestatus",
        "paystatusprovider",
        "paystatusagency",
        "startdateindexing",
        "enddateindexing",
        "createdonindexing",
        "affiliateindexing",
        "dmcindexing",
        "destinationindexing",
        "paxindexing",
        "textindexing",
        "products",
        "dmc",
        "traveler",
        "affiliate",
        "query",
        "quote",
        "payments",
        "stories",
        "signin",
        "flights",
        "invoices",
        "relatedbooking",
        "pricing",
        "voucher.file",
        "timezone",
        "observations",
        "cancelpolicy",
        "exchanges",
        "mailing",
        "paxes",
        "rooms",
        "createdOn",
        "updatedOn"
    ],
    Chats: [
        "_id",
        "code",
        "title",
        "slug",
        "date",
        "userquery",
        "booking",
        "quote",
        "traveler",
        "dmc",
        "affiliate",
        "status",
        "messages",
        "createdOn",
        "updatedOn"
    ],
    DestinationCountriesZones: [
        "_id",
        "label_es",
        "label_en",
        "slug",
        "promotionArea",
        "promotionOrder",
        "title_es",
        "title_en",
        "mainImagel",
        "captionImage",
        "iconImage",
        "colorBg",
        "sortOrder",
        "key"
    ],
    DestinationCountries: [
        "_id",
        "label_es",
        "label_en",
        "slug",
        "key_es",
        "key_en",
        "location",
        "zone",
        "title_es",
        "title_en",
        "mainImage",
        "captionImage",
        "description_es",
        "description_en",
        "averageEuro",
        "state",
        "publishedDate",
        "titleSEO_es",
        "metaDescription_es",
        "descriptionGooglePlus_es",
        "descriptionFacebook_es",
        "titleSEO_en",
        "metaDescription_en",
        "descriptionGooglePlus_en",
        "descriptionFacebook_en",
        "imageFacebook"
    ],
    DestinationCities: [
        "_id",
        "label_es",
        "label_en",
        "slug",
        "key_es",
        "key_en",
        "location",
        "country",
        "countrycode",
        "title_es",
        "title_en",
        "mainImage",
        "captionImage",
        "description_es",
        "description_en",
        "state",
        "publishedDate",
        "titleSEO_es",
        "metaDescription_es",
        "descriptionGooglePlus_es",
        "descriptionFacebook_es",
        "titleSEO_en",
        "metaDescription_en",
        "descriptionGooglePlus_en",
        "descriptionFacebook_en",
        "imageFacebook"
    ],
    DMCProducts: [
        "_id",
        "name",
        "title",
        "title_es",
        "languages.english",
        "languages.spanish",
        "slug",
        "slug_en",
        "slug_es",
        "publishedDate",
        "publishState",
        "code",
        "dmccode",
        "description_en",
        "description_es",
        "important_txt_en",
        "important_txt_es",
        "parent",
        "release",
        "availabilitytill",
        "productimage",
        "location",
        "included",
        "pvp",
        "channels",
        "priceindexing",
        "priceb2bindexing",
        "itinerarylength",
        "itinerarylengthindexing",
        "dmcindexing",
        "destinationindexing",
        "productvalid",
        "dmc",
        "origin",
        "departurecity",
        "stopcities",
        "sleepcity",
        "departurecountry",
        "stopcountry",
        "sleepcountry",
        "flightsdmc",
        "flights",
        "categoryname.label_es",
        "categoryname.label_en",
        "minprice",
        "prices",
        "itinerary",
        "availability",
        "tags",
        "createdOn",
        "updatedOn"
    ],
    BookedProducts: [
        "_id",
        "name",
        "title",
        "title_es",
        "languages.english",
        "languages.spanish",
        "slug",
        "slug_en",
        "slug_es",
        "publishedDate",
        "publishState",
        "code",
        "dmccode",
        "description_en",
        "description_es",
        "important_txt_en",
        "important_txt_es",
        "parent",
        "release",
        "availabilitytill",
        "productimage",
        "location",
        "included",
        "pvp",
        "channels",
        "priceindexing",
        "priceb2bindexing",
        "itinerarylength",
        "itinerarylengthindexing",
        "dmcindexing",
        "destinationindexing",
        "productvalid",
        "dmc",
        "origin",
        "departurecity",
        "stopcities",
        "sleepcity",
        "departurecountry",
        "stopcountry",
        "sleepcountry",
        "flightsdmc",
        "flights",
        "categoryname.label_es",
        "categoryname.label_en",
        "minprice",
        "prices",
        "itinerary",
        "availability",
        "tags",
        "createdOn",
        "updatedOn"
    ],
    DMCs: [
        "_id",
        "code",
        "name",
        "vouchername",
        "slug",
        "contact",
        "bankinfo",
        "membershipDate",
        "membership",
        "images",
        "currency",
        "timeZone",
        "omtcomment",
        "user",
        "admin",
        "contactuser",
        "delegations",
        "company",
        "additionalinfo",
        "tourEscorts",
        "tags",
        "expenditure",
        "createdOn",
        "updatedOn"
    ],
    Quotes: [
        "_id",
        "title_en",
        "title_es",
        "code",
        "slug",
        "publishedDate",
        "description",
        "name",
        "createdonindexing",
        "responseDetails",
        "products",
        "userqueryCode",
        "userqueryId",
        "idBooking",
        "travelercode",
        "affiliatecode",
        "dmccode",
        "operationStart",
        "operationStartDate",
        "quoteValidUntil",
        "quoteValidDate",
        "chat",
        "status",
        "comission",
        "isB2C",
        "b2bcommission",
        "omtmargin",
        "fees.unique",
        "fees.groups",
        "fees.tailormade",
        "fees.flights",
        "rooms",
        "children",
        "netPrice",
        "amount",
        "pvpAffiliate",
        "cancelled",
        "createdOn",
        "updatedOn"
    ],
    Payments: [
        "_id",
        "code",
        "action",
        "payment",
        "paymentmethod",
        "paymentarget",
        "receiptnumber",
        "transferid",
        "date",
        "validatedate",
        "nextpaymentdate",
        "payabledate",
        "amount",
        "currency.label",
        "currency.symbol",
        "currency.value",
        "booking",
        "createdOn",
        "updatedOn",
        "slug"
    ],
    Invoices: [
        "_id",
        "name",
        "slug",
        "code",
        "date",
        "invoicenumber",
        "file",
        "city",
        "cp",
        "idnumber",
        "taxinvoice",
        "address",
        "country.name_es",
        "country.name",
        "country.countrycode",
        "booking",
        "createdOn",
        "updatedOn"
    ],
    Travelers: [
        "_id",
        "code",
        "firstname",
        "lastname",
        "slug",
        "phone",
        "email",
        "skype",
        "sendmenews",
        "dateofbirth",
        "location",
        "cif",
        "nif",
        "accountingnumber",
        "description",
        "membershipDate",
        "images",
        "user",
        "currency",
        "timeZone",
        "createdOn",
        "updatedOn"
    ],
    UserQueries: [
        "_id",
        "title",
        "slug",
        "name",
        "code",
        "travelercode",
        "affiliatecode",
        "publishedDate",
        "createdonindexing",
        "startdateindexing",
        "destinationsindexing",
        "destinationsindexingen",
        "stateindexing",
        "holderindexing",
        "titleindexing",
        "affiliateindexing",
        "description",
        "idBooking",
        "additionalinfo",
        "dates",
        "hosting",
        "budget",
        "group",
        "group",
        "quotes",
        "traveler",
        "affiliate",
        "dmcs",
        "chats",
        "state",
        "affiliateuser",
        "quotesstates",
        "destinations",
        "cancelled.cancelDate",
        "cancelled.user",
        "cancelled.byTraveler",
        "cancelled.reason",
        "whattodo",
        "roomDistribution",
        "historic",
        "comments",
        "passengers",
        "createdOn",
        "updatedOn"
    ],
    OMTAdmin: [
        "_id",
        "code",
        "name",
        "slug",
        "email",
        "skype",
        "location",
        "description",
        "membershipDate",
        "images",
        "user",
        "createdOn",
        "updatedOn"
    ],
    Users: [
        "_id",
        "username",
        "email",
        "code",
        "phone",
        "photo",
        "isDMC",
        "isTraveler",
        "isAdmin",
        "isAffiliate",
        "roles",
        "active",
        "isLocal",
        "isFacebookLinked",
        "isTwitterLinked",
        "isGoogleLinked",
        "apikey",
        "facebook",
        "twitter",
        "google",
        "timeZone",
        "currency",
        "createdOn",
        "updatedOn"
    ],
    Hevents: [
        "_id",
        "code",
        "slug",
        "subject",
        "action",
        "delivereddate",
        "state",
        "createdonindexing",
        "data",
        "subscribermessages",
        "createdOn",
        "updatedOn"
    ],
    SubscriptionMessages: [
        "_id",
        "code",
        "slug",
        "subject",
        "action",
        "lasterrordate",
        "commitdate",
        "createdonindexing",
        "subscribertaskdone",
        "state",
        "subscriberslist",
        "errorslist",
        "lastparams",
        "lastresults",
        "createdOn",
        "updatedOn",
        "__v"
    ],
};

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}
function datestring (datest) {
    var d = new Date(datest);
    return d;
};
function printDate(thedate) {
    thedate = thedate != null && thedate != '' ? datestring(thedate) : null;
    var str = thedate != null ? [pad(thedate.getDate(), 2), pad(thedate.getMonth() + 1,2), thedate.getFullYear()].join('/') : '';
    return str;
}

function imageproductstretch(url) {
    if ("undefined" != typeof url) {
        var cl_transform = "cs_no_cmyk/w_70,h_70,c_fill,g_face,q_90/",
            urlparts = url.split("/");
        return urlparts[urlparts.length - 2] = cl_transform + urlparts[urlparts.length - 2], urlparts.join("/")
    }
    return url;
}

function trustHtml(html) {
    return sce.trustAsHtml(html);
}

var schemadefaultbehaviour = {
    OMTAdmin: {
        description: 'Clase miembro administrador',
        name: 'OMTAdmin',
        maxresults: 50,
        populate: [{ path: 'user' }],
        fields: {
            default: schemafields['OMTAdmin'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'none' },
            { role: 'dmc', permission: 'none' },
            { role: 'traveler', permission: 'none' }]
    },
    Affiliate: {
        description: 'Clase miembro afiliado/agencia',
        name: 'Affiliate',
        maxresults: 50,
        populate: [{ path: 'user' }, { path: 'wlcustom' }],
        fields: {
            default: schemafields['Affiliate'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'none' },
            { role: 'traveler', permission: 'none' }],
        list: {
            name: 'Affiliate',
            title: 'Affiliates',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-affiliates.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/nothing.html',
            tableconfiguration: {
                maxresults: 30,
                orderby: 'createdOn',
                collectionname: 'Affiliate',
                sorting: 'asc',
                fields: [
                    "_id",
                    "code",
                    "name",
                    "slug",
                    "company",
                    "contact",,
                    "membership",
                    "omtcomment",
                    "fees",
                    "companynameindexing",
                    "contactnameindexing",
                    "companylocationindexing",
                    "user",
                    "wlcustom",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'user' }, { path: 'wlcustom' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function (item) {
                    window.open('/edit/account?code=' + item.code + '&usertype=affiliate');
                },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {
                            
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'agencia',
                        modelproperty: 'company.name',
                        html: false,
                        value: function (item) {
                            return item.company.name || item.name;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('company.name');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'grupo',
                        modelproperty: 'company.group',
                        value: function (item) { return item.company.group; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('company.group');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'codigo',
                        modelproperty: 'code',
                        value: function (item) { return item['code']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('code');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'f.creacion',
                        modelproperty: 'createdOn',
                        value: function (item) {
                            return printDate(item.createdOn);
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'contacto',
                        modelproperty: 'contact.firstname',
                        value: function (item) {
                            var title = '';
                            title = item.contact != null ? [item.contact.lastname, item.contact.firstname].join(' ') : '';
                            return title;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('contact.firstname');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'ciudad',
                        modelproperty: 'company.location.city',
                        value: function (item) {
                            var city = '';
                            city = item.company != null && item.company.location != null ? item.company.location.city : '';
                            return city;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('company.location.city');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'pais',
                        modelproperty: 'company.location.country',
                        value: function (item) {
                            var country = '';
                            country = item.company != null && item.company.location != null ? item.company.location.country : '';
                            return country;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('company.location.country');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'margen T.Sense',
                        modelproperty: 'membership.omtmargin',
                        value: function (item) {
                            var mgt = 3;
                            mgt = item.membership != null && item.membership.omtmargin > 0 ? item.membership.omtmargin : 3;
                            return mgt.toString() + '%';
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('membership.omtmargin');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'fee',
                        modelproperty: 'fees.unique',
                        value: function (item) {
                            var mgt = 0;
                            mgt = item.fees != null ? item.fees.unique : 0;
                            return mgt.toString() + '%';
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('fees.unique');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'contrato',
                        modelproperty: 'membership.colaborationagree',
                        value: function (item) {
                            var ct = false;
                            ct = item.membership != null ? item.membership.colaborationagree : ct;
                            var rs = ct ? 'si' : 'no';
                            return rs;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'status',
                        modelproperty: 'membership.registervalid',
                        html: true,
                        value: function (item) {
                            var ct = 'waiting';
                            var icon = {
                                "valid": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> valid</span>',
                                "waiting": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> waiting</span>',
                                "confirmed": '<span class="label-item label label-primary"><i class="fa fa-check-circle"></i> confirmed</span>'
                            };
                            ct = item.membership != null && item.membership.registervalid ? 'valid' : ct;
                            return trustHtml(icon[ct]);
                        },
                        sortable: false,
                        onclick: function () { },
                    }
                ],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    BookedProducts: {
        description: 'Model para Productos reservados, es un snapshot del producto en el momento de la reserva',
        name: 'BookedProducts',
        maxresults: 20,
        populate: [
            { path: 'dmc' }, { path: 'departurecity' }, { path: 'stopcities' },
            { path: 'sleepcity' }, { path: 'departurecountry' }, { path: 'stopcountry' },
            { path: 'sleepcountry' }],
        fields: {
            default: schemafields['BookedProducts'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: '*' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'none' }]
    },
    Billing: {
        description: 'Model para facturacion/reservas',
        name: 'Billing',
        maxresults: 20,
        populate: [
            { path: 'products' }, { path: 'dmc' }, { path: 'traveler' },
            { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
            { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
            { path: 'invoices' }, { path: 'relatedbooking' }],
        fields: {
            default: schemafields['Bookings2']
        },
        list: {
            name: 'Billing',
            title: 'Facturacion',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-dates-like-billing.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/shortcut-buttons-bookings.html?d=' + new Date(),
            tableconfiguration: {
                maxresults: 20,
                orderby: 'createdOn',
                collectionname: 'Bookings2',
                sorting: 'desc',
                fields: ["_id",
                    "idBooking",
                    "idBookingExt",
                    "breakdown",
                    "code",
                    "agentid",
                    "agencyid",
                    "bookingmodel",
                    "paymentmodel",
                    "dates",
                    "previousstatus",
                    "status",
                    "chargestatus",
                    "paystatusprovider",
                    "paystatusagency",
                    "startdateindexing",
                    "enddateindexing",
                    "createdonindexing",
                    "affiliateindexing",
                    "dmcindexing",
                    "destinationindexing",
                    "paxindexing",
                    "textindexing",
                    "products",
                    "dmc",
                    "affiliate",
                    "pricing",
                    "paxes",
                    "payments",
                    "rooms",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'products', select: '_id code name title title_es _id itinerary sleepcountry sleepcity dmc', populate: [{ path: 'dmc', model: 'DMCs' }] },
                    { path: 'dmc', select: '_id code name company currency' }, { path: 'traveler', select: '_id code firstname lastname'},
                    { path: 'affiliate', select: '_id code name company' }, 
                    { path: 'payments' }, { path: 'invoices' }, { path: 'relatedbooking' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html?d=' + new Date(),
                onitemclick: function (item) {
                    var url = list_name != 'budgets' ?
                        '/edit/booking?code=' + item.code :
                        'http://' + location.host + '/booking/' + item.products[0].slug_es + '/?datein=' + printDate(item['dates']['start']['date']) + '&budget=' + item.code;
                    window.open(url);
                },
                columns: [
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'Loc. yourttoo',
                        modelproperty: 'idBooking',
                        value: function (item) { return item['idBooking']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('idBooking');
                        }
                    },
                    {
                        roles: ['affiliate'],
                        label: 'Exp.Agencia',
                        modelproperty: 'idBookingExt',
                        value: function (item) { return item['idBookingExt']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('idBookingExt');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'DMC',
                        modelproperty: 'dmc.company.name',
                        value: function (item) { return item['dmc']['company']['name']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dmcindexing');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'Fecha pago',
                        modelproperty: 'dates.finalpayment.date',
                        html: false,
                        value: function (item) {
                            var dend = new Date(item.dates.finalpayment.date);
                            var text = '';
                            text = printDate(dend) || text;
                            return text;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dates.finalpayment.date');
                        }
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'Pago',
                        modelproperty: 'breakdown.provider.net',
                        value: function (item) { return item['breakdown']['provider']['net'].toString() + ' ' + item.dmc.currency.symbol; },
                        sortable: false,
                        style: 'white-space: nowrap;',
                        onclick: function (querier) {
                            //querier.setSorting('dmcindexing');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'f.Creacion',
                        modelproperty: 'createdOn',
                        value: function (item) { return printDate(item.createdOn); },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'f.Salida',
                        modelproperty: 'dates.start.date',
                        value: function (item) { return printDate(item['dates']['start']['date']); },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dates.start.date');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'Agencia',
                        style: 'border-left: 2px #999999 solid',
                        modelproperty: 'affiliateindexing',
                        value: function (item) { var affi = item.affiliate != null ? item.affiliate.company.name : ''; return affi; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('affiliateindexing');
                        },
                    },
                    {
                        roles: ['affiliate'],
                        label: 'comision',
                        modelproperty: 'breakdown.agency.net',
                        value: function (item) {
                            var am = 0;
                            am = item.bookingmodel == 'whitelabel' &&
                                item.breakdown != null &&
                                item.breakdown.agency != null &&
                                item.breakdown.agency.wl != null ? item.breakdown.agency.wl.total : '-';
                            return am.toString() + (am.toString() != '-' ? item.pricing.currency.symbol : '');
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['affiliate'],
                        label: 'total (neto)',
                        modelproperty: 'breakdown.agency.net',
                        value: function (item) {
                            var am = 0;
                            am = item.bookingmodel != 'whitelabel' &&
                                item.breakdown != null && item.breakdown.agency != null ? item.breakdown.agency.net : '-';
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am.toString() + currency;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Neto tierra',
                        modelproperty: 'breakdown.agency.net',
                        value: function (item) {
                            var am = 0;
                            am = item.breakdown.agency.net;
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am.toString() + currency;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Fecha 1º cobro',
                        modelproperty: 'chargefeatures.first.date',
                        value: function (item) {
                            var d = null;
                            item.chargefeatures != null && item.chargefeatures.first != null && item.chargefeatures.first.date != null ? d = printDate(item.chargefeatures.first.date) : null;
                            return d;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('chargefeatures.first.date');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: '1º Cobro',
                        modelproperty: 'chargefeatures.first.amount',
                        value: function (item) {
                            var am = 0;
                            item.chargefeatures != null && item.chargefeatures.first != null && item.chargefeatures.first.amount != null ? d = am = item.chargefeatures.first.amount : null;
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am != '-' ? am.toFixed(2) + currency : '-';
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Cobrado',
                        modelproperty: 'payments.amount',
                        value: function (item) {
                            var charges = _.filter(item.payments, function (pay) { return pay.action == 'charge'; });
                            var am = 0;
                            charges != null && charges.length > 0 ? am = charges[0].amount : null;
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am != '-' ? am.toFixed(2) + currency : '-';
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Fecha resto cobro',
                        modelproperty: 'chargefeatures.second.date',
                        value: function (item) {
                            var d = null;
                            item.chargefeatures != null && item.chargefeatures.second != null && item.chargefeatures.second.date != null ? d = printDate(item.chargefeatures.second.date) : null;
                            return d;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('chargefeatures.second.date');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'Resto cobro',
                        modelproperty: 'chargefeatures.second.amount',
                        value: function (item) {
                            var am = 0;
                            item.chargefeatures != null && item.chargefeatures.second != null && item.chargefeatures.second.amount != null ? d = am = item.chargefeatures.second.amount : null;
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am != '-' ? am.toFixed(2) + currency : '-';
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Cobrado',
                        modelproperty: 'payments.amount',
                        value: function (item) {
                            var charges = _.filter(item.payments, function (pay) { return pay.action == 'charge'; });
                            var am = 0;
                            charges != null && charges.length > 1 ? am = charges[1].amount : null;
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am != '-' ? am.toFixed(2) + currency : '-';
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['affiliate'],
                        label: 'pagado',
                        modelproperty: 'breakdown.charges.current',
                        value: function (item) {
                            var am = 0;
                            am = item.bookingmodel != 'whitelabel' &&
                                item.breakdown != null && item.breakdown.charges != null ? item.breakdown.charges.current : '-';
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am.toString() + currency;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['affiliate'],
                        label: 'pendiente',
                        modelproperty: 'breakdown.charges.pending',
                        value: function (item) {
                            var am = 0;
                            am = item.bookingmodel != 'whitelabel' &&
                                item.breakdown != null && item.breakdown.charges != null ? item.breakdown.charges.pending : '-';
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am.toString() + currency;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['affiliate'],
                        label: '%',
                        modelproperty: 'breakdown.charges.total',
                        value: function (item) {
                            var am = 0;
                            am = item.bookingmodel != 'whitelabel' &&
                                item.breakdown != null && item.breakdown.charges != null ? Math.round((item.breakdown.charges.current * 100) / item.breakdown.charges.total) : '-';
                            return am.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['affiliate', 'dmc'],
                        label: 'fecha',
                        modelproperty: 'dates.finalpayment.date',
                        value: function (item) { return printDate(item['dates']['finalpayment']['date']); },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dates.finalpayment.date');
                        },
                    },
                    {
                        roles: ['affiliate'],
                        label: 'status',
                        modelproperty: 'paystatusagency',
                        class: null,
                        html: true,
                        value: function (item) {
                            var chargestatus = 'pending.payment';
                            item.breakdown.charges.pending <= 0 ? chargestatus = 'ok.payment' : chargestatus = 'pending.payment';
                            item.bookingmodel == 'whitelabel' && item.breakdown.payments.pendingagency > 0 ? chargestatus = 'pending.charge' : chargestatus = 'ok.payment';  
                            var icon = {
                                "end": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Confirmada</span>',
                                "ok.payment": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Ok</span>',
                                "onbudget": '<span class="label-item label label-danger"><i class="fa fa-warning"></i> Error</span>',
                                "invalid": '<span class="label-item label label-danger"><i class="fa fa-times-circle"></i> Cancelada</span>',
                                "error": '<span class="label-item text-red label label-danger"><i class="fa fa-warning"></i> Error</span>',
                                "pending.payment": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> Pdte. Pago</span>',
                                "pending.charge": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> Pdte. Cobro</span>',
                                "cancelled": '<span class="label-item label label-danger"><i class="fa fa-times-circle"></i> Cancelada</span>'
                            }
                            return trustHtml(icon[chargestatus]);
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: 'invoicestravelersense.file.url',
                        html: true,
                        value: function (item) {
                            var html = '';
                            item.bookingmodel != 'whitelabel' && item.invoicestravelersense != null && item.invoicestravelersense.length > 0 ?
                                html = '<a href=\"' + item.invoicestravelersense[0].file.url + '\"><i class="fa fa-file fa-lg"></i></a>' : html = '';
                            item.bookingmodel == 'whitelabel' && item.invoicesagency != null && item.invoicesagency.length > 0 ?
                                html = '<a href=\"' + item.invoicesagency[0].file.url + '\"><i class="fa fa-file fa-lg"></i></a>' : html = '';
                            return trustHtml(html);
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Total Fact.',
                        modelproperty: 'chargestatus',
                        style: 'border-left: 2px #999999 solid',
                        html: false,
                        value: function (item) {
                            var am = 0;
                            item.bookingmodel == 'whitelabel' ? am = item.breakdown.agency.wl.total : null;
                            var currency = am != '-' ? item.pricing.currency.symbol : '';
                            return am.toString() + currency;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'IVA MB',
                        html: false,
                        style: 'white-space: nowrap;',
                        value: function (item) {
                            var text = item.bookingmodel == 'whitelabel' ? '(' + item.pricing.iva + ' %) ' + item.breakdown.agency.wl.ivaamount.toString() + ' ' + item.pricing.currency.symbol : '';
                            return text;
                        },
                        sortable: false,
                        onclick: function () { }
                    },
                    {
                        roles: ['admin'],
                        label: 'Fecha pago MB',
                        html: false,
                        value: function (item) {
                            var dend = new Date(item.dates.end.date);
                            var d_end_1 = new Date(dend.getFullYear(), dend.getMonth(), 20);
                            var d_end_2 = new Date(dend.getFullYear(), dend.getMonth() + 1, 5);
                            var text = item.bookingmodel == 'whitelabel' && dend.getDate() < 16 ?
                                printDate(d_end_1) : '';
                            text = item.bookingmodel == 'whitelabel' && dend.getDate() >= 16 ?
                                printDate(d_end_2) : text;
                            return text;
                        },
                        sortable: false,
                        onclick: function () { }
                    }
                ]
            },
            startHook: function (ts_table_browser) {
                ts_table_browser.pushQueryTerm('bookingmodel', { $ne: 'budget' });
                ts_table_browser.pushQueryTerm('status', { $nin: ['onbudget', 'cancelled', 'discard', 'error'] });
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    Bookings: {
        description: 'Model para reservas - progresivamente en desuso',
        name: 'Bookings',
        maxresults: 20,
        populate: [
            { path: 'productDmc' }, { path: 'dmc' }, { path: 'traveler' },
            { path: 'affiliate' }],
        fields: {
            default: schemafields['Bookings'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'self' }]
    },
    Bookings2: {
        description: 'Model para reservas',
        name: 'Bookings2',
        maxresults: 20,
        populate: [
            { path: 'products' }, { path: 'dmc' }, { path: 'traveler' },
            { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
            { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
            { path: 'invoices' }, { path: 'relatedbooking' }],
        fields: {
            default: schemafields['Bookings2']
        },
        list: {
            name:  'Bookings',
            title: 'Reservas',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-dates-like-dmc-affi.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/shortcut-buttons-bookings.html',
            tableconfiguration: {
                maxresults: 20,
                orderby: 'createdOn',
                collectionname: 'Bookings2',
                sorting: 'desc',
                fields: ["_id",
                    "idBooking",
                    "idBookingExt",
                    "code",
                    "agentid",
                    "agencyid",
                    "bookingmodel",
                    "paymentmodel",
                    "breakdown",
                    "dates",
                    "previousstatus",
                    "status",
                    "chargestatus",
                    "paystatusprovider",
                    "paystatusagency",
                    "startdateindexing",
                    "enddateindexing",
                    "createdonindexing",
                    "affiliateindexing",
                    "dmcindexing",
                    "destinationindexing",
                    "paxindexing",
                    "textindexing",
                    "products",
                    "dmc",
                    "affiliate",
                    "query",
                    "quote",
                    "stories",
                    "signin",
                    "pricing",
                    "paxes",
                    "rooms",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'products', select: '_id code name title title_es slug slug_es _id itinerary sleepcountry sleepcity' },
                    { path: 'dmc', select: '_id code name company membership currency' }, { path: 'traveler' },
                    { path: 'affiliate', select: '_id code name company' }, { path: 'query' }, { path: 'quote' },
                    { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
                    { path: 'invoices' }, { path: 'relatedbooking' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function (item) {
                    var url = list_name != 'budgets' ?
                        '/edit/booking?code=' + item.code : 
                        'http://' + location.host + '/booking/' + item.products[0].slug_es + '/?datein=' + printDate(item['dates']['start']['date']) + '&budget=' + item.code;
                    window.open(url);
                },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'Loc. yourttoo',
                        modelproperty: 'idBooking',
                        value: function (item) { return item['idBooking']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('idBooking');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'Agencia',
                        modelproperty: 'affiliate',
                        value: function (item) { var affi = item.affiliate != null ? item.affiliate.company.name || item.affiliate.name : ''; return affi; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('affiliateindexing');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate'],
                        label: 'Exp.Agencia',
                        modelproperty: 'idBookingExt',
                        value: function (item) { return item['idBookingExt']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('idBookingExt');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate'],
                        label: 'F.Creacion',
                        modelproperty: 'createdOn',
                        value: function (item) { return printDate(item['createdOn']); },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'F.Salida',
                        modelproperty: 'dates.start.date',
                        value: function (item) { return printDate(item['dates']['start']['date']); },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dates.start.date');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'Programa',
                        modelproperty: 'products',
                        class: null,
                        html: true,
                        value: function (item) {
                            var rs = item.products != null && item.products.length > 0 ? '<a title="' + item.products[0].title_es + ' codigo: ' + item.products[0].code + 
                                '" target=\"_blank\" href=\"/viaje/' + item.products[0].slug_es + '\">' +
                                item.products[0].title_es || item.products[0].title + '</a>' : '';
                            return rs;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'Titular',
                        modelproperty: 'signin',
                        value: function (item) {
                            var titular = (item.signin != null) ? item['signin']['name'] + ' ' + item['signin']['lastname'] : '';
                            titular == '' && item.paxes != null && item.paxes.length > 0 ? item.paxes[0]['name'] + ' ' + item.paxes[0]['lastname'] : null;
                            return titular
                        },
                        sortable: false,
                        onclick: function () {
                            
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'Destino',
                        modelproperty: 'destinationindexing',
                        value: function (item) {
                            var dest = (item.products[0].buildeditinerary.countriesfull_es != null &&
                                item.products[0].buildeditinerary.countriesfull_es.length > 0 && 
                                typeof(item.products[0].buildeditinerary.countriesfull_es.join) === 'function') ?
                                item.products[0].buildeditinerary.countriesfull_es.join(', ') : '';
                            return dest
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('destinationindexing');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'DMC',
                        modelproperty: 'dmcindexing',
                        value: function (item) { return item['dmc']['company']['name']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dmcindexing');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'Estado',
                        modelproperty: 'status',
                        class: null,
                        html: true,
                        value: function (item) {
                            var budgetstatus = '<span><span class="label-item" > <i class="fa fa-check-circle"></i> Creado</span></span>';
                            var icon = {
                                "end": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Confirmada</span>',
                                "ok.charges": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Confirmada</span>',
                                "commited": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Confirmada</span>',
                                "onbudget": '<span class="label-item label label-danger"><i class="fa fa-warning"></i> Cancelada</span>',
                                "invalid": '<span class="label-item label label-danger"><i class="fa fa-times-circle"></i> Cancelada</span>',
                                "error": '<span class="label-item text-red label label-danger"><i class="fa fa-warning"></i> Error</span>',
                                "pending.charges": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> Confirmada</span>',
                                "cancelled": '<span class="label-item label label-danger"><i class="fa fa-times-circle"></i> Cancelada</span>'
                            }
                            var rs = list_name != 'budgets' ? trustHtml(icon[item['status']]) : budgetstatus;
                            return rs;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'Pago',
                        class: null,
                        modelproperty: 'paystatusprovider',
                        html: true,
                        value: function (item) {
                            var icon = {
                                "end": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Confirmada</span>',
                                "ok.payment": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> Pagado</span>',
                                "onbudget": '<span class="label-item text-red label label-danger"><i class="fa fa-warning"></i> Error</span>',
                                "invalid": '<span class="label-item label label-danger"><i class="fa fa-times-circle"></i> Cancelada</span>',
                                "error": '<span class="label-item label label-danger"><i class="fa fa-warning"></i> Error</span>',
                                "pending.charges": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> Pdte. Cobro</span>',
                                "pending.payment": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> Pdte. Pago</span>',
                                "cancelled": '<span class="label-item label label-danger"><i class="fa fa-times-circle"></i> Cancelada</span>'
                            }
                            var def = '<span class="label-item label label-warning"><i class="fa fa-warning"></i> Pdte. Pago</span>';
                            var r = trustHtml(icon[item['paystatusprovider']]) || def;
                            return r;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'Forma Pago',
                        class: null,
                        modelproperty: 'paymentmodel',
                        html: true,
                        value: function (item) {
                            var icon = {
                                "transfer-split": '<span class="label-item label label-success">Fraccionado</span>',
                                "transfer-100": '<span class="label-item label label-success">Pago 100%</span>',
                                "tpv-split": '<span class="label-item label label-success">Fraccionado</span>',
                                "tpv-100": '<span class="label-item label label-success">Pago 100%</span>'
                            }
                            var def = '';
                            var r = trustHtml(icon[item['paymentmodel']]) || def;
                            return r;
                        },
                        sortable: false,
                        onclick: function () { },
                    }],

            },
            startHook: function (ts_table_browser) {
                list_name != 'budgets' ? null : this.title = 'Presupuestos';
                list_name != 'budgets' ? ts_table_browser.pushQueryTerm('bookingmodel', { $ne: 'budget' }) : ts_table_browser.pushQueryTerm('bookingmodel', 'budget');
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    Chats: {
        description: 'Model para chats - presente en bookings y taylormade',
        name: 'Chats',
        maxresults: 50,
        populate: [
            { path: 'userquery' }, { path: 'booking' }, { path: 'quote' },
            { path: 'traveler' }, { path: 'dmc' }, { path: 'affiliate' }],
        fields: {
            default: schemafields['Chats'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'self' }]
    },
    DestinationCities: {
        description: 'Model para cities - es una vista de la coleccion cities en cms-openmarket',
        name: 'DestinationCities',
        populate: [{ path: 'country' }],
        maxresults: 50,
        fields: {
            default: schemafields['DestinationCities'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: '*' },
            { role: 'dmc', permission: '*' },
            { role: 'traveler', permission: '*' }]
    },
    DestinationCountries: {
        description: 'Model para countries - es una vista de la coleccion countries en cms-openmarket',
        name: 'DestinationCountries',
        populate: [{ path: 'zone' }],
        maxresults: 50,
        fields: {
            default: schemafields['DestinationCountries'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: '*' },
            { role: 'dmc', permission: '*' },
            { role: 'traveler', permission: '*' }]
    },
    DestinationCountriesZones: {
        description: 'Model para zones - es una vista de la coleccion zones en cms-openmarket',
        name: 'DestinationCountriesZones',
        populate: null,
        maxresults: 50,
        fields: {
            default: schemafields['DestinationCountriesZones'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: '*' },
            { role: 'dmc', permission: '*' },
            { role: 'traveler', permission: '*' }]
    },
    DMCs: {
        description: 'Model para DMCs - proveedores de servicios/products',
        name: 'DMCs',
        maxresults: 50,
        populate: [{ path: 'contactuser' }, { path: 'user' }, { path: 'admin' }],
        fields: {
            default: schemafields['DMCs'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: '*' },
            { role: 'dmc', permission: '*' },
            { role: 'traveler', permission: '*' }],
        list: {
            name: 'DMCs',
            title: 'DMCs',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-dmcs.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/nothing.html',
            tableconfiguration: {
                maxresults: 20,
                orderby: 'createdonindexing',
                collectionname: 'DMCs',
                sorting: 'asc',
                fields: [
                    "_id",
                    "code",
                    "name",
                    "vouchername",
                    "slug",
                    "status",
                    "contact",
                    "bankinfo",
                    "membershipDate",
                    "membership",
                    "images",
                    "currency",
                    "timeZone",
                    "omtcomment",
                    "user",
                    "admin",
                    "contactuser",
                    "delegations",
                    "company",
                    "additionalinfo",
                    "tourEscorts",
                    "tags",
                    "expenditure",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'user', select: '_id code name email isAdmin isTraveler isAffiliate isDMC' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function (item) {
                    window.open('/edit/account?code=' + item.code + '&usertype=dmc');
                },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'code',
                        modelproperty: 'code',
                        value: function (item) { return item['code']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('code');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'name',
                        modelproperty: 'company.name',
                        html: true,
                        value: function(item) {
                            var cmp = item.company != null ? item.company.name : '';
                            var lgl = item.company != null ? item.company.legalname : '';
                            var rs = ['<strong>', cmp, '</strong> | ', lgl].join('');
                            cmp == '' && lgl == '' ? rs = item.name : null; 
                            return rs;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('company.name');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'channels',
                        modelproperty: 'membership',
                        value: function (item) {
                            var channels = [];
                            item.membership != null && item.membership.b2cchannel ? channels.push('B2C') : null;
                            item.membership != null && item.membership.b2bchannel ? channels.push('B2B') : null;
                            return channels.join(', ')
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'taylor made',
                        modelproperty: 'membership.taylormade',
                        value: function (item) {
                            var ok = item.membership != null && item.membership.tailormade ? item.membership.tailormade : false;
                            var str = ok ? 'OK' : 'NO';
                            return str;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'groups',
                        modelproperty: 'membership.groups',
                        value: function (item) {
                            var ok = item.membership != null && item.membership.groups ? item.membership.groups : false;
                            var str = ok ? 'OK' : 'NO';
                            return str;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    //{
                    //    roles: ['admin'],
                    //    label: 'tags',
                    //    modelproperty: 'tags.label',
                    //    value: function (item) {
                    //        var tags = item.tags != null && item.tags.length > 0 ? _.map(item.tags, function (tag) { return tag.label; }) : [];
                    //        return _.uniq(tags.sort()).join(', ');
                    //    },
                    //    sortable: true,
                    //    onclick: function (querier) {
                    //        querier.setSorting('tags.label');
                    //    },
                    //},
                    {
                        roles: ['admin'],
                        label: 'destinations',
                        modelproperty: 'company.operatein',
                        value: function (item) {
                            var cts = item.company != null && item.company.operatein != null && item.company.operatein.length > 0 ?
                                _.map(item.company.operatein, function (operates) { return operates.operateLocation.country; }) : [];
                            return _.uniq(cts.sort()).join(', ');
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('company.operatein');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'email',
                        modelproperty: 'contact.email',
                        value: function (item) { var email = item['contact']['email'] || ''; return email;  },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('contact.email');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'status',
                        modelproperty: 'status',
                        class: null,
                        html: true,
                        badge: false,
                        value: function (item) {
                            var icon = {
                                "valid": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> valid</span>',
                                "waiting": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> waiting</span>',
                                "confirmed": '<span class="label-item label label-primary"><i class="fa fa-check-circle"></i> confirmed</span>'
                            };
                            
                            return trustHtml(icon[item.status]);
                        },
                        sortable: true,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'comission',
                        class: null,
                        modelproperty: 'membership.commission',
                        value: function (item) {
                            var comissions = [];
                            item.membership != null && item.membership.commission ? comissions.push('B2C : ' + item.membership.commission) : null;
                            item.membership != null && item.membership.b2bcommission ? comissions.push('B2B : ' + item.membership.b2bcommission) : null;
                            return comissions.join(' | ')
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('membership.commission');
                        },
                    }],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    DMCProducts: {
        description: 'Model para Produts DMC - Products de DMC/TaylorMade',
        name: 'DMCProducts',
        maxresults: 20,
        populate: [
            { path: 'dmc' }, { path: 'departurecity' }, { path: 'stopcities' },
            { path: 'sleepcity' }, { path: 'departurecountry' }, { path: 'stopcountry' },
            { path: 'sleepcountry' }],
        fields: {
            default: schemafields['DMCProducts'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: '*' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: '*' }],
        list: {
            name: 'DMCProducts',
            title: 'DMC Programs',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-products.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/shortcut-buttons-programs.html',
            tableconfiguration: {
                maxresults: 20,
                orderby: 'createdOn',
                collectionname: 'DMCProducts',
                sorting: 'desc',
                fields: [
                    "_id",
                    "name",
                    "title",
                    "title_es",
                    "slug",
                    "slug_en",
                    "slug_es",
                    "publishedDate",
                    "publishState",
                    "code",
                    "dmccode",
                    "parent",
                    "release",
                    "availabilitytill",
                    "productimage",
                    "pvp",
                    "channels",
                    "priceindexing",
                    "priceb2bindexing",
                    "itinerarylength",
                    "itinerarylengthindexing",
                    "dmcindexing",
                    "destinationindexing",
                    "productvalid",
                    "dmc",
                    "origin",
                    "sleepcity",
                    "sleepcountry",
                    "categoryname.label_es",
                    "categoryname.label_en",
                    "minprice",
                    "itinerary",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'dmc', select: '_id code name company.name company.legalname currency' }, { path: 'sleepcountry'}],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function (item) {
                    window.open('/edit/programs?code=' + item.code);
                },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'image',
                        modelproperty: 'productimage',
                        html: true,
                        value: function (item) {
                            return '<img src=\"' + imageproductstretch(item.productimage.url) + '\" class=\"imgprodlist\" />';
                        },
                        sortable: false,
                        onclick: function () { }
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'code',
                        modelproperty: 'code',
                        value: function (item) { return item['code']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('code');
                        }
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'save as',
                        modelproperty: 'name',
                        html: false,
                        value: function (item) {
                            return item.name;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('name');
                        },
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'tour name',
                        modelproperty: 'title',
                        html: true,
                        value: function (item) {
                            var name = item.title_es || item.title;
                            var ct = '';
                            var category = item.categoryname != null && (item.categoryname.label_es != '' || item.categoryname.label_en != '') ?
                                item.categoryname.label_es || item.categoryname.label_en : '';
                            category != '' ? ct += ' (' + category + ')' : null;
                            return '<strong>' + name + '</strong>' + ct;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('title');
                        },
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'F.Creacion',
                        modelproperty: 'createdOn',
                        value: function (item) { return printDate(item['createdOn']); },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'destination',
                        modelproperty: 'destinationindexing',
                        value: function (item) {
                            var dst = item.sleepcountry != null && item.sleepcountry.length > 0 ? _.map(item.sleepcountry, function (ct) { return ct.label_es; }) : [];
                            dst.sort();
                            var str = dst.join(', ');
                            return str;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('destinationindexing');
                        },
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'duration (days)',
                        modelproperty: 'itinerarylength',
                        value: function (item) {
                            var ln = item.itinerarylength != null ? item.itinerarylength : 0;
                            ln = item.itinerary != null && item.itinerary.length > 0 ? item.itinerary.length : ln; 
                            return ln.toString();
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('destinationindexing');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'dmc',
                        modelproperty: 'dmc',
                        value: function (item) {
                            var name = item.dmc != null ? item.dmc.name : '';
                            name = item.dmc != null && item.dmc.company != null ? item.dmc.company.name : name;
                            return name;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dmcindexing');
                        },
                    },
                    //{
                    //    roles: ['admin'],
                    //    label: 'price/day',
                    //    modelproperty: 'pvp.b2cperday',
                    //    value: function (item) {
                    //        var priceday = [];
                    //        item.pvp != null ? (priceday.push('B2C: ' + item.pvp.b2cperday), priceday.push('B2B: ' + item.pvp.b2bperday)) : null;
                    //        return priceday.join(' | ');
                    //    },
                    //    sortable: true,
                    //    onclick: function (querier) {
                    //        querier.setSorting('pvp.b2cperday');
                    //    },
                    //},
                    {
                        roles: ['admin', 'dmc'],
                        label: 'min. price',
                        modelproperty: 'pvp.b2c',
                        value: function (item) {
                            var priceday = [];
                            item.pvp != null ? (priceday.push('B2C: ' + item.pvp.b2c), priceday.push('B2B: ' + item.pvp.b2b)) : null;
                            return priceday.join(' | ');
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('pvp.b2c');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'currency',
                        modelproperty: 'dmc.currency.symbol',
                        value: function (item) {
                            var curr = item.dmc != null && item.dmc.currency != null ? item.dmc.currency.symbol : '';
                            return curr;
                        },
                        sortable: false,
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'availabilitytill',
                        modelproperty: 'availabilitytill',
                        value: function (item) {
                            var t = printDate(item.availabilitytill);
                            return t;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('availabilitytill');
                        },
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'status',
                        modelproperty: 'publishState',
                        class: null,
                        html: true,
                        badge: false,
                        value: function (item) {
                            var icon = {
                                "published": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> published</span>',
                                "published.noavail": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> no dispo</span>',
                                "draft": '<span class="label-item label label-primary"><i class="fa fa-check-circle"></i> draft</span>',
                                "unpublished": '<span class="label-item label label-danger"><i class="fa fa-check-circle"></i> unpublished</span>',
                                "under review": '<span class="label-item label label-primary review"><i class="fa fa-check-circle"></i> under review</span>'
                            };

                            return trustHtml(icon[item.publishState]);
                        },
                        sortable: true,
                        onclick: function () { },
                    }],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.pushQueryTerm('origin', { $ne: 'tailormade' }); 
                ts_table_browser.pushQueryTerm('parent', null);
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    Hevents: {
        description: 'Model para Hevents - Eventos en Background para sistema Traverler Sense',
        name: 'Hevents',
        maxresults: 20,
        populate: [{ path: 'subscribermessages' }],
        fields: {
            default: schemafields['Hevents'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'none' },
            { role: 'dmc', permission: 'none' },
            { role: 'traveler', permission: 'none' }],
        list: {
            name: 'Hevents',
            title: 'Events on Traveler Sense',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-hevents.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/nothing.html',
            tableconfiguration: {
                maxresults: 10,
                orderby: 'createdOn',
                collectionname: 'Hevents',
                sorting: 'asc',
                fields: [
                    "_id",
                    "code",
                    "slug",
                    "subject",
                    "action",
                    "delivereddate",
                    "state",
                    "createdonindexing",
                    "subscribermessages",
                    "createdOn",
                    "updatedOn",
                ],
                populate: [{ path: 'subscribermessages', select: '_id code slug subject action lasterrordate commitdate subscribertaskdone state subscriberslist' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function () { },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'code',
                        modelproperty: 'code',
                        html: false,
                        value: function (item) {
                            return item.code;
                        },
                        sortable: false,
                        onclick: function () { }
                    },
                    {
                        roles: ['admin'],
                        label: 'subject',
                        modelproperty: 'subject',
                        value: function (item) { return item['subject']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('subject');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'action',
                        modelproperty: 'action',
                        html: false,
                        value: function (item) {
                            return item.action;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('action');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'date',
                        modelproperty: 'createdOn',
                        html: false,
                        value: function (item) {
                            return printDate(item.createdOn);
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'state',
                        modelproperty: 'state',
                        value: function (item) {
                            return item.state;
                        },
                        sortable: false,
                        onclick: function (querier) {
                            querier.setSorting('state');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'subscribers actions',
                        modelproperty: 'subscribermessages',
                        value: function (item) {
                            var items = item.subscribermessages != null && item.subscribermessages.length > 0 ? item.subscribermessages.length : 0;
                            return items.toString();
                        },
                        sortable: false,
                        onclick: function () {
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'subscribers done',
                        modelproperty: 'subscribermessages.subscribertaskdone',
                        value: function (item) {
                            var done = item.subscribermessages != null && item.subscribermessages.length > 0 ? item.subscribermessages[0].subscribertaskdone : false;
                            var str = done ? 'yes' : 'no';
                            return str;
                        },
                        sortable: false,
                        onclick: function () {
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'subscriber state',
                        modelproperty: 'subscribermessages.state',
                        value: function (item) {
                            var statr = item.subscribermessages != null && item.subscribermessages.length > 0 ? item.subscribermessages[0].state : '-';
                            return statr;
                        },
                        sortable: false,
                        onclick: function () {
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'subscriber name',
                        modelproperty: 'subscribermessages.subscriberslist',
                        value: function (item) {
                            var subs = item.subscribermessages != null && item.subscribermessages.length > 0 ? item.subscribermessages[0].subscriberslist : [];
                            return subs.join(' // ');
                        },
                        sortable: false,
                        onclick: function () {
                        },
                    }],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    Invoices: {
        description: 'Model para Produts Invoices - Facturas, presentes en Booking',
        name: 'Invoices',
        maxresults: 50,
        populate: [{ path: 'booking' }],
        fields: {
            get: function (core) { return getfields(core, 'Invoices') },
            default: schemafields['Invoices'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'none' }]
    },
    Stories: {
        description: 'Model para Stories - Historias de usuario, booking ... storytype indica el si se trata de historio o comentario',
        name: 'Stories',
        maxresults: 100,
        populate: [{ path: 'parentid', model: 'Bookings2' }],
        fields: {
            default: schemafields['Stories'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'none' }]
    },
    Payments: {
        description: 'Model para Pagos/Cobros - action indica si se trata de un cobro(charge) o un pago(pay)',
        name: 'Payments',
        populate: [{ path: 'booking' }],
        maxresults: 50,
        fields: {
            default: schemafields['Payments'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'self' }]
    },
    Quotes: {
        description: 'Model para Quotes - respuesta de un DMC a una Query o TaylorMade',
        name: 'Quotes',
        maxresults: 50,
        populate: [{ path: 'chat' }, { path: 'products' }],
        fields: {
            default: schemafields['Quotes'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'self' }],
        list: {
            name: 'Quotes',
            title: 'Taylor Made Quotes',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-dates-like.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/shortcut-buttons-queries.html',
            tableconfiguration: {
                maxresults: 20,
                orderby: 'createdOn',
                collectionname: 'Quotes',
                sorting: 'asc',
                fields: [
                    "_id",
                    "title_en",
                    "title_es",
                    "code",
                    "slug",
                    "publishedDate",
                    "description",
                    "name",
                    "createdonindexing",
                    "responseDetails",
                    "products",
                    "userqueryCode",
                    "userqueryId",
                    "idBooking",
                    "travelercode",
                    "affiliatecode",
                    "dmccode",
                    "operationStart",
                    "operationStartDate",
                    "quoteValidUntil",
                    "quoteValidDate",
                    "chat",
                    "status",
                    "comission",
                    "isB2C",
                    "b2bcommission",
                    "omtmargin",
                    "fees.unique",
                    "fees.groups",
                    "fees.tailormade",
                    "fees.flights",
                    "rooms",
                    "children",
                    "netPrice",
                    "amount",
                    "pvpAffiliate",
                    "cancelled",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'dmcs', select: '_id code name company.name company.legalname' },
                    { path: 'quotes', select: '_id code status publishedDate' }, { path: 'traveler', select: '_id code firstname lastname' },
                    { path: 'affiliate', select: '_id code name company.name' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function () { },
                columns: [
                    {
                        roles: ['admin'],
                        label: 'agencia',
                        modelproperty: 'affiliate',
                        html: false,
                        value: function (item) {
                            var affi = item.affiliate != null ? item.affiliate.company.name || item.affiliate.name : 'OMT';
                            return affi;
                        },
                        sortable: true,
                        onclick: function () {

                        }
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'localizador',
                        modelproperty: 'code',
                        value: function (item) { return item['code']; },
                        sortable: true,
                        onclick: function () { }
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'f.creacion',
                        modelproperty: 'createdOn',
                        value: function (item) {
                            return printDate(item.createdOn);
                        },
                        sortable: true,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'f.salida',
                        modelproperty: 'dates.arrivaldate',
                        value: function (item) {
                            var arrival = '';
                            if (item.dates != null && item.dates.knowingdates) {
                                arrival = item.dates != null && item.dates.arrivaldate != null ? printDate(item.dates.arrivaldate) : '';
                            }
                            else {
                                arrival = [tools.getMonthNameSpanish(datestring(item.dates.arrivaldate).getMonth(), 'short'),
                                    datestring(item.dates.arrivaldate).getFullYear(),
                                    '(week ' + item.dates.week + ')'].join(' ');
                            }
                            return arrival;
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'destinos',
                        modelproperty: 'destinations',
                        value: function (item) {
                            var dst = item.destinations != null && item.destinations.length > 0 ? _.map(item.destinations, function (ct) { return ct.country; }) : [];
                            dst.sort();
                            var str = _.uniq(dst).join(', ');
                            return str;
                        },
                        sortable: true,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin', 'dmc'],
                        label: 'estado',
                        modelproperty: 'state',
                        html: true,
                        value: function (item) {
                            var icon = {
                                "requested": '<span class="label-item label label-primary review"><i class="fa fa-check-circle"></i> nueva</span>',
                                "waiting dmc": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> en proceso</span>',
                                "quoted": '<span class="label-item label label-warning"><i class="fa fa-check-circle"></i> en proceso</span>',
                                "waiting user": '<span class="label-item label label-danger"><i class="fa fa-check-circle"></i> p. usuario</span>',
                                "close": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> reservada</span>',
                                "cancelled": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> cancelada</span>'
                            };

                            return trustHtml(icon[item.state]);
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'dmcs asignados',
                        modelproperty: 'dmcs',
                        value: function (item) {
                            return item.dmcs.length.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'pendiente validar',
                        modelproperty: 'quotes.status',
                        value: function (item) {
                            var total = 0;
                            total = item.quotes != null && item.quotes.length > 0 ? _.filter(item.quotes, function (q) { return q.status == 'under review' }).length : 0;
                            return total.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'enviadas',
                        modelproperty: 'quotes.status',
                        value: function (item) {
                            var total = 0;
                            total = item.quotes != null && item.quotes.length > 0 ? _.filter(item.quotes, function (q) { return q.status == 'published' }).length : 0;
                            return total.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    }],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    Travelers: {
        description: 'Model para Traveler - Viajeros/Clientes/Usuarios de plataform B2C (omt)',
        name: 'Travelers',
        maxresults: 50,
        populate: [{ path: 'user' }],
        fields: {
            default: schemafields['Travelers'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'none' },
            { role: 'dmc', permission: 'none' },
            { role: 'traveler', permission: 'self' }],
        list: {
            name: 'Travelers',
            title: 'Travelers',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-travelers.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/nothing.html',
            tableconfiguration: {
                maxresults: 30,
                orderby: 'createdOn',
                collectionname: 'Travelers',
                sorting: 'asc',
                fields: [
                    "_id",
                    "code",
                    "firstname",
                    "lastname",
                    "slug",
                    "phone",
                    "email",
                    "skype",
                    "dateofbirth",
                    "location",
                    "cif",
                    "nif",
                    "membershipDate",
                    "user",
                    "currency",
                    "timeZone",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'user' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function () { },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'first name',
                        modelproperty: 'firstname',
                        html: false,
                        value: function (item) {
                            return item.firstname;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('firstname');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'code',
                        modelproperty: 'code',
                        value: function (item) { return item['code']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('code');
                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'f.creacion',
                        modelproperty: 'createdOn',
                        value: function (item) {
                            return printDate(item.createdOn);
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'phone',
                        modelproperty: 'phone',
                        value: function (item) {
                            return item.phone;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('phone');
                        },
                    },
                    {
                        roles: ['admin'],
                        label: 'email',
                        modelproperty: 'email',
                        value: function (item) {
                            return item.email;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('email');
                        },
                    }],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    UserQueries: {
        description: 'Model para Queries - Estructura para peticiones Tailor Made (OMT y YTO)',
        name: 'UserQueries',
        maxresults: 50,
        populate: [
            { path: 'quotes' }, { path: 'traveler' }, { path: 'affiliate' },
            { path: 'dmcs' }, { path: 'chats' }],
        fields: {
            default: schemafields['UserQueries'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'self' }],
        list: {
            name: 'UserQueries',
            title: 'Tailor Made Requests',
            filterbox: '/js/angular/components/ts-filterboxes/templates/panes/filter-dates-like-dmc-affi.html',
            filtershortcuts: '/js/angular/components/ts-filterboxes/templates/toolbar/shortcut-buttons-queries.html',
            tableconfiguration: {
                maxresults: 20,
                orderby: 'createdOn',
                collectionname: 'UserQueries',
                sorting: 'desc',
                fields: [
                    "_id",
                    "title",
                    "slug",
                    "name",
                    "code",
                    "travelercode",
                    "affiliatecode",
                    "publishedDate",
                    "createdonindexing",
                    "startdateindexing",
                    "destinationsindexing",
                    "destinationsindexingen",
                    "stateindexing",
                    "holderindexing",
                    "titleindexing",
                    "affiliateindexing",
                    "idBooking",
                    "dates",
                    "hosting",
                    "budget",
                    "group",
                    "quotes",
                    "traveler",
                    "affiliate",
                    "dmcs",
                    "state",
                    "affiliateuser",
                    "quotesstates",
                    "destinations",
                    "cancelled.cancelDate",
                    "roomDistribution",
                    "passengers",
                    "createdOn",
                    "updatedOn"
                ],
                populate: [{ path: 'dmcs', select: '_id code name company.name company.legalname' },
                    { path: 'quotes', select: '_id code status publishedDate' }, { path: 'traveler', select: '_id code firstname lastname' },
                    { path: 'affiliate', select: '_id code name company.name' }],
                tableitemtemplate: '/js/angular/components/ts-tables/templates/default-item.html',
                onitemclick: function (item) {
                    window.open('/edit/request?code=' + item.code);
                },
                columns: [
                    {
                        roles: ['admin'],
                        label: '',
                        modelproperty: '',
                        html: true,
                        value: function (item) {
                            var html = '<button tittle=\"click here to delete\" class=\"btn btn-xs btn-danger\"><i class=\"fa fa-trash-o\"></button>'
                            return html;
                        },
                        deleteaction: function ($event, item, querier) {
                            querier.deleteItem(item, $event);
                        },
                        onclick: function (querier) {

                        }
                    },
                    {
                        roles: ['admin'],
                        label: 'agencia',
                        modelproperty: 'affiliateindexing',
                        html: false,
                        value: function (item) {
                            var affi = item.affiliate != null ? item.affiliate.company.name || item.affiliate.name : 'OMT';
                            return affi;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('affiliateindexing');
                        }
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'localizador',
                        modelproperty: 'code',
                        value: function (item) { return item['code']; },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('code');
                        }
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'f.creacion',
                        modelproperty: 'createdOn',
                        value: function (item) {
                            return printDate(item.createdOn);
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('createdOn');
                        },
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'f.salida',
                        modelproperty: 'dates.arrivaldate',
                        value: function (item) {
                            var arrival = '';
                            if (item.dates != null && item.dates.knowingdates) {
                                arrival = item.dates != null && item.dates.arrivaldate != null ? printDate(item.dates.arrivaldate) : '';
                            }
                            else {
                                arrival = [tools.getMonthNameSpanish(item.dates.arrival.month, 'short'),
                                    item.dates.arrival.year,
                                    '(week ' + item.dates.week + ')'].join(' ');
                            }
                            return arrival;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('dates.arrivaldate');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate'],
                        label: 'identificacion',
                        modelproperty: 'title',
                        value: function (item) {
                            return item.title;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('title');
                        },
                    },
                    {
                        roles: ['admin', 'dmc', 'affiliate'],
                        label: 'destinos',
                        modelproperty: 'destinationsindexing',
                        value: function (item) {
                            var dst = item.destinations != null && item.destinations.length > 0 ? _.map(item.destinations, function (ct) { return ct.country; }) : [];
                            dst.sort();
                            var str = _.uniq(dst).join(', ');
                            return str;
                        },
                        sortable: true,
                        onclick: function (querier) {
                            querier.setSorting('destinationsindexing');
                        },
                    },
                    {
                        roles: ['admin', 'affiliate', 'dmc'],
                        label: 'estado',
                        modelproperty: 'state',
                        html: true,
                        value: function (item) {
                            var icon = {
                                "requested": loginsession.user.rolename == 'admin' ? '<span class="label-item label label-primary review"><i class="fa fa-check-circle"></i> nueva</span>' : '<span class="label-item label label-warning"><i class="fa fa-warning"></i> en proceso</span>',
                                "waiting dmc": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> en proceso</span>',
                                "quoted": '<span class="label-item label label-warning"><i class="fa fa-check-circle"></i> en proceso</span>',
                                "waiting user": '<span class="label-item label label-warning"><i class="fa fa-warning"></i> p. usuario</span>',
                                "close": '<span class="label-item label label-success"><i class="fa fa-check-circle"></i> reservada</span>',
                                "cancelled": '<span class="label-item label label-primary"><i class="fa fa-warning"></i> cancelada</span>'
                            };

                            return trustHtml(icon[item.state]);
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'dmcs asignados',
                        modelproperty: 'dmcs',
                        value: function (item) {
                            return item.dmcs.length.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin'],
                        label: 'pendiente validar',
                        modelproperty: 'quotes.status',
                        value: function (item) {
                            var total = 0;
                            total = item.quotes != null && item.quotes.length > 0 ? _.filter(item.quotes, function (q) { return (q.status != 'published' && q.status != 'win') }).length : 0;
                            return total.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    },
                    {
                        roles: ['admin', 'affiliate'],
                        label: 'cotizaciones',
                        modelproperty: 'quotes.status',
                        value: function (item) {
                            var total = 0;
                            total = item.quotes != null && item.quotes.length > 0 ? _.filter(item.quotes, function (q) { return q.status == 'published' }).length : 0;
                            total = loginsession.user.isAdmin && item.quotes != null ? item.quotes.length : total;
                            return total.toString();
                        },
                        sortable: false,
                        onclick: function () { },
                    }],

            },
            startHook: function (ts_table_browser) {
                ts_table_browser.goPage(null, 0);
            }
        }
    },
    Users: {
        description: 'Model para Usuarios - Clase base/no abstracta que heredan todos los miembros (Affiliate, Traveler, OMTAdmin, DMC)',
        name: 'Users',
        maxresults: 500,
        populate: [{ path: 'roles', populate: 'permissions' }],
        fields: {
            default: schemafields['Users'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'none' },
            { role: 'dmc', permission: 'none' },
            { role: 'traveler', permission: 'none' }]
    },
    WLCustomizations: {
        description: 'Model para White label personalizacion - contiene los ajustes de personalizacion de marcablanca',
        name: 'Users',
        maxresults: 50,
        populate: [{ path: 'roles', populate: 'permissions' }],
        fields: {
            default: schemafields['Users'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'none' },
            { role: 'traveler', permission: 'none' }]
    }
}

var tsImhotep = {
    getCollectionConfig : function (collectionname) {
        return schemadefaultbehaviour[collectionname];
    }
}