/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'inspiration\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-yto-signs': '&#xe900;',
		'icon-yto-africa-world': '&#xe901;',
		'icon-yto-suppliers': '&#xe902;',
		'icon-yto-world-plane': '&#xe903;',
		'icon-alt-brokenbulb': '&#xe800;',
		'icon-alt-brokengear': '&#xe801;',
		'icon-alt-filter': '&#xe802;',
		'icon-alt-handshake': '&#xe803;',
		'icon-alt-home': '&#xe804;',
		'icon-alt-info': '&#xe805;',
		'icon-alt-moneybox': '&#xe806;',
		'icon-alt-offer': '&#xe807;',
		'icon-alt-safety': '&#xe808;',
		'icon-alt-star': '&#xe809;',
		'icon-alt-time': '&#xe80a;',
		'icon-architecture': '&#xe80b;',
		'icon-art': '&#xe80c;',
		'icon-backpackers': '&#xe80d;',
		'icon-beach': '&#xe80e;',
		'icon-birdwatching': '&#xe80f;',
		'icon-boat-rental': '&#xe810;',
		'icon-camping': '&#xe811;',
		'icon-city-sights': '&#xe812;',
		'icon-climbing': '&#xe813;',
		'icon-community-base': '&#xe814;',
		'icon-cruises': '&#xe815;',
		'icon-culture-history-old': '&#xe816;',
		'icon-culture-history': '&#xe817;',
		'icon-cycling': '&#xe818;',
		'icon-diving': '&#xe819;',
		'icon-ecotourism': '&#xe81a;',
		'icon-education': '&#xe81b;',
		'icon-enology': '&#xe81c;',
		'icon-extreme': '&#xe81d;',
		'icon-festivals-old': '&#xe81e;',
		'icon-festivals': '&#xe81f;',
		'icon-fishing': '&#xe820;',
		'icon-food': '&#xe821;',
		'icon-four-wheel': '&#xe822;',
		'icon-golf': '&#xe823;',
		'icon-heritage': '&#xe824;',
		'icon-honeymoons': '&#xe825;',
		'icon-horseback-riding': '&#xe826;',
		'icon-kayak-canoe': '&#xe827;',
		'icon-kids': '&#xe828;',
		'icon-language': '&#xe829;',
		'icon-lgtb': '&#xe82a;',
		'icon-luxury': '&#xe82b;',
		'icon-motorcycle': '&#xe82c;',
		'icon-museums': '&#xe82d;',
		'icon-national-parks': '&#xe82e;',
		'icon-off-the-road': '&#xe82f;',
		'icon-party': '&#xe830;',
		'icon-photography': '&#xe831;',
		'icon-rafting': '&#xe832;',
		'icon-religion': '&#xe833;',
		'icon-safari': '&#xe834;',
		'icon-sailing': '&#xe835;',
		'icon-self-drive': '&#xe836;',
		'icon-self-guided': '&#xe837;',
		'icon-shopping': '&#xe838;',
		'icon-singles': '&#xe839;',
		'icon-spa-wellness': '&#xe83a;',
		'icon-spiritual': '&#xe83b;',
		'icon-surf': '&#xe83c;',
		'icon-sustainable': '&#xe83d;',
		'icon-team-building': '&#xe83e;',
		'icon-teenagers-old': '&#xe83f;',
		'icon-teenagers': '&#xe840;',
		'icon-train': '&#xe841;',
		'icon-trekking-hiking': '&#xe842;',
		'icon-volunteer': '&#xe843;',
		'icon-walking': '&#xe844;',
		'icon-water-sports': '&#xe845;',
		'icon-weekend': '&#xe846;',
		'icon-wildlife': '&#xe847;',
		'icon-windsurfing-kitesurfing': '&#xe848;',
		'icon-winter-sports': '&#xe849;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
