/**
 * Triesonode.js
 *
 * Exports the class representing a trie node
 */

// TODO: Import roulette library
import { roulette } from '.';

/**
 * Class for Trieson trie nodes
 */
class Triesonode {
    constructor(parent, value) {
        this._value = value;
        this._count = 1;
        this._children = {};
        this._parent = parent;
        this._data;
    }

    /**
     * Add character(s) as children of the node
     */
    add(char, chain = true) {
        // as a convenience for passing a string as char:
        // will add each character to this node
        if(char.length > 1) {
            for(let c of char) {
                this.add(c, false)
            }
            return this;
        }

        // if char exists, increment count, else add new node
        if(char in this._children) {
            this._children[char]._inc()
        } else {
            this._children[char] = new Triesonode(this, char)
        }

        // return child if chaining...
        if(chain) {
            return this._children[char]
        }

        // ...otherwise get same node back
        return this
    }

    /**
     * Return specified child node if exists, or get random if not specified.
     *
     * Random selection is based on child count, as modified by `weight`
     * parameter. Weight of 1 is baseline, 0 is all equal. Counts are raised
     * to `weight` power to determine final weighing for random selection.
     */
    get(char, weight = 1) {
        // No children? Return undefined
        if(!this._children.length) {
            return undefined
        }

        // if no char is provided, generate one from children
        if(char === undefined) {
            // get child nodes
            let children = Object.values(this._children);

            // create values and weights for random selection
            let values = [];
            let weights = [];
            children.forEach(function(child) {
                values.push(child._value);
                weights.push(child._count ** weight); // scale weight
            })

            // select by weighted choice
            char = roulette(values, weights);
        }

        // If char not in children, return undefined
        if(!(char in this._children)) return undefined;

        return this._children[char];
    }

    /**
     * Check if child node exists.
     * Can pass integer (pos or neg) to limit success to children that have
     * at least or at most that count.
     *
     * If no char specified, get a list of all child keys.
     */
    has(char, n=0) {
        if(!char) {
            return Object.keys(this._children)
        }

        // standard (n=0)
        if(!n) {
            return (char in this._children)
        } else if(n < 0) {
            return (char in this._children) && (this._children[char]._count <= -n)
        } else {
            return (char in this._children) && (this._children[char]._count >= n)
        }
    }

    /**
     * Get or set data for node
     */
    data(data) {
        if(data === undefined) {
            return this._data
        }

        this._data = data
        return this
    }

    /**
     * Get child nodes as array
     */
    children() {
        return Object.values(this._children)
    }

    /**
     * Get parent node
     */
    parent() {
        return this._parent
    }

    /**
     * Recursive depth-first traversal over all nodes
     *
     * TODO: Can we make this a generator? Otherwise has to return array
     */
    traverse(pre, post) {
        let children = Object.values(this._children)

        for(child in children) {
            if(pre !== undefined) pre(child);

            child.traverse(pre, post);

            if(post !== undefined) post(child);
        }
    }

    _inc() {
        this._count += 1
        return this
    }
}

export {Triesonode}
