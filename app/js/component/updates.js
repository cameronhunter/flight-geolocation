define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(updates);

  function updates() {

    this.defaultAttrs({
      count: '.updates',
      location: '.location',
      errors: '.error'
    });

    this.updateCount = function() {
      this.count++;
      this.select('count').text(this.count);
    };

    this.geolocation = function(e, position) {
      this.select('location').text(JSON.stringify(position));
    };

    this.error = function(e, error) {
      this.select('errors').text(error.message);
    };

    this.clearErrors = function() {
      this.select('errors').text('');
    };

    this.after('initialize', function () {
      this.count = 0;
      this.on(document, 'geolocation-update', this.updateCount);
      this.on(document, 'geolocation-update', this.geolocation);
      this.on(document, 'geolocation-update', this.clearErrors);
      this.on(document, 'geolocation-error', this.error);
    });
  }

});
