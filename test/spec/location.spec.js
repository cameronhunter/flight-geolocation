describeComponent('lib/location', function () {

  var mockLocation = {
    "timestamp": 1369549528218,
    "coords": {
      "latitude": 37.7962379,
      "longitude": -122.43949669999999,
      "accuracy": 100
    }
  };

  delete navigator.geolocation;
  navigator.geolocation = {
    getCurrentPosition: function(success) {success(mockLocation);},
    watchPosition: function(success) {success(mockLocation);},
    clearWatch: $.noop
  };

  beforeEach(function() {
    setupComponent();
  });

  it('should retrieve the current location when "location-query" is triggered', function() {
    var eventSpy = spyOnEvent(document, 'location-current');
    this.component.trigger('location-query');
    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should watch the current location when "location-watch" is triggered', function() {
    var eventSpy = spyOnEvent(document, 'location-current');
    this.component.trigger('location-watch');
    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should stop watching the current location when "location-watch-stop" is triggered', function() {
    spyOn(navigator.geolocation, 'clearWatch');
    this.component.trigger('location-watch-stop');
    expect(navigator.geolocation.clearWatch).toHaveBeenCalled();
  });

});
