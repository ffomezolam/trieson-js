/**
 * Basic trie implementation
 *
 * @module trieson
 * @requires roulette
 */

var Container = require('../roulette/roulette');

/**
 * Trie weighted node class
 *
 * @class TriesonWeightedNode
 * @constructor
 */
function TriesonWeightedNode() {
    this.value = null;
    this.children = {};
    this._collection = new Container();
}

TriesonWeightedNode.prototype = {
    /**
     * Add a child to the node
     *
     * @method add
     * @chainable
     * @param {String} c Character to add
     */
    add: function(c) {
        if(c == null) return this;
        if(!this.children[c]) this.children[c] = new TriesonWeightedNode();
        this._collection.add(c);
        this._collection.setWeights();
        return this;
    },

    /**
     * Get a child from the node explicitly or be weighted random selection
     *
     * @method get
     * @param {String} [c] Character to get
     * @return {Trieson} Node associated with character
     */
    get: function(c) {
        if(c != null) {
            if(this.children[c] == null) return null;
            return this.children[c];
        } else {
            // weighted selection
            var child = this._collection.get();
            return child;
            //return this.children[child];
        }
    },

    /**
     * Remove a child from the node
     *
     * @method remove
     * @chainable
     * @param {String} c Character to remove
     */
    remove: function(c) {
        if(this.children[c] == null) return this;
        this._collection.remove(c);
        if(!this._collection.has(c)) delete this.children[c];
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
     * Return an array of sorted child keys
     *
     * @method keys
     * @return {Array} Array of sorted child keys
     */
    keys: function() {
        var chars = [];
        for(var key in this.children) {
            chars.push(key);
        }
        chars.sort();
        return chars;
    }
};

module.exports = TriesonWeightedNode;
