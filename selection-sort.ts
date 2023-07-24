function sort(A: number[]): void {
    for (let i = 0; i < A.length; i++) {
        let min = i;
        for (let j = i + 1; j < A.length; j++) {
            if (A[j] < A[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [A[i], A[min]] = [A[min], A[i]];
        }
    }
}