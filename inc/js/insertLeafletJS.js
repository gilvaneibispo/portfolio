$(function () {

    var bootstrapMd = 768;
    var latitude = -12.2026991;
    var longitude = -38.9664762;

    widthWindow = parseInt($(window).width());

    if(widthWindow < bootstrapMd){
        latitude = -12.2043944;
        longitude = -38.9664762;
    }else if(widthWindow >= bootstrapMd){
        latitude= -12.2026937;
        longitude= -38.9718297;
    }

    var cities = L.layerGroup();

    var greenIcon = L.icon({
        iconUrl: 'inc/img/icons/mymarker.png',
        shadowUrl: 'inc/img/icons/shodow.png',

        iconSize:     [32, 50], // size of the icon
        shadowSize:   [45, 15], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [28, 53],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var htmlPop =  '<div class="pop-all">';
        htmlPop += '<div class="pop-ft">';
        htmlPop += '<img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Bras%C3%A3o_da_UEFS.png" height="48px">';
        htmlPop += '</div>';
        htmlPop += '<div class="pop-body">';
        htmlPop += '<h4>UEFS</h4>';
        htmlPop += '<p>Universidade Estadual de Feira de Santana</p>';
        htmlPop += '</div>';
        htmlPop += '</div>';

    L.marker([-12.2026991, -38.9664762], {icon: greenIcon}).bindPopup(htmlPop).addTo(cities);

    var mbAttr = 'Dados &copy; <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a> contribuidores',
        mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });

    var map = L.map('leafletArea', {
        center: [latitude, longitude],
        zoom: 16,
        layers: [grayscale, cities]
    });

    var baseLayers = {
        "Grayscale": grayscale,
        "Streets": streets
    };

    var overlays = {
        "Cities": cities
    };

    L.control.layers(baseLayers, overlays).addTo(map);
});