define(['flight/lib/component'], function(defineComponent) {

  var GeoLocation = defineComponent(geoLocation);

  function geoLocation() {

    this.defaultAttrs({
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: 0
    });

    this.isSupported = function() {
      return 'geolocation' in navigator;
    };

    this.locationUpdate = function(position) {
      this.trigger('geolocation-update', {
        timestamp: position.timestamp,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed
        }
      });
    };

    this.locationError = function(error) {
      this.trigger('geolocation-error', {code: error.code, message: error.message});
    };

    this.currentLocation = function() {
      var update = this.locationUpdate.bind(this);
      var error = this.locationError.bind(this);
      navigator.geolocation.getCurrentPosition(update, error, this.attr);
    };

    this.watchLocation = function() {
      var update = this.locationUpdate.bind(this);
      var error = this.locationError.bind(this);
      this.watchId = navigator.geolocation.watchPosition(update, error, this.attr);
    };

    this.clearWatch = function() {
      navigator.geolocation.clearWatch(this.watchId);
    };

    this.after('initialize', function() {
      if (this.isSupported()) {
        this.trigger('geolocation-supported');
        this.on('geolocation-current', this.currentLocation);
        this.on('geolocation-watch', this.watchLocation);
        this.on('geolocation-watch-stop', this.clearWatch);
      } else {
        this.trigger('geolocation-unsupported');
      }
    });

  }

  return GeoLocation;
});