/**
 * Basic trie implementation
 *
 * @module trieson
 */
(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition(/*require(deps)*/);
    else if(typeof define === 'function' && define.amd) define(/*[deps], */definition);
    else context[name] = definition();
})('Trieson', this, function(/*deps*/) {
    /**
     * Trie class
     * TODO: set up initialization method
     *
     * @class Trieson
     * @constructor
     */
    function Trieson() {
        this._root = null;
        this._nodeType = null;
    }

    Trieson.prototype = {
        /**
         * Test whether a string is in the trie
         *
         * @method has
         * @param {String} s String to test
         * @return {Boolean} Whether string is in trie
         */
        has: function(s) {
            return !!this.get(s);
        },

        /**
         * Add a string to the trie
         *
         * @method add
         * @chainable
         * @param {String} s String to add
         * @param {any} [d] Data to associate with string
         */
        add: function(s, d) {
            var i,
                l = s.length,
                n = this._root;

            for (i = 0; i < l; i++) {
                var c = s.charAt(i);
                n = n._addChild(c)._getChild(c);
            }

            n.value = d || true;

            return this;
        },

        /**
         * Get data associated with string
         *
         * @method get
         * @param {String} s String to query
         * @return {any} Data associated with string
         */
        get: function(s) {
            var n = this._root;
            for (var i = 0, l = s.length; i < l; i ++) {
                var c = s.charAt(i);
                if(!n._hasChild(c)) return null;
                n = n._getChild(c);
            }
            return n.value;
        }
    };

    return Trieson;
});
