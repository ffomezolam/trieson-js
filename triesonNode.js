/**
 * Basic trie implementation
 *
 * @module trieson
 */

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
     * @param {String} c Character to test
     * @return {Boolean} Whether child exists
     */
    has: function(c) {
        return this.children[c] != null;
    },

    /**
     * Return keys as sorted array
     *
     * @method keys
     * @return {Array} Sorted array of keys
     */
    keys: function() {
        var keys = [];
        for(var k in this.children) keys.push(k);
        return keys.sort();
    },

    /**
     * Return children as array in key-sorted order
     *
     * @method toArray
     * @return {Array} Sorted array of children
     */
    toArray: function() {
        var keys = this.keys(),
            children = [],
            l = keys.length,
            i;

        for(i = 0; i < l; i++) children.push(this.children[keys[i]]);

        return children;
    }
};

module.exports = TriesonNode;
