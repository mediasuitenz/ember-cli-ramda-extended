# Ember-cli-ramda-extended

This package does the following:

1. Adds ramda-ember to your project
2. Adds ramda-ember-rsvp to your project (works with Ember.RSVP)
3. Re-implements regular R function like `prop` and `pluck` to be compatible with Ember.js getters and setters (See warning below)
4. Adds `R.Ember` namespace to house Ember-specific functions

## WARNING

This is a work in progress.
**Not all functions have been modified to be Emberjs compatible.**
When in doubt, check the source to see if a function has been implemented.
If you need a Ramda function that has not been ported yet, then please submit a pull request!

## See Also

* ramda-extended ([npm](https://github.com/mediasuitenz/ramda-extended)/[github](https://github.com/mediasuitenz/ramda-extended))
* ramda-extended-rsvp ([npm](https://github.com/mediasuitenz/ramda-extended-rsvp)/[github](https://github.com/mediasuitenz/ramda-extended-rsvp))
* ember-cliramda-extended ([npm](https://www.npmjs.com/package/ember-cli-ramda-extended)/[github](https://github.com/mediasuitenz/ember-cli-ramda-extended))


## Installation (Ember-cli)

* `ember install Ember-cli-ramda-extended`
* `npm install`
* `bower install`


## Usage Notes

After installing, the `R` namespace is globally available, including `R.rsvp` and `R.Ember`
