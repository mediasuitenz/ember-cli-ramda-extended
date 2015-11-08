/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-ramda-extended',
  included (app, parentAddon) {
    this._super.included(app, parentAddon)
    app.import(app.bowerDirectory + '/ramda-extended/dist/ramda-extended.js')
    app.import(app.bowerDirectory + '/ramda-extended-rsvp/dist/ramda-extended-rsvp.js')
    app.import('vendor/ramda-ember.js')
  }
};
