/**
 * Basic trie implementation
 *
 * @module triesonNode
 */
(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition(/*require(deps)*/);
    else if(typeof define === 'function' && define.amd) define(/*[deps], */definition);
    else context[name] = definition();
})('TriesonNode', this, function(/*deps*/) {
    /**
     * Trie node class
     *
     * @class TriesonNode
     * @constructor
     */
    function TriesonNode() {
        this.value = null;
        this.children = {};
    }

    TriesonNode.prototype = {
        /**
         * Add a character to the trie
         *
         * @method add
         * @private
         * @chainable
         * @param {String} c Character to add
         */
        add: function(c) {
            if(c == null) return this;
            if(!this.children[c]) this.children[c] = new TriesonNode();
            return this;
        },

        /**
         * Get a node from the trie
         *
         * @method get
         * @private
         * @param {String} c Character to get
         * @return {Trieson} Node associated with character
         */
        get: function(c) {
            if(this.children[c] == null) return null;
            return this.children[c];
        },

        /**
         * Remove a character from the trie
         *
         * @method remove
         * @private
         * @chainable
         * @param {String} c Character to remove
         */
        remove: function(c) {
            if(this.children[c] == null) return this;
            delete this.children[c];
            return this;
        },

        /**
         * Test if child node exists
         *
         * @method has
         * @private
         * @param {String} c Character to test
         * @return {Boolean} Whether child exists
         */
        has: function(c) {
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
            return !!this.get(s);
        }
    };

    return TriesonNode;
});
