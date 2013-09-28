define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(mapper);

  function mapper() {

    this.defaultAttrs({
      width: 300,
      height: 300,
      zoom: 13
    });

    this.updateMap = function(e, position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      var image = new Image();
      image.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=" + this.attr.zoom + "&size=" + this.attr.width + "x" + this.attr.height + "&sensor=false";

      this.$node.html(image);
    };

    this.after('initialize', function () {
      this.on(document, 'geolocation-update', this.updateMap);
    });
  }

});
