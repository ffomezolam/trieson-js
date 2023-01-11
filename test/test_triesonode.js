import {Triesonode} from "../modules/triesonode.js"
import {assert} from 'chai'

let trie = new Triesonode()
let strings = ['abc', 'def', 'ghi', 'aei']
let chars = ['x', 'y', 'z']

describe('Triesonode', function() {
    describe('#add', function() {

        chars.forEach(function(c) {
            trie.add(c)
            it(`should have ${c}`, function() {
                assert.include(Object.keys(trie._children), c)
            })
            it(`${c} should be of type Triesonode`, function() {
                assert.instanceOf(trie._children[c], Triesonode)
            })
        })

        strings.forEach(function(s) {
            trie.add(s)
            for(let c of s) {
                it(`should have ${c}`, function() {
                    assert.include(Object.keys(trie._children), c)
                })
            }
        })

        for(let c of 'aei') {
            it(`should have count 2 for '${c}'`, function() {
                assert.equal(trie._children[c]._count, 2)
            })
        }

        for(let c of 'xyz') {
            it(`should have count 1 for '${c}'`, function() {
                assert.equal(trie._children[c]._count, 1)
            })
        }
    })
})
