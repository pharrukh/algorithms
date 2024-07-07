import sys
import random
import matplotlib.pyplot as plt

# Configuration for plot appearance
plt.rcParams['font.family'] = 'Arial'

# Global variables for counting comparisons and swaps
comparisons = 0
swaps = 0

# Colors
ligth_coffee_color = (239/255, 224/255, 185/255)
red_modern_color = (231/255, 76/255, 60/255)
black_modern_color = (44/255, 62/255, 80/255)
gray_modern_color = (149/255, 165/255, 166/255)
blue_modern_color = (0/255, 120/255, 210/255)
white_modern_color = (220/255, 220/255, 220/255)
green_modern_color = (0/255, 158/255, 96/255)
speed_delay = 0.5

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
    fig.patch.set_facecolor(ligth_coffee_color)
    ax = plt.gca()
    ax.set_facecolor(ligth_coffee_color)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_position('zero')
    ax.yaxis.set_visible(False)
    plt.subplots_adjust(left=0.01, right=0.99, top=0.85, bottom=0.13)

def draw_bars(A, destination, traceSet):
    """Draws bars representing the array A."""
    plt.bar(range(len(A)), A, width=0.95, color=[
        red_modern_color if i == destination else
        black_modern_color if i in traceSet else
        gray_modern_color for i in range(len(A))
    ])

def add_text_and_labels(algorithm, h):
    """Adds title, subtitle, and source text to the plot."""
    title = f"{algorithm} Sort"
    subtitle = f"Comp.: {comparisons}, Swaps: {swaps}"
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

def rerender(A, destination, traceSet=set(), algorithm="", h=0):
    """Rerenders the plot with updated data."""
    plt.clf()
    setup_plot()
    draw_bars(A, destination, traceSet)
    add_text_and_labels(algorithm, h)
    draw_decorations()
    plt.ylim(-0.05, 1.10)
    
    ax = plt.gca()
    ax.set_xlim(-0.5, len(A) - 0.5)
    ax.set_xticks([0] + list(range(1, len(A)-1, max(1, len(A)//10))) + [len(A)-1])
    ax.set_xticklabels([str(x) for x in ax.get_xticks()], fontfamily='Arial')
    ax.xaxis.set_tick_params(size=0)

    # Add delay based on speed
    plt.pause(speed_delay)

def selection_sort(A):
    N = len(A)
    for i in range(N - 1):
        traceSet = set()
        min_idx = i
        for j in range(i + 1, N):
            traceSet.add(j)
            if less(A[j], A[min_idx]):
                min_idx = j
        rerender(A, min_idx, traceSet, "Selection")
        exch(A, i, min_idx)

def insertion_sort(A):
    N = len(A)
    for i in range(1, N):
        min_idx = -1
        traceSet = set()
        for j in range(i, 0, -1):
            traceSet.add(j)
            traceSet.add(j-1)
            if less(A[j], A[j - 1]):
                exch(A, j, j - 1)
                min_idx = j - 1
            else:
                break
        rerender(A, min_idx, traceSet, "Insertion")

def shell_sort(A):
    N = len(A)
    h = 1
    while h < N // 3:
        h = h * 3 + 1
    while h >= 1:
        for i in range(h, N):
            traceSet = set()
            min_idx = -1
            for j in range(i, h-1, -h):
                traceSet.add(j)
                traceSet.add(j-h)
                if less(A[j], A[j - h]):
                    exch(A, j, j - h)
                    min_idx = j - h
                else:
                    break
            rerender(A, min_idx, traceSet, "Shell", h)
        h //= 3

def main():
    if len(sys.argv) < 3:
        print("Usage: python Animation.py <algorithm> <array size> <speed>")
        sys.exit(1)

    algorithm = sys.argv[1]
    n = int(sys.argv[2])
    A = generate_random_array(n)
    speed = sys.argv[3].lower() if len(sys.argv) > 3 else 'normal'

    global speed_delay
    if speed == 'slow':
        speed_delay = 1.0
    elif speed == 'normal':
        speed_delay = 0.5
    elif speed == 'fast':
        speed_delay = 0.01
    else:
        print("Unknown speed: ", speed)
        sys.exit(1)

    plt.ion()
    fig = plt.figure(figsize=(15, 3))
    fig.patch.set_facecolor(ligth_coffee_color)

    if algorithm.lower() == "selection":
        selection_sort(A)
    elif algorithm.lower() == "insertion":
        insertion_sort(A)
    elif algorithm.lower() == "shell":
        shell_sort(A)
    else:
        print("Unknown algorithm:", algorithm)
        sys.exit(1)

    rerender(A, -1, algorithm=algorithm)
    plt.ioff()
    plt.show()

if __name__ == "__main__":
    main()
