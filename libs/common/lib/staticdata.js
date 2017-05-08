var countriesFile = require('./data/countries');
var iataFile = require('./data/iata2');

var timezones = [
    {
        timeZoneId: "1",
        gmtAdjustment: "GMT-12:00",
        useDaylightTime: "0",
        value: "-12",
        label: "(GMT-12:00) International Date Line West"
    },
    {
        timeZoneId: "2",
        gmtAdjustment: "GMT-11:00",
        useDaylightTime: "0",
        value: "-11",
        label: "(GMT-11:00) Midway Island, Samoa"
    },
    {
        timeZoneId: "3",
        gmtAdjustment: "GMT-10:00",
        useDaylightTime: "0",
        value: "-10",
        label: "(GMT-10:00) Hawaii"
    },
    {
        timeZoneId: "4",
        gmtAdjustment: "GMT-09:00",
        useDaylightTime: "1",
        value: "-9",
        label: "(GMT-09:00) Alaska"
    },
    {
        timeZoneId: "5",
        gmtAdjustment: "GMT-08:00",
        useDaylightTime: "1",
        value: "-8",
        label: "(GMT-08:00) Pacific Time (US & Canada)"
    },
    {
        timeZoneId: "6",
        gmtAdjustment: "GMT-08:00",
        useDaylightTime: "1",
        value: "-8",
        label: "(GMT-08:00) Tijuana, Baja California"
    },
    {
        timeZoneId: "7",
        gmtAdjustment: "GMT-07:00",
        useDaylightTime: "0",
        value: "-7",
        label: "(GMT-07:00) Arizona"
    },
    {
        timeZoneId: "8",
        gmtAdjustment: "GMT-07:00",
        useDaylightTime: "1",
        value: "-7",
        label: "(GMT-07:00) Chihuahua, La Paz, Mazatlan"
    },
    {
        timeZoneId: "9",
        gmtAdjustment: "GMT-07:00",
        useDaylightTime: "1",
        value: "-7",
        label: "(GMT-07:00) Mountain Time (US & Canada)"
    },
    {
        timeZoneId: "10",
        gmtAdjustment: "GMT-06:00",
        useDaylightTime: "0",
        value: "-6",
        label: "(GMT-06:00) Central America"
    },
    {
        timeZoneId: "11",
        gmtAdjustment: "GMT-06:00",
        useDaylightTime: "1",
        value: "-6",
        label: "(GMT-06:00) Central Time (US & Canada)"
    },
    {
        timeZoneId: "12",
        gmtAdjustment: "GMT-06:00",
        useDaylightTime: "1",
        value: "-6",
        label: "(GMT-06:00) Guadalajara, Mexico City, Monterrey"
    },
    {
        timeZoneId: "13",
        gmtAdjustment: "GMT-06:00",
        useDaylightTime: "0",
        value: "-6",
        label: "(GMT-06:00) Saskatchewan"
    },
    {
        timeZoneId: "14",
        gmtAdjustment: "GMT-05:00",
        useDaylightTime: "0",
        value: "-5",
        label: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
    },
    {
        timeZoneId: "15",
        gmtAdjustment: "GMT-05:00",
        useDaylightTime: "1",
        value: "-5",
        label: "(GMT-05:00) Eastern Time (US & Canada)"
    },
    {
        timeZoneId: "16",
        gmtAdjustment: "GMT-05:00",
        useDaylightTime: "1",
        value: "-5",
        label: "(GMT-05:00) Indiana (East)"
    },
    {
        timeZoneId: "17",
        gmtAdjustment: "GMT-04:00",
        useDaylightTime: "1",
        value: "-4",
        label: "(GMT-04:00) Atlantic Time (Canada)"
    },
    {
        timeZoneId: "18",
        gmtAdjustment: "GMT-04:00",
        useDaylightTime: "0",
        value: "-4",
        label: "(GMT-04:00) Caracas, La Paz"
    },
    {
        timeZoneId: "19",
        gmtAdjustment: "GMT-04:00",
        useDaylightTime: "0",
        value: "-4",
        label: "(GMT-04:00) Manaus"
    },
    {
        timeZoneId: "20",
        gmtAdjustment: "GMT-04:00",
        useDaylightTime: "1",
        value: "-4",
        label: "(GMT-04:00) Santiago"
    },
    {
        timeZoneId: "21",
        gmtAdjustment: "GMT-03:30",
        useDaylightTime: "1",
        value: "-3.5",
        label: "(GMT-03:30) Newfoundland"
    },
    {
        timeZoneId: "22",
        gmtAdjustment: "GMT-03:00",
        useDaylightTime: "1",
        value: "-3",
        label: "(GMT-03:00) Brasilia"
    },
    {
        timeZoneId: "23",
        gmtAdjustment: "GMT-03:00",
        useDaylightTime: "0",
        value: "-3",
        label: "(GMT-03:00) Buenos Aires, Georgetown"
    },
    {
        timeZoneId: "24",
        gmtAdjustment: "GMT-03:00",
        useDaylightTime: "1",
        value: "-3",
        label: "(GMT-03:00) Greenland"
    },
    {
        timeZoneId: "25",
        gmtAdjustment: "GMT-03:00",
        useDaylightTime: "1",
        value: "-3",
        label: "(GMT-03:00) Montevideo"
    },
    {
        timeZoneId: "26",
        gmtAdjustment: "GMT-02:00",
        useDaylightTime: "1",
        value: "-2",
        label: "(GMT-02:00) Mid-Atlantic"
    },
    {
        timeZoneId: "27",
        gmtAdjustment: "GMT-01:00",
        useDaylightTime: "0",
        value: "-1",
        label: "(GMT-01:00) Cape Verde Is."
    },
    {
        timeZoneId: "28",
        gmtAdjustment: "GMT-01:00",
        useDaylightTime: "1",
        value: "-1",
        label: "(GMT-01:00) Azores"
    },
    {
        timeZoneId: "29",
        gmtAdjustment: "GMT+00:00",
        useDaylightTime: "0",
        value: "0",
        label: "(GMT+00:00) Casablanca, Monrovia, Reykjavik"
    },
    {
        timeZoneId: "30",
        gmtAdjustment: "GMT+00:00",
        useDaylightTime: "1",
        value: "0",
        label: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
    },
    {
        timeZoneId: "31",
        gmtAdjustment: "GMT+01:00",
        useDaylightTime: "1",
        value: "1",
        label: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
    },
    {
        timeZoneId: "32",
        gmtAdjustment: "GMT+01:00",
        useDaylightTime: "1",
        value: "1",
        label: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
    },
    {
        timeZoneId: "33",
        gmtAdjustment: "GMT+01:00",
        useDaylightTime: "1",
        value: "1",
        label: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"
    },
    {
        timeZoneId: "34",
        gmtAdjustment: "GMT+01:00",
        useDaylightTime: "1",
        value: "1",
        label: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
    },
    {
        timeZoneId: "35",
        gmtAdjustment: "GMT+01:00",
        useDaylightTime: "1",
        value: "1",
        label: "(GMT+01:00) West Central Africa"
    },
    {
        timeZoneId: "36",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Amman"
    },
    {
        timeZoneId: "37",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Athens, Bucharest, Istanbul"
    },
    {
        timeZoneId: "38",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Beirut"
    },
    {
        timeZoneId: "39",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Cairo"
    },
    {
        timeZoneId: "40",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "0",
        value: "2",
        label: "(GMT+02:00) Harare, Pretoria"
    },
    {
        timeZoneId: "41",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
    },
    {
        timeZoneId: "42",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Jerusalem"
    },
    {
        timeZoneId: "43",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Minsk"
    },
    {
        timeZoneId: "44",
        gmtAdjustment: "GMT+02:00",
        useDaylightTime: "1",
        value: "2",
        label: "(GMT+02:00) Windhoek"
    },
    {
        timeZoneId: "45",
        gmtAdjustment: "GMT+03:00",
        useDaylightTime: "0",
        value: "3",
        label: "(GMT+03:00) Kuwait, Riyadh, Baghdad"
    },
    {
        timeZoneId: "46",
        gmtAdjustment: "GMT+03:00",
        useDaylightTime: "1",
        value: "3",
        label: "(GMT+03:00) Moscow, St. Petersburg, Volgograd"
    },
    {
        timeZoneId: "47",
        gmtAdjustment: "GMT+03:00",
        useDaylightTime: "0",
        value: "3",
        label: "(GMT+03:00) Nairobi"
    },
    {
        timeZoneId: "48",
        gmtAdjustment: "GMT+03:00",
        useDaylightTime: "0",
        value: "3",
        label: "(GMT+03:00) Tbilisi"
    },
    {
        timeZoneId: "49",
        gmtAdjustment: "GMT+03:30",
        useDaylightTime: "1",
        value: "3.5",
        label: "(GMT+03:30) Tehran"
    },
    {
        timeZoneId: "50",
        gmtAdjustment: "GMT+04:00",
        useDaylightTime: "0",
        value: "4",
        label: "(GMT+04:00) Abu Dhabi, Muscat"
    },
    {
        timeZoneId: "51",
        gmtAdjustment: "GMT+04:00",
        useDaylightTime: "1",
        value: "4",
        label: "(GMT+04:00) Baku"
    },
    {
        timeZoneId: "52",
        gmtAdjustment: "GMT+04:00",
        useDaylightTime: "1",
        value: "4",
        label: "(GMT+04:00) Yerevan"
    },
    {
        timeZoneId: "53",
        gmtAdjustment: "GMT+04:30",
        useDaylightTime: "0",
        value: "4.5",
        label: "(GMT+04:30) Kabul"
    },
    {
        timeZoneId: "54",
        gmtAdjustment: "GMT+05:00",
        useDaylightTime: "1",
        value: "5",
        label: "(GMT+05:00) Yekaterinburg"
    },
    {
        timeZoneId: "55",
        gmtAdjustment: "GMT+05:00",
        useDaylightTime: "0",
        value: "5",
        label: "(GMT+05:00) Islamabad, Karachi, Tashkent"
    },
    {
        timeZoneId: "56",
        gmtAdjustment: "GMT+05:30",
        useDaylightTime: "0",
        value: "5.5",
        label: "(GMT+05:30) Sri Jayawardenapura"
    },
    {
        timeZoneId: "57",
        gmtAdjustment: "GMT+05:30",
        useDaylightTime: "0",
        value: "5.5",
        label: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"
    },
    {
        timeZoneId: "58",
        gmtAdjustment: "GMT+05:45",
        useDaylightTime: "0",
        value: "5.75",
        label: "(GMT+05:45) Kathmandu"
    },
    {
        timeZoneId: "59",
        gmtAdjustment: "GMT+06:00",
        useDaylightTime: "1",
        value: "6",
        label: "(GMT+06:00) Almaty, Novosibirsk"
    },
    {
        timeZoneId: "60",
        gmtAdjustment: "GMT+06:00",
        useDaylightTime: "0",
        value: "6",
        label: "(GMT+06:00) Astana, Dhaka"
    },
    {
        timeZoneId: "61",
        gmtAdjustment: "GMT+06:30",
        useDaylightTime: "0",
        value: "6.5",
        label: "(GMT+06:30) Yangon (Rangoon)"
    },
    {
        timeZoneId: "62",
        gmtAdjustment: "GMT+07:00",
        useDaylightTime: "0",
        value: "7",
        label: "(GMT+07:00) Bangkok, Hanoi, Jakarta"
    },
    {
        timeZoneId: "63",
        gmtAdjustment: "GMT+07:00",
        useDaylightTime: "1",
        value: "7",
        label: "(GMT+07:00) Krasnoyarsk"
    },
    {
        timeZoneId: "64",
        gmtAdjustment: "GMT+08:00",
        useDaylightTime: "0",
        value: "8",
        label: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
    },
    {
        timeZoneId: "65",
        gmtAdjustment: "GMT+08:00",
        useDaylightTime: "0",
        value: "8",
        label: "(GMT+08:00) Kuala Lumpur, Singapore"
    },
    {
        timeZoneId: "66",
        gmtAdjustment: "GMT+08:00",
        useDaylightTime: "0",
        value: "8",
        label: "(GMT+08:00) Irkutsk, Ulaan Bataar"
    },
    {
        timeZoneId: "67",
        gmtAdjustment: "GMT+08:00",
        useDaylightTime: "0",
        value: "8",
        label: "(GMT+08:00) Perth"
    },
    {
        timeZoneId: "68",
        gmtAdjustment: "GMT+08:00",
        useDaylightTime: "0",
        value: "8",
        label: "(GMT+08:00) Taipei"
    },
    {
        timeZoneId: "69",
        gmtAdjustment: "GMT+09:00",
        useDaylightTime: "0",
        value: "9",
        label: "(GMT+09:00) Osaka, Sapporo, Tokyo"
    },
    {
        timeZoneId: "70",
        gmtAdjustment: "GMT+09:00",
        useDaylightTime: "0",
        value: "9",
        label: "(GMT+09:00) Seoul"
    },
    {
        timeZoneId: "71",
        gmtAdjustment: "GMT+09:00",
        useDaylightTime: "1",
        value: "9",
        label: "(GMT+09:00) Yakutsk"
    },
    {
        timeZoneId: "72",
        gmtAdjustment: "GMT+09:30",
        useDaylightTime: "0",
        value: "9.5",
        label: "(GMT+09:30) Adelaide"
    },
    {
        timeZoneId: "73",
        gmtAdjustment: "GMT+09:30",
        useDaylightTime: "0",
        value: "9.5",
        label: "(GMT+09:30) Darwin"
    },
    {
        timeZoneId: "74",
        gmtAdjustment: "GMT+10:00",
        useDaylightTime: "0",
        value: "10",
        label: "(GMT+10:00) Brisbane"
    },
    {
        timeZoneId: "75",
        gmtAdjustment: "GMT+10:00",
        useDaylightTime: "1",
        value: "10",
        label: "(GMT+10:00) Canberra, Melbourne, Sydney"
    },
    {
        timeZoneId: "76",
        gmtAdjustment: "GMT+10:00",
        useDaylightTime: "1",
        value: "10",
        label: "(GMT+10:00) Hobart"
    },
    {
        timeZoneId: "77",
        gmtAdjustment: "GMT+10:00",
        useDaylightTime: "0",
        value: "10",
        label: "(GMT+10:00) Guam, Port Moresby"
    },
    {
        timeZoneId: "78",
        gmtAdjustment: "GMT+10:00",
        useDaylightTime: "1",
        value: "10",
        label: "(GMT+10:00) Vladivostok"
    },
    {
        timeZoneId: "79",
        gmtAdjustment: "GMT+11:00",
        useDaylightTime: "1",
        value: "11",
        label: "(GMT+11:00) Magadan, Solomon Is., New Caledonia"
    },
    {
        timeZoneId: "80",
        gmtAdjustment: "GMT+12:00",
        useDaylightTime: "1",
        value: "12",
        label: "(GMT+12:00) Auckland, Wellington"
    },
    {
        timeZoneId: "81",
        gmtAdjustment: "GMT+12:00",
        useDaylightTime: "0",
        value: "12",
        label: "(GMT+12:00) Fiji, Kamchatka, Marshall Is."
    },
    {
        timeZoneId: "82",
        gmtAdjustment: "GMT+13:00",
        useDaylightTime: "0",
        value: "13",
        label: "(GMT+13:00) Nuku'alofa"
    }
];

