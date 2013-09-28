'use strict';

requirejs.config({
  baseUrl: '',
  paths: {
    'flight': 'bower_components/flight',
    'flight-geolocation': 'bower_components/flight-geolocation/lib/location',
    'component': 'js/component',
    'page': 'js/page'
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/tools/debug/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice, withLogging]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
