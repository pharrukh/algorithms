import sys
import random
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon

# Configuration for plot appearance
plt.rcParams['font.family'] = 'Arial'

# Global variables for counting comparisons and swaps
comparisons = 0
swaps = 0
include_comparison = False

# Colors
light_coffee_color = (239/255, 224/255, 185/255)
yellow_color = (255/255, 255/255, 0/255)
red_modern_color = (231/255, 76/255, 60/255)
green_modern_color = (0/255, 158/255, 96/255)
emerald_green_color = (80/255, 200/255, 120/255)
black_modern_color = (44/255, 62/255, 80/255)
gray_modern_color = (149/255, 165/255, 166/255)
blue_modern_color = (0/255, 120/255, 210/255)
white_modern_color = (220/255, 220/255, 220/255)

def generate_random_array(n):
    """Generates a random array of size n."""
    return [random.random() for _ in range(n)]

def less(v, w):
    """Checks if v is less than w and increments the comparison counter."""
    global comparisons
    comparisons += 1
    return v < w

def exch(A, i, j):
    """Exchanges elements at indices i and j in array A and increments the swap counter."""
    global swaps
    swaps += 1
    A[i], A[j] = A[j], A[i]

def setup_plot():
    """Sets up the plot with background color and removed spines."""
    fig = plt.gcf()
    fig.patch.set_facecolor(light_coffee_color)
    ax = plt.gca()
    ax.set_facecolor(light_coffee_color)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_position('zero')
    ax.yaxis.set_visible(False)
    plt.subplots_adjust(left=0.01, right=0.99, top=0.85, bottom=0.13)

def draw_bars(A, swapIndex1, swapIndex2, currentIndex, comparisonIndex):
    """Draws bars representing the array A."""
    plt.bar(range(len(A)), A, width=0.95, color=[
        yellow_color if i == currentIndex or i == comparisonIndex else
        red_modern_color if i == swapIndex1 or i == swapIndex2 else
        black_modern_color for i in range(len(A))
    ])

def add_text_and_labels(algorithm, iteration, h):
    """Adds title, subtitle, and source text to the plot."""
    title = f"{algorithm} Sort"
    subtitle = f"Comp.: {comparisons}, Swaps: {swaps}, Iter.: {iteration}"
    if algorithm == "Shell":
        subtitle += f", h: {h}"
    
    plt.title(title, fontsize=18, loc="left", fontfamily='Arial', fontweight='bold')
    plt.text(-0.5, 1.01, subtitle, fontsize=14, fontfamily='Arial')
    plt.text(-0.5, -0.2, "Source: Farrukh Normuradov", ha='left', fontsize=10, color='gray', fontfamily='Arial')

def draw_decorations():
    """Adds decorations such as rectangles to the plot."""
    fig = plt.gcf()
    ax = plt.gca()
    ax.add_patch(plt.Rectangle((0.01,0.98), 0.05, 0.55, facecolor=blue_modern_color, transform=fig.transFigure, clip_on=False, linewidth=0))
    ax.add_patch(plt.Rectangle((0.94, 0.02), 0.05, -0.55, facecolor=green_modern_color, transform=fig.transFigure, clip_on=False, linewidth=0))

def rerender(A, swapIndex1, swapIndex2, iteration, currentIndex, comparisonIndex, algorithm, h=0):
    """Rerenders the plot with updated data."""
    plt.clf()
    setup_plot()
    draw_bars(A, swapIndex1, swapIndex2, currentIndex, comparisonIndex)
    add_text_and_labels(algorithm, iteration, h)
    draw_decorations()
    plt.ylim(-0.05, 1.10)
    
    ax = plt.gca()
    ax.set_xlim(-0.5, len(A) - 0.5)
    ax.set_xticks([0] + list(range(1, len(A)-1, max(1, len(A)//10))) + [len(A)-1])
    ax.set_xticklabels([str(x) for x in ax.get_xticks()], fontfamily='Arial')
    ax.xaxis.set_tick_params(size=0)

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
    fig = plt.figure(figsize=(15, 3))

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
