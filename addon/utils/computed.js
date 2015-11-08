/**
 * A collection of property macros
 * Inspiration: https://github.com/martndemus/ember-array-computed-macros/blob/master/addon/index.js
 */

const {computed, NAME_KEY} = Ember

/**
 * A groupBy group.
 */
const Grouping = Ember.Object.extend({})
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
 *
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
