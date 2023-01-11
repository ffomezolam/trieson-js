/** @module combos */

/**
 * Return all sequential combinations of minimum length.
 */
function seq_all(seq, min=2) {
    let slen = seq.length
    let results = []

    for(let i = 0; i <= slen - min; i++) {
        for(let j = i + (min - 1); j <= slen; j++) {
            if(j - i >= min) {
                results.push(seq.slice(i, j))
            }
        }
    }

    return results
}

/**
 * Return sequential combinations of minimum length to end of sequence.
 */
function seq_to_end(seq, min=2) {
    let slen = seq.length
    let results = []

    for(let i = 0; i < slen; i++) {
        if(slen - i >= 2) {
            results.push(seq.slice(i))
        }
    }

    return results
}

/**
 * Return entire sequence.
 */
function none(seq) {
    return [seq]
}

export {seq_all, seq_to_end, none}