var currencys = [
    { label: "Euro", symbol: "€", value: "EUR" },
    { label: "US dolar", symbol: "USD", value: "USD" }
];

var bankcountries = [
    { value: "AFG", label: "Afghanistan" },
    { value: "ALA", label: "Åland Islands" },
    { value: "ALB", label: "Albania" },
    { value: "DZA", label: "Algeria" },
    { value: "ASM", label: "American Samoa" },
    { value: "AND", label: "Andorra" },
    { value: "AGO", label: "Angola" },
    { value: "AIA", label: "Anguilla" },
    { value: "ATA", label: "Antarctica" },
    { value: "ATG", label: "Antigua and Barbuda" },
    { value: "ARG", label: "Argentina" },
    { value: "ARM", label: "Armenia" },
    { value: "ABW", label: "Aruba" },
    { value: "AUS", label: "Australia" },
    { value: "AUT", label: "Austria" },
    { value: "AZE", label: "Azerbaijan" },
    { value: "BHS", label: "Bahamas" },
    { value: "BHR", label: "Bahrain" },
    { value: "BGD", label: "Bangladesh" },
    { value: "BRB", label: "Barbados" },
    { value: "BLR", label: "Belarus" },
    { value: "BEL", label: "Belgium" },
    { value: "BLZ", label: "Belize" },
    { value: "BEN", label: "Benin" },
    { value: "BMU", label: "Bermuda" },
    { value: "BTN", label: "Bhutan" },
    { value: "BOL", label: "Bolivia, Plurinational State of" },
    { value: "BES", label: "Bonaire, Sint Eustatius and Saba" },
    { value: "BIH", label: "Bosnia and Herzegovina" },
    { value: "BWA", label: "Botswana" },
    { value: "BVT", label: "Bouvet Island" },
    { value: "BRA", label: "Brazil" },
    { value: "IOT", label: "British Indian Ocean Territory" },
    { value: "BRN", label: "Brunei Darussalam" },
    { value: "BGR", label: "Bulgaria" },
    { value: "BFA", label: "Burkina Faso" },
    { value: "BDI", label: "Burundi" },
    { value: "KHM", label: "Cambodia" },
    { value: "CMR", label: "Cameroon" },
    { value: "CAN", label: "Canada" },
    { value: "CPV", label: "Cape Verde" },
    { value: "CYM", label: "Cayman Islands" },
    { value: "CAF", label: "Central African Republic" },
    { value: "TCD", label: "Chad" },
    { value: "CHL", label: "Chile" },
    { value: "CHN", label: "China" },
    { value: "CXR", label: "Christmas Island" },
    { value: "CCK", label: "Cocos (Keeling) Islands" },
    { value: "COL", label: "Colombia" },
    { value: "COM", label: "Comoros" },
    { value: "COG", label: "Congo" },
    { value: "COD", label: "Congo, the Democratic Republic of the" },
    { value: "COK", label: "Cook Islands" },
    { value: "CRI", label: "Costa Rica" },
    { value: "CIV", label: "Côte d'Ivoire" },
    { value: "HRV", label: "Croatia" },
    { value: "CUB", label: "Cuba" },
    { value: "CUW", label: "Curaçao" },
    { value: "CYP", label: "Cyprus" },
    { value: "CZE", label: "Czech Republic" },
    { value: "DNK", label: "Denmark" },
    { value: "DJI", label: "Djibouti" },
    { value: "DMA", label: "Dominica" },
    { value: "DOM", label: "Dominican Republic" },
    { value: "ECU", label: "Ecuador" },
    { value: "EGY", label: "Egypt" },
    { value: "SLV", label: "El Salvador" },
    { value: "GNQ", label: "Equatorial Guinea" },
    { value: "ERI", label: "Eritrea" },
    { value: "EST", label: "Estonia" },
    { value: "ETH", label: "Ethiopia" },
    { value: "FLK", label: "Falkland Islands (Malvinas)" },
    { value: "FRO", label: "Faroe Islands" },
    { value: "FJI", label: "Fiji" },
    { value: "FIN", label: "Finland" },
    { value: "FRA", label: "France" },
    { value: "GUF", label: "French Guiana" },
    { value: "PYF", label: "French Polynesia" },
    { value: "ATF", label: "French Southern Territories" },
    { value: "GAB", label: "Gabon" },
    { value: "GMB", label: "Gambia" },
    { value: "GEO", label: "Georgia" },
    { value: "DEU", label: "Germany" },
    { value: "GHA", label: "Ghana" },
    { value: "GIB", label: "Gibraltar" },
    { value: "GRC", label: "Greece" },
    { value: "GRL", label: "Greenland" },
    { value: "GRD", label: "Grenada" },
    { value: "GLP", label: "Guadeloupe" },
    { value: "GUM", label: "Guam" },
    { value: "GTM", label: "Guatemala" },
    { value: "GGY", label: "Guernsey" },
    { value: "GIN", label: "Guinea" },
    { value: "GNB", label: "Guinea-Bissau" },
    { value: "GUY", label: "Guyana" },
    { value: "HTI", label: "Haiti" },
    { value: "HMD", label: "Heard Island and McDonald Islands" },
    { value: "VAT", label: "Holy See (Vatican City State)" },
    { value: "HND", label: "Honduras" },
    { value: "HKG", label: "Hong Kong" },
    { value: "HUN", label: "Hungary" },
    { value: "ISL", label: "Iceland" },
    { value: "IND", label: "India" },
    { value: "IDN", label: "Indonesia" },
    { value: "IRN", label: "Iran, Islamic Republic of" },
    { value: "IRQ", label: "Iraq" },
    { value: "IRL", label: "Ireland" },
    { value: "IMN", label: "Isle of Man" },
    { value: "ISR", label: "Israel" },
    { value: "ITA", label: "Italy" },
    { value: "JAM", label: "Jamaica" },
    { value: "JPN", label: "Japan" },
    { value: "JEY", label: "Jersey" },
    { value: "JOR", label: "Jordan" },
    { value: "KAZ", label: "Kazakhstan" },
    { value: "KEN", label: "Kenya" },
    { value: "KIR", label: "Kiribati" },
    { value: "PRK", label: "Korea, Democratic People's Republic of" },
    { value: "KOR", label: "Korea, Republic of" },
    { value: "KWT", label: "Kuwait" },
    { value: "KGZ", label: "Kyrgyzstan" },
    { value: "LAO", label: "Lao People's Democratic Republic" },
    { value: "LVA", label: "Latvia" },
    { value: "LBN", label: "Lebanon" },
    { value: "LSO", label: "Lesotho" },
    { value: "LBR", label: "Liberia" },
    { value: "LBY", label: "Libya" },
    { value: "LIE", label: "Liechtenstein" },
    { value: "LTU", label: "Lithuania" },
    { value: "LUX", label: "Luxembourg" },
    { value: "MAC", label: "Macao" },
    { value: "MKD", label: "Macedonia, the former Yugoslav Republic of" },
    { value: "MDG", label: "Madagascar" },
    { value: "MWI", label: "Malawi" },
    { value: "MYS", label: "Malaysia" },
    { value: "MDV", label: "Maldives" },
    { value: "MLI", label: "Mali" },
    { value: "MLT", label: "Malta" },
    { value: "MHL", label: "Marshall Islands" },
    { value: "MTQ", label: "Martinique" },
    { value: "MRT", label: "Mauritania" },
    { value: "MUS", label: "Mauritius" },
    { value: "MYT", label: "Mayotte" },
    { value: "MEX", label: "Mexico" },
    { value: "FSM", label: "Micronesia, Federated States of" },
    { value: "MDA", label: "Moldova, Republic of" },
    { value: "MCO", label: "Monaco" },
    { value: "MNG", label: "Mongolia" },
    { value: "MNE", label: "Montenegro" },
    { value: "MSR", label: "Montserrat" },
    { value: "MAR", label: "Morocco" },
    { value: "MOZ", label: "Mozambique" },
    { value: "MMR", label: "Myanmar" },
    { value: "NAM", label: "Namibia" },
    { value: "NRU", label: "Nauru" },
    { value: "NPL", label: "Nepal" },
    { value: "NLD", label: "Netherlands" },
    { value: "NCL", label: "New Caledonia" },
    { value: "NZL", label: "New Zealand" },
    { value: "NIC", label: "Nicaragua" },
    { value: "NER", label: "Niger" },
    { value: "NGA", label: "Nigeria" },
    { value: "NIU", label: "Niue" },
    { value: "NFK", label: "Norfolk Island" },
    { value: "MNP", label: "Northern Mariana Islands" },
    { value: "NOR", label: "Norway" },
    { value: "OMN", label: "Oman" },
    { value: "PAK", label: "Pakistan" },
    { value: "PLW", label: "Palau" },
    { value: "PSE", label: "Palestinian Territory, Occupied" },
    { value: "PAN", label: "Panama" },
    { value: "PNG", label: "Papua New Guinea" },
    { value: "PRY", label: "Paraguay" },
    { value: "PER", label: "Peru" },
    { value: "PHL", label: "Philippines" },
    { value: "PCN", label: "Pitcairn" },
    { value: "POL", label: "Poland" },
    { value: "PRT", label: "Portugal" },
    { value: "PRI", label: "Puerto Rico" },
    { value: "QAT", label: "Qatar" },
    { value: "REU", label: "Réunion" },
    { value: "ROU", label: "Romania" },
    { value: "RUS", label: "Russian Federation" },
    { value: "RWA", label: "Rwanda" },
    { value: "BLM", label: "Saint Barthélemy" },
    { value: "SHN", label: "Saint Helena, Ascension and Tristan da Cunha" },
    { value: "KNA", label: "Saint Kitts and Nevis" },
    { value: "LCA", label: "Saint Lucia" },
    { value: "MAF", label: "Saint Martin (French part)" },
    { value: "SPM", label: "Saint Pierre and Miquelon" },
    { value: "VCT", label: "Saint Vincent and the Grenadines" },
    { value: "WSM", label: "Samoa" },
    { value: "SMR", label: "San Marino" },
    { value: "STP", label: "Sao Tome and Principe" },
    { value: "SAU", label: "Saudi Arabia" },
    { value: "SEN", label: "Senegal" },
    { value: "SRB", label: "Serbia" },
    { value: "SYC", label: "Seychelles" },
    { value: "SLE", label: "Sierra Leone" },
    { value: "SGP", label: "Singapore" },
    { value: "SXM", label: "Sint Maarten (Dutch part)" },
    { value: "SVK", label: "Slovakia" },
    { value: "SVN", label: "Slovenia" },
    { value: "SLB", label: "Solomon Islands" },
    { value: "SOM", label: "Somalia" },
    { value: "ZAF", label: "South Africa" },
    { value: "SGS", label: "South Georgia and the South Sandwich Islands" },
    { value: "SSD", label: "South Sudan" },
    { value: "ESP", label: "Spain" },
    { value: "LKA", label: "Sri Lanka" },
    { value: "SDN", label: "Sudan" },
    { value: "SUR", label: "Suriname" },
    { value: "SJM", label: "Svalbard and Jan Mayen" },
    { value: "SWZ", label: "Swaziland" },
    { value: "SWE", label: "Sweden" },
    { value: "CHE", label: "Switzerland" },
    { value: "SYR", label: "Syrian Arab Republic" },
    { value: "TWN", label: "Taiwan, Province of China" },
    { value: "TJK", label: "Tajikistan" },
    { value: "TZA", label: "Tanzania, United Republic of" },
    { value: "THA", label: "Thailand" },
    { value: "TLS", label: "Timor-Leste" },
    { value: "TGO", label: "Togo" },
    { value: "TKL", label: "Tokelau" },
    { value: "TON", label: "Tonga" },
    { value: "TTO", label: "Trinidad and Tobago" },
    { value: "TUN", label: "Tunisia" },
    { value: "TUR", label: "Turkey" },
    { value: "TKM", label: "Turkmenistan" },
    { value: "TCA", label: "Turks and Caicos Islands" },
    { value: "TUV", label: "Tuvalu" },
    { value: "UGA", label: "Uganda" },
    { value: "UKR", label: "Ukraine" },
    { value: "ARE", label: "United Arab Emirates" },
    { value: "GBR", label: "United Kingdom" },
    { value: "USA", label: "United States" },
    { value: "UMI", label: "United States Minor Outlying Islands" },
    { value: "URY", label: "Uruguay" },
    { value: "UZB", label: "Uzbekistan" },
    { value: "VUT", label: "Vanuatu" },
    { value: "VEN", label: "Venezuela, Bolivarian Republic of" },
    { value: "VNM", label: "Viet Nam" },
    { value: "VGB", label: "Virgin Islands, British" },
    { value: "VIR", label: "Virgin Islands, U.S." },
    { value: "WLF", label: "Wallis and Futuna" },
    { value: "ESH", label: "Western Sahara" },
    { value: "YEM", label: "Yemen" },
    { value: "ZMB", label: "Zambia" },
    { value: "ZWE", label: "Zimbabwe" }
];

