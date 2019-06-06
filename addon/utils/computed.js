/* global R, Ember */
/**
 * A collection of property macros
 * Inspiration: https://github.com/martndemus/ember-array-computed-macros/blob/master/addon/index.js
 */

// TODO: We should move this to vendor and add it to an R.computed namespace
import { computed } from '@ember/object';
import EmberObject from '@ember/object';

const { NAME_KEY } = Ember

/**
 * A groupBy group.
 */
const Grouping = EmberObject.extend({})
Grouping[NAME_KEY] = 'computed.groupBy.Grouping'


/**
 * R.groupBy computed helper.
 * Returns a `Grouping` object instead of a POJO so that event listeners may be bound to it to listen for changes
 *
 * @param {String} listProperty
 * @param {String} valueProperty
 * @return {*}
 */
export function groupBy (listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function () {
    return R.pipe(                        // Ember.Object ->
      R.prop(listProperty),               // . -> [ {k:v} ]
      R.groupBy(R.prop(valueProperty)),   // . -> { v: [{k:v}] }
      R.bind(Grouping.create, Grouping)   // . -> Grouping
    )(this)
  }).readOnly()
}

/**
 * @param {String} listProperty
 * @param {String} valueProperty
 * @return {*[]}
 */
export function pluck (listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function () {
    return R.pipe(                        // Ember.Object ->
      R.prop(listProperty),               // . -> [ {k:v} ]
      R.pluck(valueProperty)              // . -> [ v ]
    )(this)
  }).readOnly()
}

/**
 * @param {String} listProperty
 * @param {String} valueProperty
 * @return {Number}
 */
export function pluckSum (listProperty, valueProperty) {
  return computed(`${listProperty}.@each.${valueProperty}`, function () {
    return R.pipe(                        // Ember.Object ->
      R.prop(listProperty),               // . -> [ {k:Number} ]
      R.pluck(valueProperty),             // . -> [ Number ]
      R.sum                               // . -> Number
    )(this)
  }).readOnly()
}

/**
 *
 * @param {String} listProperty
 * @param {String} valueProperty
 * @param {Function} filterFn
 * @return {Number}
 */
export function pluckFilterSum (listProperty, valueProperty, filterFn) {
  return computed(`${listProperty}.@each.${valueProperty}`, function () {
    return R.pipe(                        // Ember.Object ->
      R.prop(listProperty),               // . -> [ {k:Number} ]
      R.pluck(valueProperty),             // . -> [ Number ]
      R.filter(filterFn),                 // . -> [ Number ]
      R.sum                               // . -> Number
    )(this)
  }).readOnly()
}

/**
 * The regular Ember.computed.filter provides an interface compatible with Array.filter
 * and passes 3 arguments (val, index, array)
 * This has an interface compatible with R.filter
 *
 * @param {String} listProperty
 * @param {String} valueProperty
 * @param {Function} fn (* -> Boolean)
 */
export function filter (listProperty, valueProperty, fn) {
  return computed(`${listProperty}.@each.${valueProperty}`, function () {
    return R.pipe(                        // Ember.Object ->
      R.prop(listProperty),               // . -> [ {k:v} ]
      R.pluck(valueProperty),             // . -> [ v ]
      R.filter(fn)                        // . -> [ v ]
    )(this)
  }).readOnly()
}

/**
 * A simple transform for a single value
 * TODO: Should we bind the `fn` param to `this` context?
 * @param {String} valueProperty
 * @param {Function} fn (a -> b)
 * @return {*}
 */
export function transformBy (valueProperty, fn) {
  return computed(`${valueProperty}`, function () {
    return R.pipe(                        // Ember.Object
      R.prop(valueProperty),              // . -> a
      fn                                  // . -> b
    )(this)
  }).readOnly()

}

/**
 * Checks whether the value from `this.get(valueProperty)` is a member of a list
 * `listProperty` may be a String or an Array
 *
 * - String: `this.get(listProperty)` is used when checking for membership
 * - Array: The array is used as-is when checking for membership
 *
 * @param {String} valueProperty
 * @param {String|Array} listProperty
 */
export function contains (valueProperty, listProperty) {
  // user has passed a string
  if (R.is(String, listProperty)) {
    return computed(valueProperty, `${listProperty}.@each`, function () {
      return R.contains(this.get(valueProperty), this.get(listProperty))
    })
  } else {
    // user has passed an array
    return computed(valueProperty, `asd`, function () {
      return R.contains(this.get(valueProperty), listProperty)
    })
  }


}

/**
 * Safely parses a JSON value that may have accidentally been stringified multiple times.
 * @param {String} valueProperty the name of an attribute that holds a json value
 */
export function parsedJSON (valueProperty) {
  return computed(valueProperty, function () {
    let value = this.get(valueProperty)
    while (R.is(String, value)) {
      value = JSON.parse(value)
    }
    return value
  })

}
