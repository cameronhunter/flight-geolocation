# flight-location [![Build Status](https://secure.travis-ci.org/cameronhunter/flight-location.png)](http://travis-ci.org/cameronhunter/flight-location)

A [Flight](https://github.com/twitter/flight) component for geo-location.

## Installation

```bash
bower install --save flight-location
```

## Example

```javascript
define(['flight-location/location'], function(Location) {

  // Setup the store
  Location.attachTo(document, {
    adapter: 'local-storage',
    saveEvent: 'storage-save',
    getEvent: 'storage-get',
    clearEvent: 'storage-clear'
  });

  // Listen for geo-location updates
  $(document).on('location-update', function(e, data) {
    console.log(e, data);
  });

  // Listen for errors
  $(document).on('location-error', function(e, data) {
    console.error(e, data);
  });
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
