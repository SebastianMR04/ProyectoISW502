
/*Scrip calcular posición actual*/
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarUbicacion);
  }
  var lng;
  var lat;
  function mostrarUbicacion(ubicacion) {
    lng = ubicacion.coords.longitude;
    lat = ubicacion.coords.latitude;
    console.log(`longitud: ${lng} | latitud: ${lat}`);
  
  }
  
  /*Generar mapa*/
  
  function mapa() {
    var direccionesMostradas;
    var direccionesServicio = new google.maps.DirectionsService();
    var mapaMostrado;
  
    function iniciar() {
      direccionesMostradas = new google.maps.DirectionsRenderer();
      var UTN = new google.maps.LatLng(10.007000, -84.216611);
      var opciones = {
        zoom: 15,
        center: UTN
      };
      mapaMostrado = new google.maps.Map(document.getElementById('mapaMostrado-canvas'), opciones);
5 
      direccionesMostradas.setMap(mapaMostrado);
      google.maps.event.addDomListener(document.getElementById('botonRuta'), 'click', calcularRuta);
    }
  
    function calcularRuta() {
      var Inicio = new google.maps.LatLng(lat, lng);
      var Fin = new google.maps.LatLng(10.00627719203927, -84.21693057205871);
      var request = {
        origin: Inicio,
        destination: Fin,
        travelMode: google.maps.TravelMode.DRIVING
      };
      direccionesServicio.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          direccionesMostradas.setDirections(response);
          direccionesMostradas.setMap(mapaMostrado);
        } else {
          alert("Directions Request from " + Inicio.toUrlValue(6) + " to " + Fin.toUrlValue(6) + " failed: " + status);
        }
      });
    }
    google.maps.event.addDomListener(window, 'load', iniciar);
  }
  mapa();

  