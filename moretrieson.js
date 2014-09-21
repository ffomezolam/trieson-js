/**
 * Trie implementation with more trecherous motivations
 *
 * @module trieson
 */

(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition(require('trieson'));
    else if(typeof define === 'function' && define.amd) define(['trieson'], definition);
    else context[name] = definition(Trieson);
})("MoreTrieson", this, function(Trieson) {
    /**
     * MoreTrieson class
     *
     * @class MoreTrieson
     * @constructor
     * @param {Object} [opts] Options
     */
    function MoreTrieson(opts) {
    }

    MoreTrieson.prototype.add = function(s) {
    };

    return MoreTrieson;
});
