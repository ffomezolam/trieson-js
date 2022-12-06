/** @module combos */

/**
 * Return all sequential combinations of minimum length.
 */
export function seq_all(seq, min=2) {
    slen = seq.length
    results = []

    for(let i = 0; i < slen - min; i++) {
        for(let j = i+(min - 1); j < slen; j++) {
            if(j - i >= min) {
                results.append(seq.slice(i, j))
            }
        }
    }

    return results
}

/**
 * Return sequential combinations of minimum length to end of sequence.
 */
export function seq_to_end(seq, min=2) {
    slen = seq.length
    results = []

    for(let i = 0; i < slen; i++) {
        if(slen - i >= 2) {
            results.append(seq.slice(i))
        }
    }

    return results
}

/**
 * Return entire sequence.
 */
export function none(seq) {
    return [seq]
}
