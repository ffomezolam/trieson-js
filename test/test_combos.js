import * as combos from '../modules/combos.js';
import {assert} from 'chai'

let ss = ['apple', 'apply', 'apiary', 'bored'];

describe('seq_all', function() {
    ss.forEach(function(s) {
        let cs = combos.seq_all(s);

        cs.forEach(function(c) {
            describe(`#${c}`, function() {
                it(`should be in ${s}`, function() {
                    assert.include(s, c)
                })

                it('should not contain "ag"', function() {
                    assert.notEqual(c, 'ag')
                })
            })
        })

        describe(`#combos ${cs}`, function() {
            let start = s.slice(0,2)
            let middle = s.slice(1,4)
            let end = s.slice(-3)

            it(`should contain ${s}`, function() {
                assert.include(cs, s)
            })

            it(`should contain ${start}`, function() {
                assert.include(cs, start)
            })

            it(`should contain ${middle}`, function() {
                assert.include(cs, middle)
            })

            it(`should contain ${end}`, function() {
                assert.include(cs, end)
            })
        })
    })
})

describe('seq_to_end', function() {
    ss.forEach(function(s) {
        let cs = combos.seq_to_end(s);

        cs.forEach(function(c) {
            describe(`#${c}`, function() {
                it(`should be in ${s}`, function() {
                    assert.include(s, c)
                })
            })
        })

        describe(`#combos ${cs}`, function() {
            let start = s.slice(0,2)
            let middle = s.slice(1,4)
            let end = s.slice(-3)

            it(`should not contain ${start}`, function() {
                assert.notInclude(cs, start)
            })

            it(`should not contain ${middle}`, function() {
                assert.notInclude(cs, middle)
            })

            it(`should contain ${end}`, function() {
                assert.include(cs, end)
            })
        })
    })
});

describe('none', function() {
    ss.forEach(function(s) {
        let cs = combos.none(s);

        describe(`#combos ${cs}`, function() {
            let start = s.slice(0,2)
            let middle = s.slice(1,4)
            let end = s.slice(-3)

            it('should have length 1', function() {
                assert.equal(cs.length, 1)
            })

            it(`should equal ${s}`, function() {
                assert.equal(s, cs[0])
            })

            it(`should not contain ${start}`, function() {
                assert.notInclude(cs, start)
            })

            it(`should not contain ${middle}`, function() {
                assert.notInclude(cs, middle)
            })

            it(`should not contain ${end}`, function() {
                assert.notInclude(cs, end)
            })
        })
    })
})
