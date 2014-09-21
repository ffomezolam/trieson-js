require('should');
var T = require('trieson');

describe('Trieson', function() {
    it('should initialize correctly', function() {
        var t = new T();
    })

    describe('#add()', function() {
        var t = new T();

        it('should add a string', function() {
            t.add('boy');
            t.add('booger');
            t.should.have.property('b');
            var n = t['b'];
            n.should.have.property('o');
            n = n['o'];
            n.should.have.property('y');
            n.should.have.property('o');
        })
    })

    describe('#get()', function() {
        var t = new T();
        it('should get an existing string and ignore substrings', function() {
            t.add('booger');
            t.add('boy');
            (t.get('babe') === null).should.be.ok;
            (t.get('boog') === null).should.be.ok;
            t.get('boy').should.be.ok;
            t.get('booger').should.be.ok;
            t.add('boog');
            t.get('boog').should.be.ok;
        })
    })

    describe('#match()', function() {
        var t = new T();
        it('should return similar strings', function() {
            t.add('bomber');
            t.add('bob');
            t.add('barbie');
            t.add('mustache');
            t.match('', 4).length.should.equal(4);
            t.match('', 4).should.containEql('bob');
            t.match('b').should.not.containEql('mustache');
        })
    })

    describe('#generate()', function() {
        var t = new T();
        it('should return a string', function() {
            t.add('arthur');
            t.add('ambush');
            t.add('bangalore');
            t.add('ban');
            t.add('art');
            t.generate().should.be.type('string');
        })
    })
});
