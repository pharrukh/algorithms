import itertools
import argparse
from tqdm import tqdm

def shell_sort(A):
    def less(a, b):
        nonlocal comparisons
        comparisons += 1
        return a < b

    def exch(A, i, j):
        nonlocal swaps
        swaps += 1
        A[i], A[j] = A[j], A[i]

    N = len(A)
    h = 1
    comparisons = 0
    swaps = 0

    while h < N // 3:
        h = h * 3 + 1

    while h >= 1:
        for i in range(h, N):
            for j in range(i, h-1, -h):
                if less(A[j], A[j - h]):
                    exch(A, j, j - h)
                else:
                    break
        h //= 3
    return comparisons, swaps

def main(array_length):
    # Define the array
    array = list(range(1, array_length + 1))

    # Generate all permutations
    permutations = list(itertools.permutations(array))

    # Print the number of permutations
    print(f"Total permutations: {len(permutations)}")

    # Initialize max comparisons tracker
    max_comparisons = 0
    max_comparisons_perms = []

    # Iterate over all permutations with progress tracking
    for perm in tqdm(permutations, desc="Processing permutations"):
        perm_list = list(perm)
        comparisons, _ = shell_sort(perm_list)
        
        # Update max comparisons and corresponding permutations if needed
        if comparisons > max_comparisons:
            max_comparisons = comparisons
            max_comparisons_perms = [perm]
        elif comparisons == max_comparisons:
            max_comparisons_perms.append(perm)

    # Print the permutations with the maximum number of comparisons
    print("\nPermutations with the maximum number of comparisons:")
    print(f"Comparisons: {max_comparisons}")
    print(f"Number of permutations: {len(max_comparisons_perms)}")
    for perm in max_comparisons_perms:
        print(perm)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Shell Sort Permutations Analysis")
    parser.add_argument("array_length", type=int, help="Length of the array to generate permutations for")

    args = parser.parse_args()
    main(args.array_length)
