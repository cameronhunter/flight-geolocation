describeComponent('lib/location', function () {

  beforeEach(function() {
    setupComponent({
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: undefined
    });
  });

  describe('Location', function() {
    it('should support this functionality', function() {
      expect(this.component.get).toBeDefined();
    });
  });

});
