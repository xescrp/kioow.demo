var mailspath = 'C:/development/node/yourttoo/resources/public/partials/transactional-emails';
module.exports = {
    Generic: {
        template: {
            path: mailspath + '/genericlayout.html.swig',
            subject: 'Core Report - %process%',
            sender: 'sender@yourttoo.com',
            replaces: ['process']
        }
    },
    Bookings: {
        whitelabel: {
            "new": {
                affiliate: {
                    path: mailspath + '/wl/templates/wl-affiliate-new-booking/wl-affiliate-new-booking.html.swig',
                    subject: 'Reserva - %idbooking%',
                    sender: 'sender@yourttoo.com',
                    replaces: ['idbooking']
                },
                travelersense: {
                    path: mailspath + '/wl/templates/wl-new-booking/wl-new-booking.html.swig',
                    subject: 'Nueva reserva de afiliado [WL] - %idbooking%',
                    sender: 'sender@yourttoo.com',
                    replaces: ['idbooking']
                },
                dmc: {
                    path: mailspath + '/wl/templates/wl-dmc-new-booking/wl-dmc-new-booking.html.swig',
                    subject: 'New Booking %idbooking%',
                    sender: 'sender@openmarket.travel',
                    replaces: ['idbooking']
                },
                traveler: {
                    path: mailspath + '/wl/templates/wl-user-prebooking/wl-user-prebooking.html.swig',
                    subject: 'Recibido pago de la reserva %idbooking%',
                    sender: 'sender@openmarket.travel',
                    replaces: ['idbooking']
                }
            },
            pay: {
                affiliate: {
                    path: mailspath + '/wl/templates/wl-affiliate-new-booking/wl-affiliate-new-booking.html.swig',
                    subject: 'Reserva - %idbooking%',
                    sender: 'sender@yourttoo.com',
                    replaces: ['idbooking']
                },
                travelersense: {
                    path: mailspath + '/wl/templates/wl-new-booking/wl-new-booking.html.swig',
                    subject: 'Nueva reserva de afiliado [WL] - %idbooking%',
                    sender: 'sender@yourttoo.com',
                    replaces: ['idbooking']
                },
                dmc: {
                    path: mailspath + '/wl/templates/wl-dmc-new-booking/wl-dmc-new-booking.html.swig',
                    subject: 'New Booking %idbooking%',
                    sender: 'sender@openmarket.travel',
                    replaces: ['idbooking']
                },
                traveler: {
                    path: mailspath + '/wl/templates/wl-user-prebooking/wl-user-prebooking.html.swig',
                    subject: 'Recibido pago de la reserva %idbooking%',
                    sender: 'sender@openmarket.travel',
                    replaces: ['idbooking']
                }
            },
            update: {
                affiliate: '',
                travelersense: '',
                dmc: '',
                traveler: ''
            }
        },
        b2c: {
            affiliate: '',
            travelersense: '',
            dmc: '',
            traveler: ''
        },
        b2b: {
            affiliate: 'ytoaffiliatebooking',
            travelersense: '',
            dmc: '',
            traveler: ''
        }
    }
};