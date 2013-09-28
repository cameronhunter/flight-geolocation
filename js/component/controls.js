define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(controls);

  function controls() {

    this.start = function() {
      this.started = true;
      this.trigger('geolocation-watch');
      this.$node.text('Stop');
    };

    this.stop = function() {
      this.started = false;
      this.trigger('geolocation-watch-stop');
      this.$node.text('Start');
    };

    this.toggle = function() {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    };

    this.after('initialize', function () {
      this.on('click', this.toggle);
      this.on(document, 'geolocation-error', this.stop);
    });
  }

});
