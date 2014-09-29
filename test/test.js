var should = require('should');
var fs = require('fs');

describe('Trieson', function() {
    var Trieson = require('../trieson');
    var t = new Trieson();

    describe('add()', function() {
        it('should return a the Trieson instance', function() {
            (t.add('booger')).should.equal(t);
            (t.add('prototype')).should.equal(t);
            (t.add('baritone')).should.equal(t);
            (t.add('porridge')).should.equal(t);
        });
    });


    describe('has()', function() {
        it('should return true if a string is in the trie', function() {
            (t.has('prototype')).should.equal(true);
        });
        it('should return false if a string is not in the trie', function() {
            (t.has('protobaby')).should.equal(false);
        });
    });

    describe('get()', function() {
        it('should not return null if the string is in the trie', function() {
            (t.get('booger')).should.not.equal(null);
        });

        it('should return null if the string is not in the trie', function() {
            should.not.exist(t.get('baby'));
        });
    });

    describe('toString()', function() {
        it('should return a string', function() {
            (typeof t.toString()).should.equal('string');
        });
    });
});

describe('TriesonWeightedNode', function() {
    var TriesonWeightedNode = require('../triesonWeightedNode');
    var node = new TriesonWeightedNode();

    describe('add()', function() {
        node.add('x').add('y').add('z');
        it('should add an item to the node and the collection', function() {
            node.children.should.have.property('x');
            node.children.should.have.property('y');
            node.children.should.have.property('z');
            node._collection.has('x').should.be.ok;
            node._collection.has('y').should.be.ok;
            node._collection.has('z').should.be.ok;
        });
    });

    describe('get()', function() {
        it('should return a random item if called with no arguments', function() {
            should.exist(node.get());
            should.exist(node.get());
            should.exist(node.get());
        });
    });
});

describe('TriesonWeighted', function() {
    var TriesonWeighted = require('../triesonWeighted');
    var t = new TriesonWeighted();

    t.add('hello').add('hobby').add('orange');
    console.log('trie:', t.toString());
    console.log('get:', t.get());
});
