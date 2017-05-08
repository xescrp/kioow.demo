var _schemadefaultbehaviour = {
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
            { role: 'traveler', permission: 'none' }]
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
            default: schemafields['Bookings2'],
            common: '*'
        },
        roles: [
            { role: 'admin', permission: '*' },
            { role: 'affiliate', permission: 'self' },
            { role: 'dmc', permission: 'self' },
            { role: 'traveler', permission: 'self' }]
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
            { role: 'traveler', permission: '*' }]
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
            { role: 'traveler', permission: '*' }]
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
            { role: 'traveler', permission: 'self' }]
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
            { role: 'traveler', permission: 'self' }]
    },
    UserQueries: {
        description: 'Model para Queries - Estructura para peticiones Taylor Made (OMT y YTO)',
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
            { role: 'traveler', permission: 'self' }]
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