var assistancelanguages = [
        { label: "English", value: "en" },
        { label: "Spanish", value: "sp" },
        { label: "German", value: "ge" },
        { label: "Italian", value: "it" }
];

var paymentoptions = [
    {
        slug: "28before",
        _en: "28 days before the trip",
        _es: "28 días antes del viaje"
    },
    {
        slug: "21before",
        _en: "21 days before the trip",
        _es: "21 días antes del viaje"
    },
    {
        slug: "14before",
        _en: "14 days before the trip",
        _es: "14 días antes del viaje"
    },
    {
        slug: "7before",
        _en: "7 days before the trip",
        _es: "7 días antes del viaje"
    },
    {
        slug: "arrival",
        _en: "Arrival date",
        _es: "Día de llegada del cliente a destino"
    },
    {
        slug: "departure",
        _en: "Last day of the trip",
        _es: "Día de vuelta del cliente del destino"
    }
];

var hermessuscriptions = [
    {
        subject: 'product',
        actions: ['update', 'new', 'delete', 'cityupdate'],
        relatedcollections: ['DMCProducts'] 
    },
    {
        subject: 'user',
        actions: ['login', 'signup', 'update', 'new', 'delete', 'forgotpassword', 'changeemail', 'changepassword'],
        relatedcollections: ['Users']
    },
    {
        subject: 'dmc',
        actions: ['update', 'new', 'delete'],
        relatedcollections: ['DMCs']
    },
    {
        subject: 'traveler',
        actions: ['update', 'new', 'delete'],
        relatedcollections: ['Travelers']
    }, 
    {
        subject: 'affiliate',
        actions: ['update', 'new', 'delete', 'validate'],
        relatedcollections: ['Affiliate']
    },
    {
        subject: 'booking',
        actions: ['update', 'new', 'cancel', 'pay'],
        relatedcollections: ['Bookings']
    },
    {
        subject: 'booking2',
        actions: ['update', 'new', 'cancel', 'pay'],
        relatedcollections: ['Bookings2']
    },
    {
        subject: 'tailormade.queries',
        actions: ['update', 'new', 'delete'],
        relatedcollections: ['UserQueries']
    },
    {
        subject: 'tailormade.quotes',
        actions: ['update', 'new', 'delete'],
        relatedcollections: ['Quotes']
    },
    {
        subject: 'chat',
        actions: ['update', 'new', 'delete'],
        relatedcollections: ['Chats']
    },
    {
        subject: 'cms',
        actions: ['update.city', 'update.country', 'update.zone', 'update.tag'],
        relatedcollections: ['Countries', 'Cities', 'CountriesZones', 'DestinationCountriesZones', 'DestinationCountries', 'DestinationCities']
    },
    {
        subject: 'whitelabel',
        actions: ['new', 'update'],
        relatedcollections: ['WLCustomizations']
    },
    {
        subject: 'backbone',
        actions: ['trace'],
        relatedcollections: ['backbone']
    },
    {
        subject: 'payment',
        actions: ['new', 'update'],
        relatedcollections: ['Payments']
    }
];

