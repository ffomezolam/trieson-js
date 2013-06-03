/**
 * @module trieson
 */
(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition(/*require(deps)*/);
    else if(typeof define === 'function' && define.amd) define(/*[deps], */definition);
    else context[name] = definition();
})('Trieson', this, function(/*deps*/) {
    /**
     * @class Trieson
     * @constructor
     */
    function Trieson() {
        this.value = null;
        this.children = {};
        this._terminal = false;
    }

    Trieson.prototype = {
        /**
         * Add a character to the trie
         *
         * @method _addChild
         * @private
         * @chainable
         * @param {String} c Character to add
         */
        _addChild: function(c) {
            if(c == null) return this;
            if(!this.children[c]) this.children[c] = new Trieson();
            return this;
        },

        /**
         * Get a node from the trie
         *
         * @method _getChild
         * @private
         * @param {String} c Character to get
         * @return {Trieson} Node associated with character
         */
        _getChild: function(c) {
            if(this.children[c] == null) return null;
            return this.children[c];
        },

        /**
         * Remove a character from the trie
         *
         * @method _removeChild
         * @private
         * @chainable
         * @param {String} c Character to remove
         */
        _removeChild: function(c) {
            if(this.children[c] == null) return this;
            delete this.children[c];
            return this;
        },

        /**
         * Test if child node exists
         *
         * @method _hasChild
         * @private
         * @param {String} c Character to test
         * @return {Boolean} Whether child exists
         */
        _hasChild: function(c) {
            return this.children[c] != null;
        },

        /**
         * Test whether a string is in the trie
         *
         * @method has
         * @param {String} s String to test
         * @return {Boolean} Whether string is in trie
         */
        has: function(s) {
            var n = this;
            for (var i = 0, l = s.length; i < l; i ++) {
                var c = s.charAt(i);
                if(!n._hasChild(c)) return false;
                n = n._getChild(c);
            }
            return n._terminal ? true : false;
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
                n = this;

            for (i = 0; i < l; i++) {
                var c = s.charAt(i);
                n = n._addChild(c)._getChild(c);
            }

            n._terminal = true;
            n.value = d;

            return this;
        }
    };

    return Trieson;
});
