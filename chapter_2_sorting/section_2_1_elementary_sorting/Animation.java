package chapter_2_sorting.section_2_1_elementary_sorting;

import java.util.Random;
import edu.princeton.cs.algs4.Draw;

public class Animation {
  private static int comparisons = 0;
  private static int swaps = 0;
  private static boolean includeComparison = false;

  public static void main(String[] args) {
    if (args.length < 3) {
      System.err.println("Usage: java Animation <algorithm> <array size> <include comparison>");
      System.exit(1);
    }

    String algorithm = args[0];
    int n = Integer.parseInt(args[1]);
    includeComparison = args[2].equals("includeComparison");

    Double[] A = generateRandomArray(n);

    // Create a Draw object
    Draw draw = new Draw();

    // Set canvas size
    draw.setCanvasSize(800, 600);

    // Set scale with padding
    draw.setXscale(-2, A.length + 2); // Adjust x-scale for left and right padding
    draw.setYscale(-0.05, 1.10); // Adjust y-scale for less bottom padding

    // Set pen radius for bars
    draw.setPenRadius(0.005);

    if (algorithm.equalsIgnoreCase("Selection")) {
      selectionSort(draw, A);
    } else if (algorithm.equalsIgnoreCase("Insertion")) {
      insertionSort(draw, A);
    } else if (algorithm.equalsIgnoreCase("Shell")) {
      shellSort(draw, A);
    } else {
      System.err.println("Unknown algorithm: " + algorithm);
      System.exit(1);
    }
  }

  private static Double[] generateRandomArray(int n) {
    Double[] array = new Double[n];
    Random random = new Random();
    for (int i = 0; i < n; i++) {
      array[i] = random.nextDouble();
    }
    return array;
  }

  private static <T extends Comparable<T>> void rerender(Draw draw, T[] A, int swapIndex1, int swapIndex2,
      int iteration, int currentIndex, int comparisonIndex, String algorithm, int h) {
    // Clear the canvas
    draw.clear(new java.awt.Color(239, 224, 185)); // Light coffee color background

    // Draw the algorithm name, current iteration, number of comparisons, and swaps
    draw.setPenColor(Draw.BLACK);
    String title = algorithm + "Sort | i: " + iteration + " | Comp.: " + comparisons + " | Swaps: " + swaps;
    if (algorithm == "Shell")
      title += " | h: " + h;
    draw.text(A.length / 2.0, 1.05, title);

    // Draw the background grid lines
    draw.setPenColor(new java.awt.Color(211, 211, 211)); // Light grey for grid lines
    draw.setPenRadius(0.001);
    for (double i = 0; i <= 1.0; i += 0.1) {
      draw.line(-2, i, A.length + 2, i); // Horizontal grid lines with padding
    }
    for (int i = 0; i <= A.length; i++) {
      draw.line(i, 0, i, 1.0); // Vertical grid lines
    }

    // Draw the axes and scale lines
    draw.setPenColor(Draw.BLACK);
    draw.setPenRadius(0.002);

    // Draw bars
    for (int i = 0; i < A.length; i++) {
      double x = i + 0.5;
      double y = ((Double) A[i]) / 2.0;
      double halfWidth = 0.4;
      double halfHeight = ((Double) A[i]) / 2.0;

      if (i == currentIndex || i == comparisonIndex) {
        draw.setPenColor(255, 255, 0); // Yellow for the current iteration bars
      } else if (i == swapIndex1 || i == swapIndex2) {
        draw.setPenColor(255, 69, 0); // Economist Red for the swapped bars
      } else {
        draw.setPenColor(34, 139, 34); // Economist Green for the rest
      }

      draw.filledRectangle(x, y, halfWidth, halfHeight);
    }
    draw.enableDoubleBuffering();
    draw.show();
    // Add a slight delay to visualize the sorting process
    try {
      Thread.sleep(200); // 200 milliseconds delay
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  private static <T extends Comparable<T>> boolean less(T v, T w) {
    comparisons++;
    boolean result = v.compareTo(w) < 0;
    return result;
  }

  private static <T extends Comparable<T>> void exch(T[] A, int i, int j) {
    swaps++;
    T temp = A[i];
    A[i] = A[j];
    A[j] = temp;
  }

  public static <T extends Comparable<T>> void selectionSort(Draw draw, T[] A) {
    int N = A.length;
    for (int i = 0; i < N - 1; i++) {
      int min = i;
      for (int j = i + 1; j < N; j++) {
        if (includeComparison)
          rerender(draw, A, -1, -1, i + 1, i, j, "Selection", 0); // Highlight current iteration bars
        if (less(A[j], A[min]))
          min = j;
      }
      if (i != min) {
        exch(A, i, min);
        rerender(draw, A, i, min, i + 1, -1, -1, "Selection",0); // Highlight swapped bars
      }
    }
    // Final render after the sort is complete
    rerender(draw, A, -1, -1, N, -1, -1, "Selection",0);
  }

  public static <T extends Comparable<T>> void insertionSort(Draw draw, T[] A) {
    int N = A.length;
    for (int i = 1; i < N; i++) {
      for (int j = i; j > 0 && less(A[j], A[j - 1]); j--) {
        exch(A, j, j - 1);
        rerender(draw, A, j, j - 1, i + 1, -1, -1, "Insertion",0); // Highlight swapped bars
        // }
      }
    }
    // Final render after the sort is complete
    rerender(draw, A, -1, -1, N, -1, -1, "Insertion",0);
  }

  public static <T extends Comparable<T>> void shellSort(Draw draw, T[] A) {
    int N = A.length;
    int h = 1;
    while (h < N / 3)
      h = h * 3 + 1;
    while (h >= 1) {
      for (int i = h; i < N; i++) {
        for (int j = i; j >= h && less(A[j], A[j - h]); j -= h) {
          exch(A, j, j - h);
          rerender(draw, A, j, j - h, i + 1, -1, -1, "Shell",h); // Highlight swapped bars
          // }
        }
      }
      h /= 3;
    }
    // Final render after the sort is complete
    rerender(draw, A, -1, -1, N, -1, -1, "Shell",1);
  }
}