var commonpopulate = {
    OMTAdmin: [{ path: 'user' }],
    Affiliate: [{ path: 'user' }, { path: 'wlcustom' }],
    BookedProducts: [
        { path: 'dmc' }, { path: 'departurecity' }, { path: 'stopcities' },
        { path: 'sleepcity' }, { path: 'departurecountry' }, { path: 'stopcountry' },
        { path: 'sleepcountry' }],
    Bookings: [
        { path: 'productDmc' }, { path: 'dmc' }, { path: 'traveler' },
        { path: 'affiliate' }],
    Bookings2: [
        { path: 'products' }, { path: 'dmc' }, { path: 'traveler' },
        { path: 'affiliate' }, { path: 'query' }, { path: 'quote' },
        { path: 'payments' }, { path: 'stories' }, { path: 'signin' },
        { path: 'invoices' }],
    Chats: [
        { path: 'userquery' }, { path: 'booking' }, { path: 'quote' },
        { path: 'traveler' }, { path: 'dmc' }, { path: 'affiliate' }],
    DestinationCities: [{ path: 'country' }],
    DestinationCountries: [{ path: 'zone' }],
    DestinationCountriesZones: [{ path: 'zone' }],
    DMCs: [{ path: 'contactuser' }, { path: 'user' }, { path: 'admin' }],
    DMCProducts: [
        { path: 'dmc' }, { path: 'departurecity' }, { path: 'stopcities' },
        { path: 'sleepcity' }, { path: 'departurecountry' }, { path: 'stopcountry' },
        { path: 'sleepcountry' }],
    Invoices: [{ path: 'booking' }],
    Payments: [{ path: 'booking' }],
    Quotes: [{ path: 'chat' }, { path: 'products' }],
    Roles: [{ path: 'permissions' }],
    Travelers: [{ path: 'user' }],
    UserQueries: [
        { path: 'quotes' }, { path: 'traveler' }, { path: 'affiliate' },
        { path: 'dmcs' }, { path: 'chats' }],
    Users: [{ path: 'roles' }]
}

