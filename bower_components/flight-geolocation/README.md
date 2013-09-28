# flight-geolocation [![Build Status](https://secure.travis-ci.org/cameronhunter/flight-geolocation.png)](http://travis-ci.org/cameronhunter/flight-geolocation)

A [Flight](https://github.com/twitter/flight) component for geo-location.

## Installation

```bash
bower install --save flight-geolocation
```

## Example

```javascript
define(['flight-geolocation'], function(GeoLocation) {

  GeoLocation.attachTo(document, {
    enableHighAccuracy: false,
    timeout: 500,
    maximumAge: 500
  });

  // Listen for geo-location updates
  $(document).on('geolocation-update', function(e, position) {
    console.log(e, position);
  });

  // Listen for errors
  $(document).on('geolocation-error', function(e, error) {
    console.error(e, error);
  });

  // Query current location
  $(document).trigger('geolocation-current');

  // Watch for geo-location updates
  $(document).trigger('geolocation-watch');
});
```

## Development

Development of this component needs [Bower](http://bower.io), and ideally
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```
