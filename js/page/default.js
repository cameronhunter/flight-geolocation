define(function (require) {

  'use strict';

  var GeoLocation = require('flight-geolocation');
  var Mapper = require('component/mapper');
  var Updates = require('component/updates');
  var Controls = require('component/controls');

  return initialize;

  function initialize() {
    GeoLocation.attachTo(document, {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    });

    Mapper.attachTo('.map', {
      width: 300,
      height: 300
    });

    Updates.attachTo('.info', {
      count: '.updates',
      location: '.location',
      errors: '.error'
    });

    Controls.attachTo('.toggle');
  }

});
