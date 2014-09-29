/**
 * Trie implementation with more trecherous motivations
 *
 * @module trieson
 */
(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition();
    else if(typeof define === 'function' && define.amd) define(definition);
    else context[name] = definition();
})("MoreTrieson", this, function() {
    // TODO: There's an error in this because same character gets entered
    // multiple times. Fix it.
    function RandomContainer() {
        this._data = [];
        this.length = 0;
    }

    RandomContainer.prototype.add = function(a) {
        this._data.push(a);
        this.length = this._data.length;
        return this;
    };

    RandomContainer.prototype.get = function(i) {
        if(typeof i == 'number') return this._data[i];
        var rn = Math.floor(Math.random() * this.length);
        return this._data[rn];
    };

    function TriesonNode(c) {
        this._container = c;
        this._data = null;
    }

    TriesonNode.prototype.add = function(c) {
        if(!(c in this)) {
            this[c] = new TriesonNode(this._container);
            if(!this._data) this._data = new this._container();
            this._data.add(c);
        }

        return this;
    };

    TriesonNode.prototype.get = function(c) {
        if(typeof c == 'undefined') return this[this._data.get()];
        return this[c];
    };

    TriesonNode.prototype.each = function(fn) {
        if(!this._data || !this._data.length) return;
        for(var i = 0, l = this._data.length; i < l; i++) {
            var c = this._data.get(i),
                n = this.get(c);
            fn(c);
            n.map(fn);
        }
    };

    TriesonNode.prototype.isTerminal = function() {
        return !this._data;
    };

    /**
     * MoreTrieson class
     *
     * @class MoreTrieson
     * @constructor
     * @param {Object} [opts] Options
     */
    function MoreTrieson(opts) {
        this._container = (opts && 'container' in opts) ? opts.container : RandomContainer;
        this._root = new TriesonNode(this._container);
        this._depth = (opts && 'depth' in opts) ? opts.depth : 3;
        this._chars = {
            start: '^',
            end: '$'
        };
        this._opts = {
            searchDepth: (opts && 'searchDepth' in opts) ? opts.searchDepth : this._depth,
            maxLength: (opts && 'maxLength' in opts) ? opts.maxLength : 10,
            minLength: (opts && 'minLength' in opts) ? opts.minLength : 3,

        };
    }

    /**
     * Add a string to the trie
     *
     * @method add
     * @chainable
     * @param {String} s
     */
    MoreTrieson.prototype.add = function(s) {
        var a = s.split(''),
            n = this._root;

        n.add(this._chars.start);
        n = n.get(this._chars.start);

        for(var i = 0, j = 0, l = a.length; i < l; i++, j = i % this._depth) {
            n.add(a[i]);
            n = n.get(a[i]);
        }

        n.add(this._chars.end);

        return this;
    };

    /**
     * Get a string from the trie
     *
     * @method get
     * @return {String} String or null if doesn't exist
     */
    MoreTrieson.prototype.get = function(s) {
        var n = this._root;

        for(var i = 0, l = s.length; i < l; i++) {
        }
    };

    MoreTrieson.prototype.all = function() {
        var n = this._root,
            words = [];
        n.map(function(c) {
        });
    };

    return MoreTrieson;
});
