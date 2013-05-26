define(['flight/lib/component'], function(defineComponent) {

  var CurrentLocation = defineComponent(currentLocation);

  function currentLocation() {

    this.defaultAttrs({
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: 0
    });

    this.isSupported = function() {
      return 'geolocation' in navigator;
    };

    this.locationUpdate = function(position) {
      this.trigger('location-current', {
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
      this.trigger('location-error', {code: error.code, message: error.message});
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
        this.trigger('location-supported');
        this.on('location-current', this.currentLocation);
        this.on('location-watch', this.watchLocation);
        this.on('location-watch-stop', this.clearWatch);
      } else {
        this.trigger('location-unsupported');
      }
    });

  }

  return CurrentLocation;
});