var enums = {
    paymentmodels: {
        'tpv-100' : { name: 'tpv-100', description: 'pago tpv 100%' }, 
        'tpv-split': { name: 'tpv-split', description: 'pago tpv fraccionado' }, 
        'transfer-100': { name: 'transfer-100', description: 'pago transferencia 100%' }, 
        'transfer-split': { name: 'transfer-split', description: 'pago transferencia fraccionado' }
    },
    bookingmodels: {
        bookingb2c: { name: 'bookingb2c', description: 'booking canal b2c - openmarket.travel' }, 
        bookingb2b: { name: 'bookingb2b', description: 'booking canal b2b - yourttoo.com' }, 
        budgetb2c: { name: 'budget', description: 'prebooking - b2c' },
        budgetb2b: { name: 'budget', description: 'prebooking - b2b' }, 
        taylormadeb2c: { name: 'taylormadeb2c', description: 'booking canal b2c, con origen tailormade - openmarket.travel' }, 
        taylormadeb2cgroups: { name: 'taylormadeb2cgroups', description: 'booking canal b2c, tratamiento de grupos con origen tailormade - openmarket.travel' }, 
        taylormadeb2b: { name: 'taylormadeb2b', description: 'booking canal b2b, con origen tailormade - yourttoo.com' }, 
        taylormadeb2bgroups: { name: 'taylormadeb2bgroups', description: 'booking canal b2b, tratamiento de grupos con origen tailormade - yourttoo.com' }, 
        whitelabel: { name: 'whitelabel', description: 'booking canal b2c, con origen tailormade - openmarket.travel' }
    },
    bookingstates: {
        onbudget: { name: 'onbudget', description: '1-step of booking [pre-booking]' },
        cancelled: { name: 'cancelled', description: 'this booking has been cancelled' },
        discard: { name: 'discard', description: 'this booking has been refused by mistake, error or another reason' },
        commited: { name: 'ok.charges', description: 'this booking has been confirmed, and all the payments has been done' },
        waitingpayments: { name: 'pending.charges', description: 'this booking has been confirmed, but waiting one or more payments' },
        upcomingtrip : { name: 'upcomingtrip', description: 'a commited booking is at the previous days to the traveling date' },
        ondestiny : { name: 'ondestiny', description: 'a commited booking is at the traveling days, previously on upcomingtrip state' },
        end : { name: 'end', description: 'a commited booking has ended its lifecycle' }
    },
    bookingerrorcodes: {
        SIS0051: 'Número de pedido repetido',
        SIS0058: 'Inconsistencia de datos, en la validación de una confrmación',
        SIS0062: 'El importe a confrmar supera el permitido',
        SIS0063: 'Error en número de tarjeta',
        SIS0064: 'Error en número de tarjeta',
        SIS0065: 'Error en número de tarjeta',
        SIS0066: 'Error en caducidad tarjeta',
        SIS0067: 'Error en caducidad tarjeta',
        SIS0068: 'Error en caducidad tarjeta',
        SIS0069: 'Error en caducidad tarjeta',
        SIS0070: 'Error en caducidad tarjeta',
        SIS0071: 'Tarjeta caducada',
        SIS0093: 'Tarjeta no encontrada en tabla de rangos',
        SIS0142: 'Tiempo excedido para el pago',
        SIS0198: 'Importe supera límite permitido para el comercio',
        SIS0199: 'El número de operaciones supera el límite permitido para el comercio',
        SIS0216: 'El CVV2 tiene más de tres posiciones',
        SIS0217: 'Error de formato en CVV2',
        SIS0218: 'La entrada Operaciones no permite pagos seguros',
        SIS0219: 'El número de operaciones	permitido para el comercio',
        SIS0220: 'El importe acumulado de la tarjeta supera el límite permitido para el comercio',
        SIS0221: 'El CVV2 es obligatorio',
        SIS0252: 'El comercio no permite el envío de tarjeta',
        SIS0253: 'La tarjeta no cumple el check-digit',
        SIS0254: 'El número de operaciones por IP supera el máximo permitido para el comercio',
        SIS0255: 'El importe acumulado para el comercio',
        SIS0258: 'Inconsistencia en datos de confrmación',
        SIS0281: 'Operación supera alguna limitación defnida por Banco Sabadell',
        SIS0296: 'Error al validar los datos de la operación Tarjeta en Archivo (P.Suscripciones/P.Exprés)',
        SIS0297: 'Superado el número máximo de operaciones (99 oper. o año) para realizar transacciones sucesivas de Tarjeta en Archivo (P.Suscripciones/P.Exprés). Se requiere realizar una nueva operación de Tarjeta en Archivo Inicial para iniciar el ciclo',
        SIS0298: 'El comercio no está confgurado para Archivo (P.Suscripciones/P.Exprés)',
        SIS0429: 'Error en la versión enviada por el comercio en el parámetro Ds_SignatureVersion',
        SIS0430: 'Error al decodificar el parámetro Ds_MerchantParameters',
        SIS0431: 'Error del objeto JSON que se envía codificado en el parámetro Ds_MerchantParameters',
        SIS0432: 'Error FUC del comercio erróneo',
        SIS0433: 'Error Terminal del comercio erróneo',
        SIS0434: 'Error ausencia de número de pedido en la operación enviada por el comercio',
        SIS0435: 'Error en el cálculo de la firma'
    },
    bookingerrordetailcodes: {
        "101": "TARJETA CADUCADA.",
        "102": "TARJETA BLOQUEDA TRANSITORIAMENTE O BAJO SOSPECHA DE\tFRAUDE.",
        "104": "Operaci�n no permitida para ese tipo de tarjeta.",
        "106": "Excedido el n�mero de intentos con PIN err�neo.",
        "107": "El banco emisor no permite una autorizaci�n autom�tica. Es necesario contactar telef�nicamente con su centro autorizador para obtener una aprobaci�n\tmanual.",
        "109": "Denegada porque el comercio no est� correctamente dado de alta en los sistemas internacionales de tarjetas.",
        "110": "El importe de la transacci�n es inusual para el tipo de comercio que solicita la autorizaci�n de pago.",
        "114": "Operaci�n no permitida para ese tipo de tarjeta.",
        "116": "El titular de la tarjeta no para atender el pago.",
        "118": "Tarjeta no registrada o no dada de alta por banco emisor.",
        "125": "Tarjeta no efectiva o no dada de alta por banco emisor.",
        "129": "C�digo de seguridad (CVV2/CVC2) incorrecto.",
        "167": "Debido a una sospecha de que la transacci�n es fraudulenta el banco emisor no permite una autorizaci�n autom�tica. Es necesario contactar telef�nicamente con su centro autorizador para obtener una aprobaci�n manual.",
        "180": "Tarjeta ajena al servicio. Operaci�n no permitida para ese tipo de tarjeta.",
        "184": "C�digo exclusivo para transacciones Verifed by Visa o MasterCard SecureCode. La transacci�n ha sido denegada porque el banco emisor no pudo autenticar debidamente al titular de la tarjeta.",
        "190": "Transacci�n denegada por el banco emisor pero sin que este d� detalles acerca del motivo.",
        "191": "Transacci�n denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, no se corresponde con la actualmente vigente.",
        "201": "Transacci�n denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, es anterior a la actualmente vigente. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "202": "Tarjeta bloqueada transitoriamente por el banco emisor o bajo sospecha de fraude. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "204": "Operaci�n no permitida para ese tipo de tarjeta. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "207": "El banco emisor no permite una autorizaci�n autom�tica. Es necesario contactar telef�nicamente con su centro autorizador para obtener una aprobaci�n manual. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "280": "C�digo exclusivo para transacciones en las que se solicita el c�digo de 3 d�gitos CVV2 (tarj.Visa) o CVC2 (tarj.MasterCard) del reverso de la tarjeta. El c�digo CVV2/CVC2 informado por el comprador es err�neo. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "290": "Transacci�n denegada por el banco emisor pero sin que este d� detalles acerca del motivo. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "904": "Hay un problema en la confguraci�n del c�digo de comercio. Contactar con Banco Sabadell para solucionarlo.",
        "909": "Error en la estabilidad de la plataforma de pagos de Banco Sabadell o en la de los sistemas de intercambio de Visa o MasterCard.",
        "912": "El centro autorizador del banco emisor no est� operativo en estos momentos.",
        "913": "Se ha procesado recientemente una transacci�n con el mismo n�mero de pedido (Ds_Merchant_Order).",
        "916": "No es posible operar con este importe. Importe demasiado peque�o.",
        "928": "El banco emisor no da respuesta a la petici�n de autorizaci�n dentro del time-out predefnido.",
        "943": "Se est� solicitando una confrmaci�n err�nea. Datos de transaccion orignal distintos.",
        "944": "Se est� solicitando la apertura de una tercera sesi�n. En el proceso de pago solo est� permitido tener abiertas dos sesiones (la actual y la anterior pendiente de cierre).",
        "945": "Se ha procesado recientemente una transacci�n con el mismo n�mero de pedido (Ds_Merchant_Order).",
        "947": "Se est� intentando procesar una transacci�n con el mismo n�mero de pedido (Ds_Merchant_Order) de otra que todav�a est� pendiente de respuesta.",
        "949": "El n�mero de comercio (Ds_Merchant_MerchantCode) o el de terminal (Ds_Merchant_Terminal) no est�n dados de alta o no son operativos.",
        "950": "Operaci�n de devoluci�n no permitida.",
        "965": "Violaci�n de la Normativa de Visa o Mastercard.",
        "9064": "Longitud de la tarjeta err�nea. No posiciones de la tarjeta incorrecta.",
        "9078": "Los tipos de pago defnidos para el terminal (Ds_Merchant_Terminal) por el que se procesa la transacci�n, no permiten pagar con el tipo de tarjeta informado.",
        "9093": "Tarjeta inexistente.",
        "9094": "Operaci�n denegada por parte de los emisoras internacionales.",
        "9104": "Comercio con autenticaci�n obligatoria y titular sin clave de compra segura.",
        "9142": "El titular de la tarjeta no se ha autenticado durante el tiempo m�ximo permitido.",
        "9218": "La entrada Operaciones no permite operaciones Seguras.",
        "9253": "Tarjeta no cumple con el check-digit (posici�n 16 del n�mero de tarjeta calculada seg�n algoritmo de Luhn).",
        "9256": "El comercio no puede realizar preautorizaciones.",
        "9257": "Esta tarjeta no permite operativa de preautorizaciones.",
        "9261": "La transacci�n excede el l�mite operativo establecido por Banco Sabadell",
        "9912": "El centro autorizador del banco emisor no est� operativo en estos momentos.",
        "9913": "Error en la confrmaci�n que el comercio env�a al TPV Virtual (solo aplicable en la opci�n de sincronizaci�n SOAP)",
        "9914": "Confrmaci�n KO del comercio (solo aplicable en la opci�n de sincronizaci�n SOAP)",
        "9915": "El usuario ha cancelado el pago.",
        "9928": "Anulaci�n de autorizaci�n en diferido realizada por el SIS (proceso batch).",
        "9929": "Anulaci�n de autorizaci�n en diferido realizada por el comercio.",
        "9997": "En el TPV Virtual se est� procesando de forma simult�nea otra operaci�n con la misma tarjeta.",
        "9998": "Estado temporal mientras la operaci�n se procesa. Cuando la operaci�n termine este c�digo cambiar�.",
        "9999": "Estado temporal mientras el TPV realiza la autenticaci�n del titular. Una vez fnalizado este proceso el TPV asignar� un nuevo c�digo a la operaci�n.",
        "181": "Tarjeta con restricciones de d�bito o cr�dito. Tarjeta bloqueada transitoriamente por el banco emisor.",
        "182": "Tarjeta con restricciones de d�bito o cr�dito. Tarjeta bloqueada transitoriamente por el banco emisor.",
        "208": "Tarjeta bloqueada por el banco emisor debido a que el titular le ha manifestado que le ha sido robada o perdida. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "209": "Tarjeta bloqueada por el banco emisor debido a que el titular le ha manifestado que le ha sido robada o perdida. Adem�s, el banco emisor considera que la tarjeta est� en una situaci�n de posible fraude.",
        "9283": "La operaci�n excede las alertas bloqueantes, no se puede procesar",
        "9281": "La operaci�n excede las alertas bloqueantes, no se puede procesar"
    }
};

var months_en = ['January', 'February', 'March',
            'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];
var months_es = ['Enero', 'Febrero', 'Marzo',
            'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

module.exports.commonpopulate = commonpopulate;
module.exports.enums = enums;
module.exports.months_en = months_en;
module.exports.months_es = months_es;
module.exports.timezones = timezones;
module.exports.currencys = currencys;
module.exports.bankcountries = bankcountries;
module.exports.assistancelanguages = assistancelanguages;
module.exports.paymentoptions = paymentoptions;
module.exports.hermessuscriptions = hermessuscriptions;
module.exports.countriesFile = countriesFile;
module.exports.iataFile = iataFile;
