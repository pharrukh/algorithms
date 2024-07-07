import sys
import random
import matplotlib.pyplot as plt

plt.rcParams['font.family'] = 'Arial'

comparisons = 0
swaps = 0
ligth_coffee_color = (239/255, 224/255, 185/255)
red_color = (255/255, 69/255, 0/255)
green_color = (34/255, 139/255, 34/255)

red_modern_color = (231/255, 76/255, 60/255)
black_modern_color = (44/255, 62/255, 80/255)
gray_modern_color = (149/255, 165/255, 166/255)

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

def rerender(A, iteration, destination, traceSet = set(), algorithm = "", h=0):
    plt.clf()
    fig = plt.gcf()
    
    fig.patch.set_facecolor(ligth_coffee_color)

    ax = plt.gca()
    ax.set_facecolor(ligth_coffee_color)

    # Hide all spines except the bottom one
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_position('zero')  # Position the bottom spine (x-axis) at y=0

    ax.set_xlim(-0.5, len(A) - 0.5)
    
    # Set the x-axis limits and display only the first and last values along with some intermediate values
    ax.set_xticks([0] + list(range(1, len(A)-1, max(1, len(A)//10))) + [len(A)-1])
    ax.set_xticklabels([str(x) for x in ax.get_xticks()], fontfamily='Arial')
    ax.xaxis.set_tick_params(size=0)  # Remove the tick marks

    ax.yaxis.set_visible(False)  # Hide the y-axis

    plt.subplots_adjust(left=0.01, right=0.99, top=0.85, bottom=0.13)  # Minimize margins

    plt.bar(range(len(A)), A, width=0.95, color=[
        red_modern_color if i == destination else
        gray_modern_color if i in traceSet else
        black_modern_color for i in range(len(A))
    ])
    title = f"{algorithm} Sort | i: {iteration} | Comp.: {comparisons} | Swaps: {swaps}"
    if algorithm == "Shell":
        title += f" | h: {h}"
    plt.title(title, fontsize=14, fontfamily='Arial')
    plt.text(-0.5, -0.2, "Source: Farrukh Normuradov", ha='left', fontsize=10, color='gray', fontfamily='Arial')
    plt.ylim(-0.05, 1.10)
    plt.pause(0.01)

def selection_sort(A):
    N = len(A)
    for i in range(N - 1):
        traceSet = set()
        min_idx = i
        for j in range(i + 1, N):
            traceSet.add(j)
            if less(A[j], A[min_idx]):
                min_idx = j
        if i != min_idx:
            exch(A, i, min_idx)
            rerender(A, i + 1, i, traceSet, "Selection")

def insertion_sort(A):
    N = len(A)
    for i in range(1, N):
        min_idx = i
        traceSet = set()
        for j in range(i, 0, -1):
            if less(A[j], A[j - 1]):
                exch(A, j, j - 1)
                min_idx = j - 1
                traceSet.add(j)
                traceSet.add(j-1)
            else:
                break
        rerender(A, i+1, min_idx, traceSet, "Insertion")

def shell_sort(A):
    N = len(A)
    h = 1
    while h < N // 3:
        h = h * 3 + 1
    while h >= 1:
        for i in range(h, N):
            traceSet = set()
            min_idx = i
            for j in range(i, h-1, -h):
                if less(A[j], A[j - h]):
                    exch(A, j, j - h)
                    min_idx = j - 1
                    traceSet.add(j)
                    traceSet.add(j-1)
            rerender(A, i + 1, min_idx, traceSet, "Shell", h)
        h //= 3

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
    fig = plt.figure(figsize=(15, 3))
    fig.patch.set_facecolor(ligth_coffee_color)  # Set the background color to light coffee

    if algorithm.lower() == "selection":
        selection_sort(A)
    elif algorithm.lower() == "insertion":
        insertion_sort(A)
    elif algorithm.lower() == "shell":
        shell_sort(A)
    else:
        print("Unknown algorithm:", algorithm)
        sys.exit(1)

    rerender(A, -1, n, algorithm=algorithm)

    plt.ioff()
    plt.show()

if __name__ == "__main__":
    main()
