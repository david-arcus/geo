(function() {
  'use strict'

  var Geo = {

    init:function() {

      var el = document.getElementById('message');
      el.addEventListener('click', this.getDistance, false);
      //this.getDistance();
    },

    getDistance:function() {


      var destLat = -36.8520592;
      var destLng = 174.7386203;

      var userLat;
      var userLng;

      var distance;

      function getLocation() {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log('Geolocation is not supported by this browser.');
        }

      }

      function showPosition(position) {

        userLat = position.coords.latitude;
        userLng = position.coords.longitude;

        distance = getDistanceFromLatLonInKm(userLat, userLng, destLat, destLng);

        console.log('lat: ' + userLat + ', lng: ' + userLng);

        Geo.showDistance(distance);

      }

      function getDistanceFromLatLonInKm(destLat, destLng, userLat, userLng) {

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(destLat-userLat);  // deg2rad below
        var dLon = deg2rad(destLng-userLng);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(destLat)) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;

      }

      function deg2rad(deg) {

        return deg * (Math.PI/180);

      }

      getLocation();

    },

    showDistance:function(distance) {

      var message;
      var colourClass;
      var body = document.getElementById('body');
      var pDistance = document.getElementById('distance');
      var pMessage = document.getElementById('message');

      distance = parseInt(distance);

      if (distance <= 2) {

        message = 'Really close!';
        colourClass = 'hotRed';

      } else if (distance > 2 && distance <= 5) {

        message = 'Pretty close';
        colourClass = 'deepRed';

      } else if (distance > 5 && distance <= 30) {

        message = 'Pretty far';
        colourClass = 'lightBlue';

      } else if (distance > 30) {

        message = 'Ages away!';
        colourClass = 'deepBlue';

      }

      pMessage.innerHTML = message;
      pDistance.innerHTML = '(About ' + distance + 'km away)';

      body.className = colourClass;


      console.log('distance from dave\'s house is ' + distance + 'km');

    }

  }

  Geo.init();

}());
