/**
 * Trie implementation with trecherous motivations
 *
 * @module trieson
 */

(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition();
    else if(typeof define === 'function' && define.amd) define(definition);
    else context[name] = definition();
})("Trieson", this, function(/*deps*/) {
    /**
     * Trie class
     * TODO: set up initialization method
     *
     * @class Trieson
     * @constructor
     */
    function Trieson(v) {
        this._root = new triesonNode();
        this._next = {};
        this._value = typeof v == 'undefined' ? null || v;
    }

    Trieson.prototype = {
        /**
         * Add a string to the trie
         *
         * @method add
         * @chainable
         * @param {String} s String to add
         * @param {any} [d] Data to associate with string
         */
        add: function(s, d) {
            if(s.length > 0) {
                var c = s[0],
                    r = s.substr(1);

                if(c in this._next) {
                    // TODO: manage weights
                } else {
                    this._next[c] = r ? new Trieson(d) : new Trieson();
                }

                // add remaining characters recursively
                return this._next[c].add(r, d);
            }

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
            var n = this._next;

            for (var i = 0, l = s.length; i < l; i++) {
                var c = s[i];

                if(c in n) {
                    n = n._next[c];

                    if(i == s.length - 1) {
                        // reached end of string
                        return n._value;
                    }
                } else {
                    break;
                }
            }

            return null;
        },

        /**
         * Test whether a string is in the trie
         *
         * @method has
         * @param {String} s String to test
         * @return {Boolean} Whether string is in trie
         */
        has: function(s) {
            return this.get(s) !== null;
        }
    };
});
