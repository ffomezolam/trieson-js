/**
 * Trie implementations with some rebellious features
 *
 * @module trieson
 */

(function(name, context, definition) {
    if(typeof module !== 'undefined' && module.exports) module.exports = definition();
    else if(typeof define === 'function' && define.amd) define(definition);
    else context[name] = definition();
})("Trieson", this, function() {
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

    /**
     * Trieson constructor
     * TODO: Switch container types
     * TODO: Allow removal of entries (maybe?)
     *
     * @class Trieson
     * @constructor
     */
    function Trieson(opts) {
        this._data = new RandomContainer();

        if(opts && 'depth' in opts) this._depth = opts.depth;
    }

    /**
     * Create terminal node
     *
     * @method _setTerminal
     * @private
     * @chainable
     * @param {any} [d] Data to associate with node
     */
    Trieson.prototype._setTerminal = function(d) {
        this._value = (typeof d == 'undefined') ? true : d;
        return this;
    };

    /**
     * Whether is terminal node
     *
     * @method _isTerminal
     * @private
     * @return {Boolean} Whether is terminal node
     */
    Trieson.prototype._isTerminal = function() {
        return '_value' in this;
    };

    /**
     * Add a string to the trie
     *
     * @method add
     * @chainable
     * @param {String} s String to add
     * @param {any} [d] Data to associate with string
     */
    Trieson.prototype.add = function(s, d) {
        var n = this;

        for(var i = 0, l = s.length; i < l; i++) {
            var c = s[i];

            if(c in n) {
                // already exists
            } else {
                n[c] = new Trieson();
                n._data.add(c);
            }

            n = n[c];
        }

        n._setTerminal(d);

        return this;
    };

    /**
     * Get data associated with string
     *
     * @method get
     * @param {String} s String to query
     * @return {any} Data associated with string
     */
    Trieson.prototype.get = function(s) {
        var n = this;

        for (var i = 0, l = s.length; i < l; i++) {
            var c = s[i];

            if(c in n) {
                n = n[c];

                if(i == s.length - 1 && n._isTerminal()) {
                    // reached end of string and have string
                    return n._value;
                }
            } else {
                break;
            }
        }

        return null;
    };

    /**
     * Test whether a string is in the trie
     *
     * @method has
     * @param {String} s String to test
     * @return {Boolean} Whether string is in trie
     */
    Trieson.prototype.has = function(s) {
        return this.get(s) !== null;
    };

    /**
     * Provide possible matches
     *
     * @method match
     * @param {String} s String to match
     * @param {Number} [limit] Maximum numbner of matches
     * @return {Array} List of possible matches
     */
    Trieson.prototype.match = function(s, limit) {
        limit = limit || 0;
        var matches = [],
            o = [],
            c = 0;

        function next(t, v) {
            if(v) {
                var i = v[0],
                    r = v.substr(1);

                if(i in t) {
                    o.push(i);
                    next(t[i], r);
                }
            } else {
                if(c >= limit) return true;

                if(t._isTerminal()) {
                    matches.push(o.join(''));
                    c++;
                }

                var ks = t._data;

                for(var i = 0, l = ks.length; i < l; i++) {
                    var k = ks.get(i);
                    o.push(k);
                    if(next(t[k])) return true;
                }
            }

            o.pop();
        }

        next(this, s);

        return matches;
    };

    /**
     * Generate a random string from trie
     *
     * @method generate
     * @return {String} Random string
     */
    Trieson.prototype.generate = function() {
        var n = this,
            d = n._data,
            s = [];

        while(d.length) {
            var k = d.get();
            s.push(k);
            n = n[k];
            d = n._data;
            if(n._isTerminal() && Math.random() >= 0.5) break;
        }

        return s.join('');
    };

    /**
     * Get collection of all possible strings
     *
     * @method all
     * @return {Array} All strings in trie
     */
    Trieson.prototype.all = function() {
        var all = [],
            str = [],
            n = this;
    };

    return Trieson;
});
