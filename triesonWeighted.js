/**
 * Weighted selection trie implementation
 *
 * @module trieson
 */

var triesonNode = require('./triesonWeightedNode');

function repeat(s, n) {
    var out = [];
    for(var i = 0; i < n; i++) {
        out.push(s);
    }
    return out.join('');
}

/**
 * Trie class
 * TODO: set up initialization method
 *
 * @class Trieson
 * @constructor
 */
function TriesonWeighted(depth) {
    this._root = new triesonNode();
    this.depth = depth || 3;
}

TriesonWeighted.prototype = {
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
    add: function(s, data) {
        if(s.charAt(0) != '^') s = '^' + s;
        if(s.charAt(s.length - 1) != '$') s = s + '$';

        var i, d,
            l = s.length,
            n = this._root;

        for (i = d = 0; i < l; i++, d++) {
            if(d >= this.depth) {
                n = this._root;
                i = i - (d - 1);
                d = 0;
            }

            var c = s.charAt(i);
            n = n.add(c).get(c);
        }

        n.value = data || true;

        return this;
    },

    /**
     * Get data associated with string
     *
     * @method get
     * @param {String} [s] String to query
     * @return {any} Data associated with string
     */
    get: function(s) {
        var n = this._root;
        if(s) {
        } else {
            // get by weighted random selection
            var chars = [];
            while(true) {
                var k = n.get();
                console.log("key:", k);
                if(!k) return chars.join('');
                chars.push(k);
                n = n.children[k];
            }
        }
    },

    /**
     * Output trie as a string
     *
     * @method toString
     * @return {String} String representation of the trie
     */
    toString: function() {
        var n = this._root;

        function getString(n) {
            var keys = n.keys(),
                l = keys.length,
                string = '',
                i;

            for(i = 0; i < l; i++) {
                var key = keys[i],
                    next = getString(n.children[key]);

                string += key + (next || "\n");
            }

            return string;
        }

        return getString(n);
    }
};

module.exports = TriesonWeighted;
