const MATCH = 0;
const INSERT = 1;
const DELETE = 2;
const SWAP = 3;

class Operation {
    parent: number;
    cost: number;
    
    constructor() {
        this.parent = -1;
        this.cost = 0;
    }

    get [Symbol.toStringTag]() {
      return `${this.parent}|${this.cost}`
    }
}

function stringCompare(s: string, t: string): number {
    const MAXLEN = Math.max(s.length, t.length);
    let options = new Array(4);

    // Initializing the DP table
    const m: Operation[][] = Array.from({length: MAXLEN + 1}, () => Array.from({length: MAXLEN + 1}, () => new Operation()));

    function insertOrDelete(char1: string): number { 
        return 1;
    }

    function match(char1: string, char2: string): number {
        return char1 === char2 ? 0 : 1;
    }

    function rowInit(i: number): void {
        m[0][i].cost = i;
        if (i > 0) m[0][i].parent = INSERT;
    }

    function colInit(i: number): void {
        m[i][0].cost = i;
        if (i > 0) m[i][0].parent = DELETE;
    }

    for(let i = 0; i <= MAXLEN; i++) {
        rowInit(i);
        colInit(i);
    }

    // function reconstructPath(s: string, t: string, i: number, j: number) {
    //   if(m[i][j].parent === -1) return

    // }

    for(let i = 1; i <= s.length; i++) {
        for(let j = 1; j <= t.length; j++) {

            options[MATCH] = m[i-1][j-1].cost + match(s[i-1], t[j-1]);
            options[INSERT] = m[i][j-1].cost + insertOrDelete(t[j-1]);
            options[DELETE] = m[i-1][j].cost + insertOrDelete(s[i-1]);
            options[SWAP] = Infinity;

            if(i > 1 && j > 1 && s[i-2]===t[j-1] && s[i-1] === t[j-2]) {
              options[SWAP] = m[i-2][j-2].cost + 1
            }

            // console.log(options, i, j, s[i-1], s[j-1], s[i], s[j])

            m[i][j].cost = options[MATCH];
            m[i][j].parent = MATCH;
            for(let k = INSERT; k <= SWAP; k++) {
                if(options[k] < m[i][j].cost) {
                    m[i][j].cost = options[k];
                    m[i][j].parent = k;
                }
            }
        }
    }

    return m[s.length][t.length].cost;
}

console.log(stringCompare('thou shalt not', "you should not"));
console.log(stringCompare('u', 'u'));
console.log(stringCompare('steve', 'setve'));