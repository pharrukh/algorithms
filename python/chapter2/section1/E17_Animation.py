import sys
import random
import matplotlib.pyplot as plt

comparisons = 0
swaps = 0
include_comparison = False

def generate_random_array(n):
    return [random.random() for _ in range(n)]

def less(v, w):
    global comparisons
    comparisons += 1
    return v < w

def exch(A, i, j):
    global swaps
    swaps += 1
    A[i], A[j] = A[j], A[i]

def rerender(A, swapIndex1, swapIndex2, iteration, currentIndex, comparisonIndex, algorithm, h=0):
    plt.clf()
    plt.bar(range(len(A)), A, color=[(255/255, 255/255, 0/255) if i == currentIndex or i == comparisonIndex else
                                     (255/255, 69/255, 0/255) if i == swapIndex1 or i == swapIndex2 else
                                     (34/255, 139/255, 34/255) for i in range(len(A))])
    title = f"{algorithm} Sort | i: {iteration} | Comp.: {comparisons} | Swaps: {swaps}"
    if algorithm == "Shell":
        title += f" | h: {h}"
    plt.title(title)
    plt.ylim(-0.05, 1.10)
    plt.pause(0.01)

def selection_sort(A):
    N = len(A)
    for i in range(N - 1):
        min_idx = i
        for j in range(i + 1, N):
            if include_comparison:
                rerender(A, -1, -1, i + 1, i, j, "Selection")
            if less(A[j], A[min_idx]):
                min_idx = j
        if i != min_idx:
            exch(A, i, min_idx)
            rerender(A, i, min_idx, i + 1, -1, -1, "Selection")
    rerender(A, -1, -1, N, -1, -1, "Selection")

def insertion_sort(A):
    N = len(A)
    for i in range(1, N):
        for j in range(i, 0, -1):
            if less(A[j], A[j - 1]):
                exch(A, j, j - 1)
                rerender(A, j, j - 1, i + 1, -1, -1, "Insertion")
            else:
                break
    rerender(A, -1, -1, N, -1, -1, "Insertion")

def shell_sort(A):
    N = len(A)
    h = 1
    while h < N // 3:
        h = h * 3 + 1
    while h >= 1:
        for i in range(h, N):
            for j in range(i, h-1, -h):
                if less(A[j], A[j - h]):
                    exch(A, j, j - h)
                    rerender(A, j, j - h, i + 1, -1, -1, "Shell", h)
        h //= 3
    rerender(A, -1, -1, N, -1, -1, "Shell", 1)

def main():
    global include_comparison
    if len(sys.argv) < 3:
        print("Usage: python Animation.py <algorithm> <array size> <include comparison>")
        sys.exit(1)

    algorithm = sys.argv[1]
    n = int(sys.argv[2])
    include_comparison = sys.argv[3].lower() == 'includecomparison' if len(sys.argv) > 3 else False
    A = generate_random_array(n)

    plt.ion()
    fig = plt.figure(figsize=(10, 6))

    if algorithm.lower() == "selection":
        selection_sort(A)
    elif algorithm.lower() == "insertion":
        insertion_sort(A)
    elif algorithm.lower() == "shell":
        shell_sort(A)
    else:
        print("Unknown algorithm:", algorithm)
        sys.exit(1)

    plt.ioff()
    plt.show()

if __name__ == "__main__":
    main()
