define(['flight/lib/component'], function(defineComponent) {

  var CurrentLocation = defineComponent(currentLocation);

  function currentLocation() {

    this.defaultAttrs({
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: undefined
    });

    this.isSupported = function() {
      return 'geolocation' in navigator;
    };

    this.locationUpdate = function(position) {
      this.trigger('location-current', {position: position});
    };

    this.locationError = function(error) {
      this.trigger('location-error', {error: error});
    };

    this.currentLocation = function() {
      navigator.geolocation.getCurrentPosition(this.locationUpdate, this.locationError, this.attr);
    };

    this.watchLocation = function() {
      this.watchId = navigator.geolocation.watchPosition(this.locationUpdate, this.locationError, this.attr);
    };

    this.clearWatch = function() {
      if (this.watchId) navigator.geolocation.clearWatch(this.watchId);
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