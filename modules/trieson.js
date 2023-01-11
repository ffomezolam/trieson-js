/**
 * trieson.js
 *
 * Exports Trieson class
 *
 * TODO: consider allowing false as terminating data
 */

import { Triesonode } from './triesonode.js';

let combos = await import('./combos.js');

/**
 * Trieson class
 */
class Trieson {
    constructor(proc) {
        this._root = new Triesonode();
        this._proc = proc || combos.seq_to_end;
        this._depth = 0;
        this.dict = new Set();
    }

    /**
     * Add a string to Trie, associate with data
     */
    add(str, data = true, proc) {
        // use default proc if not specified
        if(!proc) proc = this._proc;

        // convert to array for proc
        if(typeof str == 'string') str = [str];

        // add to dict
        for(let s of str) this.dict.add(s);

        // apply proc
        pstr = [];
        for(let s of str) {
            for(let ps of proc(s)) {
                pstr.push(ps);
            }
        }

        // add characters for each string
        for(let s of pstr) {
            let node = this._root;
            let depth = 0;

            for(let c of s) {
                node = node.add(c);
                depth += 1;
            }

            node.data(data);
            if(depth > this._depth) this._depth = depth;
        }

        return this;
    }

    /**
     * Get node corresponding to final character of prefix
     */
    _get_node_at_prefix(prefix, proc) {
        if(!prefix) return this._root;

        // traverse trie
        let node = this._root;
        for(let c of prefix) {
            node = node.get(c);
            if(!node) return undefined;
            if(proc) proc(node);
        }

        return node;
    }

    /**
     * Check for any sequence of characters in Trie
     */
    has_prefix(prefix) {
        return !!this._get_node_at_prefix(prefix);
    }

    /**
     * Check if string is in Trie
     */
    has(str) {
        let node = this._root;
        for(let c of str) {
            node = node.get(c);
            if(!node) return false;
        }

        if(node.data()) return true;

        return false;
    }

    /**
     * Get data associated with string
     */
    get(str) {
        if(!str) return this.make();

        // get ending node
        let node = this._get_node_at_prefix(str);
        if(!node || !node.data()) return undefined;

        return node.data();
    }

    /**
     * Collect and return substrings
     *
     * TODO: Needs to be finished once triesonode traverse is corrected
     */
    substrings(prefix, limit) {
        let str = '';
        let coll = [];
        let count = 0;
        let limit = limit || 0;
        let root = prefix ? this._get_node_at_prefix(prefix) : this._root;

        // preprocessing function to add letter and check for word
        function preproc(node) {
        }

        // postprocessing function to remove letter from string
        function postproc(node) {
        }
    }

    /**
     * Get possible matches to string
     */
    match(str, limit) {
        if(!this.has_prefix(str)) return [str];

        let coll = [];
        for(let sub in this.substrings(str, limit)) {
            coll.push(str + sub);
        }

        return coll;
    }

    /**
     * Make a random string
     */
    make(prefix, weight = 1) {
        let word = [];

        function proc(node) {
            word.push(node._value);
        }

        let node = this._get_node_at_prefix(prefix, proc);

        while(true) {
            node = node.get(undefined, weight);
            if(!node) break;
            word.push(node._value);
        }

        return word.join('');
    }

    /**
     * Get Trie depth
     */
    depth() {
        return this._depth;
    }
}
