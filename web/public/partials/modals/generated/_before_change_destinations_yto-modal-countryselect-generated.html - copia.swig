<!-- ======= Countryselect Modal ======== -->
<div class="modal-content countryselect-modal" id="csgenerated">
  <div class="modal-body padded-zero" id="countries" ng-hide="allcountries">
    <div class="absolute closer">
      <button type="button" class="close" data-dismiss="modal" ng-click="cancel()">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
      </button>
    </div>
    <ul ng-init="zones = true" class="mb-xl list-unstyled bg-light" ng-show="zones">
      <li class="col-md-12 bg-light bordered zone-link" ng-init="asia= false">
        <a href="#" ng-click="asia= true; zones = false;">
          <span class="h4 padded-b iblock mt-l">Asia</span>
        </a>
      </li>
      <li class="col-md-12 bg-light bordered zone-link" ng-init="america= false">
        <a href="#" ng-click="america= true; zones = false;">
          <span class="h4 padded-b iblock mt-l">América</span>
        </a>
      </li>
      <li class="col-md-12 bg-light bordered zone-link" ng-init="europe= false">
        <a href="#" ng-click="europe= true; zones = false;">
          <span class="h4 padded-b iblock mt-l">Europa</span>
        </a>
      </li>
      <li class="col-md-12 bg-light bordered zone-link" ng-init="africa= false">
        <a href="#" ng-click="africa= true; zones = false;">
          <span class="h4 padded-b iblock mt-l">África</span>
        </a>
      </li>
      <li class="col-md-12 bg-light bordered zone-link" ng-init="middleeast= false">
        <a href="#" ng-click="middleeast= true; zones = false;">
          <span class="h4 padded-b iblock mt-l">Oriente Medio</span>
        </a>
      </li>
      <li class="col-md-12 bg-light bordered zone-link" ng-init="oceania= false">
        <a href="#" ng-click="oceania= true; zones = false;">
          <span class="h4 padded-b iblock mt-l">Oceanía</span>
        </a>
      </li>
    </ul>
    <section class="mb-xl list-unstyled bg-light" ng-show="!zones">
      <ul class="list-unstyled">
        <ul ng-show="asia" class="list-unstyled oh" class="row">
          <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
            <a href="#" ng-click="asia= false; zones = true;">
              <span class="h4 padded-b iblock mt-l">
                <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;Asia
              </span>
            </a>
          </div>
          <div class="bg-opacgray padded-xl oh">
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=az" ng-click="ok({name : 'Azerbayan', query : '&amp;country='+'az'});">Azerbayan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mm" ng-click="ok({name : 'Birmania', query : '&amp;country='+'mm'});">Birmania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bt" ng-click="ok({name : 'Butan', query : '&amp;country='+'bt'});">Butan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=kh" ng-click="ok({name : 'Camboya', query : '&amp;country='+'kh'});">Camboya</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=cn" ng-click="ok({name : 'China', query : '&amp;country='+'cn'});">China</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=kr" ng-click="ok({name : 'Corea del Sur', query : '&amp;country='+'kr'});">Corea del Sur</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ph" ng-click="ok({name : 'Filipinas', query : '&amp;country='+'ph'});">Filipinas</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=in" ng-click="ok({name : 'India', query : '&amp;country='+'in'});">India</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=id" ng-click="ok({name : 'Indonesia', query : '&amp;country='+'id'});">Indonesia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=jp" ng-click="ok({name : 'Japón', query : '&amp;country='+'jp'});">Japón</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=kz" ng-click="ok({name : 'Kazajastan', query : '&amp;country='+'kz'});">Kazajastan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=kg" ng-click="ok({name : 'Kirguizistán', query : '&amp;country='+'kg'});">Kirguizistán</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=la" ng-click="ok({name : 'Laos', query : '&amp;country='+'la'});">Laos</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=my" ng-click="ok({name : 'Malasia', query : '&amp;country='+'my'});">Malasia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mv" ng-click="ok({name : 'Maldivas', query : '&amp;country='+'mv'});">Maldivas</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mn" ng-click="ok({name : 'Mongolia', query : '&amp;country='+'mn'});">Mongolia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=np" ng-click="ok({name : 'Nepal', query : '&amp;country='+'np'});">Nepal</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=sg" ng-click="ok({name : 'Singapur', query : '&amp;country='+'sg'});">Singapur</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=lk" ng-click="ok({name : 'Sri Lanka', query : '&amp;country='+'lk'});">Sri Lanka</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=th" ng-click="ok({name : 'Tailandia', query : '&amp;country='+'th'});">Tailandia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=tw" ng-click="ok({name : 'Taiwan', query : '&amp;country='+'tw'});">Taiwan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=tj" ng-click="ok({name : 'Tajikistan', query : '&amp;country='+'tj'});">Tajikistan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=tm" ng-click="ok({name : 'Turkmenistan', query : '&amp;country='+'tm'});">Turkmenistan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=uz" ng-click="ok({name : 'Uzbekistan', query : '&amp;country='+'uz'});">Uzbekistan</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=vn" ng-click="ok({name : 'Vietnam', query : '&amp;country='+'vn'});">Vietnam</a>
            </li>
          </div>
        </ul>
        <ul ng-show="america" class="list-unstyled oh" class="row">
          <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
            <a href="#" ng-click="america= false; zones = true;">
              <span class="h4 padded-b iblock mt-l">
                <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;América
              </span>
            </a>
          </div>
          <div class="bg-opacgray padded-xl oh">
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ar" ng-click="ok({name : 'Argentina', query : '&amp;country='+'ar'});">Argentina</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bz" ng-click="ok({name : 'Belice', query : '&amp;country='+'bz'});">Belice</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bo" ng-click="ok({name : 'Bolivia', query : '&amp;country='+'bo'});">Bolivia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=br" ng-click="ok({name : 'Brasil', query : '&amp;country='+'br'});">Brasil</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ca" ng-click="ok({name : 'Canada', query : '&amp;country='+'ca'});">Canada</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=cl" ng-click="ok({name : 'Chile', query : '&amp;country='+'cl'});">Chile</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=co" ng-click="ok({name : 'Colombia', query : '&amp;country='+'co'});">Colombia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=cr" ng-click="ok({name : 'Costa Rica', query : '&amp;country='+'cr'});">Costa Rica</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=cu" ng-click="ok({name : 'Cuba', query : '&amp;country='+'cu'});">Cuba</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ec" ng-click="ok({name : 'Ecuador', query : '&amp;country='+'ec'});">Ecuador</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=sv" ng-click="ok({name : 'El Salvador', query : '&amp;country='+'sv'});">El Salvador</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=us" ng-click="ok({name : 'Estados Unidos', query : '&amp;country='+'us'});">Estados Unidos</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=gt" ng-click="ok({name : 'Guatemala', query : '&amp;country='+'gt'});">Guatemala</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=hn" ng-click="ok({name : 'Honduras', query : '&amp;country='+'hn'});">Honduras</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mx" ng-click="ok({name : 'México', query : '&amp;country='+'mx'});">México</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ni" ng-click="ok({name : 'Nicaragua', query : '&amp;country='+'ni'});">Nicaragua</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=pa" ng-click="ok({name : 'Panama', query : '&amp;country='+'pa'});">Panama</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=py" ng-click="ok({name : 'Paraguay', query : '&amp;country='+'py'});">Paraguay</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=pe" ng-click="ok({name : 'Perú', query : '&amp;country='+'pe'});">Perú</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=uy" ng-click="ok({name : 'Uruguay', query : '&amp;country='+'uy'});">Uruguay</a>
            </li>
          </div>
        </ul>
        <ul ng-show="europe" class="list-unstyled oh" class="row">
          <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
            <a href="#" ng-click="europe= false; zones = true;">
              <span class="h4 padded-b iblock mt-l">
                <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;Europa
              </span>
            </a>
          </div>
          <div class="bg-opacgray padded-xl oh">
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=al" ng-click="ok({name : 'Albania', query : '&amp;country='+'al'});">Albania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=de" ng-click="ok({name : 'Alemania', query : '&amp;country='+'de'});">Alemania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=am" ng-click="ok({name : 'Armenia', query : '&amp;country='+'am'});">Armenia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=at" ng-click="ok({name : 'Austria', query : '&amp;country='+'at'});">Austria</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=be" ng-click="ok({name : 'Belgica', query : '&amp;country='+'be'});">Belgica</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=by" ng-click="ok({name : 'Bielorrusia', query : '&amp;country='+'by'});">Bielorrusia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ba" ng-click="ok({name : 'Bosnia y Herzegovina', query : '&amp;country='+'ba'});">Bosnia y Herzegovina</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bg" ng-click="ok({name : 'Bulgaria', query : '&amp;country='+'bg'});">Bulgaria</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=cy" ng-click="ok({name : 'Chipre', query : '&amp;country='+'cy'});">Chipre</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=hr" ng-click="ok({name : 'Croacia', query : '&amp;country='+'hr'});">Croacia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=dk" ng-click="ok({name : 'Dinamarca', query : '&amp;country='+'dk'});">Dinamarca</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=sk" ng-click="ok({name : 'Eslovaquia', query : '&amp;country='+'sk'});">Eslovaquia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=si" ng-click="ok({name : 'Eslovenia', query : '&amp;country='+'si'});">Eslovenia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=es" ng-click="ok({name : 'España', query : '&amp;country='+'es'});">España</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ee" ng-click="ok({name : 'Estonia', query : '&amp;country='+'ee'});">Estonia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=fi" ng-click="ok({name : 'Finlandia', query : '&amp;country='+'fi'});">Finlandia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=fr" ng-click="ok({name : 'Francia', query : '&amp;country='+'fr'});">Francia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ge" ng-click="ok({name : 'Georgia', query : '&amp;country='+'ge'});">Georgia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=gr" ng-click="ok({name : 'Grecia', query : '&amp;country='+'gr'});">Grecia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=nl" ng-click="ok({name : 'Holanda', query : '&amp;country='+'nl'});">Holanda</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=hu" ng-click="ok({name : 'Hungria', query : '&amp;country='+'hu'});">Hungria</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ie" ng-click="ok({name : 'Irlanda', query : '&amp;country='+'ie'});">Irlanda</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=is" ng-click="ok({name : 'Islandia', query : '&amp;country='+'is'});">Islandia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=it" ng-click="ok({name : 'Italia', query : '&amp;country='+'it'});">Italia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=lv" ng-click="ok({name : 'Letonia', query : '&amp;country='+'lv'});">Letonia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=lt" ng-click="ok({name : 'Lituania', query : '&amp;country='+'lt'});">Lituania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mk" ng-click="ok({name : 'Macedonia', query : '&amp;country='+'mk'});">Macedonia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=me" ng-click="ok({name : 'Montenegro', query : '&amp;country='+'me'});">Montenegro</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=no" ng-click="ok({name : 'Noruega', query : '&amp;country='+'no'});">Noruega</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=pl" ng-click="ok({name : 'Polonia', query : '&amp;country='+'pl'});">Polonia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=pt" ng-click="ok({name : 'Portugal ', query : '&amp;country='+'pt'});">Portugal </a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=gb" ng-click="ok({name : 'Reino Unido', query : '&amp;country='+'gb'});">Reino Unido</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=cz" ng-click="ok({name : 'República Checa', query : '&amp;country='+'cz'});">República Checa</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ro" ng-click="ok({name : 'Rumania', query : '&amp;country='+'ro'});">Rumania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ru" ng-click="ok({name : 'Rusia', query : '&amp;country='+'ru'});">Rusia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=rs" ng-click="ok({name : 'Serbia', query : '&amp;country='+'rs'});">Serbia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=se" ng-click="ok({name : 'Suecia', query : '&amp;country='+'se'});">Suecia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ch" ng-click="ok({name : 'Suiza', query : '&amp;country='+'ch'});">Suiza</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=tr" ng-click="ok({name : 'Turquía', query : '&amp;country='+'tr'});">Turquía</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ua" ng-click="ok({name : 'Ucrania', query : '&amp;country='+'ua'});">Ucrania</a>
            </li>
          </div>
        </ul>
        <ul ng-show="africa" class="list-unstyled oh" class="row">
          <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
            <a href="#" ng-click="africa= false; zones = true;">
              <span class="h4 padded-b iblock mt-l">
                <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;África
              </span>
            </a>
          </div>
          <div class="bg-opacgray padded-xl oh">
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bj" ng-click="ok({name : 'Benin', query : '&amp;country='+'bj'});">Benin</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bw" ng-click="ok({name : 'Botswana', query : '&amp;country='+'bw'});">Botswana</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=bf" ng-click="ok({name : 'Burkina Faso', query : '&amp;country='+'bf'});">Burkina Faso</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=et" ng-click="ok({name : 'Etiopia', query : '&amp;country='+'et'});">Etiopia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=gm" ng-click="ok({name : 'Gambia', query : '&amp;country='+'gm'});">Gambia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=gh" ng-click="ok({name : 'Ghana', query : '&amp;country='+'gh'});">Ghana</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ke" ng-click="ok({name : 'Kenia', query : '&amp;country='+'ke'});">Kenia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mg" ng-click="ok({name : 'Madagascar', query : '&amp;country='+'mg'});">Madagascar</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ml" ng-click="ok({name : 'Mali', query : '&amp;country='+'ml'});">Mali</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ma" ng-click="ok({name : 'Marruecos', query : '&amp;country='+'ma'});">Marruecos</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=mz" ng-click="ok({name : 'Mozambique', query : '&amp;country='+'mz'});">Mozambique</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=na" ng-click="ok({name : 'Namibia', query : '&amp;country='+'na'});">Namibia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=sn" ng-click="ok({name : 'Senegal', query : '&amp;country='+'sn'});">Senegal</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=za" ng-click="ok({name : 'Sud África', query : '&amp;country='+'za'});">Sud África</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=sz" ng-click="ok({name : 'Swazilandia', query : '&amp;country='+'sz'});">Swazilandia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=tz" ng-click="ok({name : 'Tanzania', query : '&amp;country='+'tz'});">Tanzania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=tg" ng-click="ok({name : 'Togo', query : '&amp;country='+'tg'});">Togo</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ug" ng-click="ok({name : 'Uganda', query : '&amp;country='+'ug'});">Uganda</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=zm" ng-click="ok({name : 'Zambia', query : '&amp;country='+'zm'});">Zambia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=zw" ng-click="ok({name : 'Zimbawe', query : '&amp;country='+'zw'});">Zimbawe</a>
            </li>
          </div>
        </ul>
        <ul ng-show="middleeast" class="list-unstyled oh" class="row">
          <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
            <a href="#" ng-click="middleeast= false; zones = true;">
              <span class="h4 padded-b iblock mt-l">
                <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;Oriente Medio
              </span>
            </a>
          </div>
          <div class="bg-opacgray padded-xl oh">
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=eg" ng-click="ok({name : 'Egipto', query : '&amp;country='+'eg'});">Egipto</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ae" ng-click="ok({name : 'Emiratos Árabes', query : '&amp;country='+'ae'});">Emiratos Árabes</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ir" ng-click="ok({name : 'Iran', query : '&amp;country='+'ir'});">Iran</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=il" ng-click="ok({name : 'Israel', query : '&amp;country='+'il'});">Israel</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=jo" ng-click="ok({name : 'Jordania', query : '&amp;country='+'jo'});">Jordania</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=om" ng-click="ok({name : 'Oman', query : '&amp;country='+'om'});">Oman</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=qa" ng-click="ok({name : 'Qatar', query : '&amp;country='+'qa'});">Qatar</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=ye" ng-click="ok({name : 'Yemen', query : '&amp;country='+'ye'});">Yemen</a>
            </li>
          </div>
        </ul>
        <ul ng-show="oceania" class="list-unstyled oh" class="row">
          <div class="marged-zero pl-b pr-b relative zone-link" class="col-md-12">
            <a href="#" ng-click="oceania= false; zones = true;">
              <span class="h4 padded-b iblock mt-l">
                <i class="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;Oceanía
              </span>
            </a>
          </div>
          <div class="bg-opacgray padded-xl oh">
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=au" ng-click="ok({name : 'Australia', query : '&amp;country='+'au'});">Australia</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=nz" ng-click="ok({name : 'Nueva Zelanda', query : '&amp;country='+'nz'});">Nueva Zelanda</a>
            </li>
            <li class="padded-b col-md-6">
              <a class="link-invert" href="{? brand.path ?}/viajes/?country=pf" ng-click="ok({name : 'Polinesia Francesa', query : '&amp;country='+'pf'});">Polinesia Francesa</a>
            </li>
          </div>
        </ul>
      </ul>
    </section>
  </div>
  <!-- .modal-body ends  -->
  <!-- <div class="modal-body" id="country" ng-hide="countrycities"><section class="row mb-xl" ng-repeat="country in destinations | filter:{name_es: selectedcountry} : true"><div class="col-md-4 mt-b mb-zero" ng-repeat="city in country.cities"><a class="padded-b" ng-click="ok({name : city+', '+country.name_es, query : '&country='+country.countrycode+'&cities='+city})" href="#">{{city}}</a></div></section></div><div class="modal-footer" ng-hide="countrycities" ng-repeat="country in destinations | filter:{name_es: selectedcountry} : true"><a class="btn btn-primary" ng-click="ok({name : selectedcountry, query : '&country='+country.countrycode})" href="#">Seleccionar todo {{selectedcountry}}</a></div> -->
</div>
<!-- .modal-content ends -->
