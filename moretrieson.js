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

    function TriesonNode() {
        this._data = null;
    }

    TriesonNode.prototype.add = function(c) {
        if(!(c in this)) {
            this[c] = new TriesonNode();
            if(!this._data) this._data = new RandomContainer();
            this._data.add(c);
            console.log('added', c);
        }
        return this;
    };

    TriesonNode.prototype.get = function(c) {
        return this[c];
    };

    TriesonNode.prototype.map = function(fn) {
        if(!this._data || !this._data.length) return;
        console.log('mapping', this);
        for(var i = 0, l = this._data.length; i < l; i++) {
            var c = this._data[i],
                n = this.get(c);
            console.log(c);
            fn(c);
            n.map(fn);
        }
    };

    /**
     * MoreTrieson class
     *
     * @class MoreTrieson
     * @constructor
     * @param {Object} [opts] Options
     */
    function MoreTrieson(opts) {
        this._root = new TriesonNode();
        this._depth = 3;
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

        n.add('^');
        n = n.get('^');

        for(var i = 0, j = 0, l = a.length; i < l; i++, j = i % this._depth) {
            n.add(a[i]);
            n = n.get(a[i]);
        }

        n.add('$');

        return this;
    };

    MoreTrieson.prototype.all = function() {
        var n = this._root;
        n.map(console.log);
    };

    return MoreTrieson;
});
