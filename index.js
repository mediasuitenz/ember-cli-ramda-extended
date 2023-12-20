'use strict';

module.exports = {
  name: 'ember-cli-ramda-extended',
  included (app, parentAddon) {
    this._super.included(app, parentAddon)
    app.import('node_modules/ramda-extended/dist/ramda-extended.js')
    app.import('node_modules/ramda-extended-rsvp/dist/ramda-extended-rsvp.js')
    app.import('vendor/ramda-ember.js')
  }
};
