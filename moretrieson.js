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

    /**
     * This gets a random letter or gets a random letter following argument
     */
    TriesonNode.prototype.get = function(s) {
        if(typeof s == 'undefined') return this._data.get();

        var n = this;

        for(var i = 0, l = s.length; i < l; i++) {
            var c = s[i];
            if(!n._data.length || !(c in this)) return null;
            n = n[c];
        }

        return n._data.length ? n._data.get() : null;
    };

    TriesonNode.prototype.each = function(fn) {
        if(!this._data || !this._data.length) return;
        for(var i = 0, l = this._data.length; i < l; i++) {
            var c = this._data.get(i),
                n = this[c];
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
            endings: (opts && 'endings' in opts) ? opts.endings : true,
            beginnings: (opts && 'beginnings' in opts) ? opts.beginnings : true
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

        for(var i = 0, l = a.length; i < l; i++) {
            // TODO: this isn't adding characters correctly - needs to
            // backtrack
            n.add(a[i]);
            n = n.[a[i]];
        }

        n.add(this._chars.end);

        return this;
    };

    /**
     * Get a string from the trie
     *
     * @method get
     * @return {String} String
     */
    MoreTrieson.prototype.get = function() {
        var n = this._root,
            word = [],
            i = d = jj = 0,
            c = null;

        // 1. get first character
        if(this._opts.beginnings) {
            word.push(this._chars.start);
            n = n[this._chars.start];
        } else {
            c = n.get();
            word.push(c);
            n = n[c];
        }

        // 2. do initial run to search depth
        for(d = 1; d <= this._opts.searchDepth; d++) {
            c = n.get();
            // TODO: check for terminating char
            word.push(c);
            n = n[c];
        }

        i = word.length - 1; // last index
        n = this._root;      // reset starting node

        // 3. keep going based on parameters
        while(true) {
            jj = d;
            var c = null;
            while(c === null) {
                var chars = jj ? word.slice(-jj).join('') : null;
                c = n.get(chars || undefined);
                jj--;
            }
            word.push(c);
            i++;
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
