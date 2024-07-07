package chapter2.section1;

import java.util.HashSet;
import java.util.Set;

import edu.princeton.cs.algs4.Draw;
import utils.Utils;

public class E18_Tracing {
  private static int comparisons = 0;
  private static int swaps = 0;

  public static void main(String[] args) {
    if (args.length < 2) {
      System.err.println("Usage: java Tracing <algorithm> <array size>");
      System.exit(1);
    }

    String algorithm = args[0];
    int n = Integer.parseInt(args[1]);

    Double[] A = Utils.generateRandomDoubleArray(n);

    // Create a Draw object
    Draw draw = new Draw();

    // Set canvas size
    draw.setCanvasSize(1500, 300);

    // Set scale with padding
    draw.setXscale(-2, A.length + 2); // Adjust x-scale for left and right padding
    draw.setYscale(-0.05, 1.15); // Adjust y-scale for less bottom padding

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

    rerender(draw, A, -1, -1, new HashSet<Integer>(), algorithm, 0);
  }

  private static <T extends Comparable<T>> void rerender(Draw draw, T[] A, int iteration, int destination,
      Set<Integer> traceSet, String algorithm, int h) {
    // Clear the canvas
    draw.clear(new java.awt.Color(239, 224, 185)); // Light coffee color background

    // Draw the algorithm name, current iteration, number of comparisons, and swaps
    draw.setPenColor(Draw.BLACK);
    String title = algorithm + "Sort";
    if (iteration >= 0) {
      title += " | i: " + iteration;
    }
    title += " | Comp.: " + comparisons + " | Swaps: " + swaps;
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

      if (i == destination) {
        draw.setPenColor(231, 76, 60); // Red modern
      } else if (traceSet.contains(i)) {
        draw.setPenColor(44, 62, 80); // Black modern
      } else {
        draw.setPenColor(149, 165, 166); // Gray modern
      }

      draw.filledRectangle(x, y, halfWidth, halfHeight);
    }
    draw.enableDoubleBuffering();
    draw.show();
    // Add a slight delay to visualize the sorting process
    try {
      Thread.sleep(250); // 200 milliseconds delay
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
      Set<Integer> traceSet = new HashSet();
      int min = i;
      for (int j = i + 1; j < N; j++) {
        if (less(A[j], A[min])) {
          min = j;
        }
        traceSet.add(j);
      }
      exch(A, i, min);
      rerender(draw, A, i, i, traceSet, "Selection", 0); // Highlight swapped bars
    }
  }

  public static <T extends Comparable<T>> void insertionSort(Draw draw, T[] A) {
    int N = A.length;
    for (int i = 1; i < N; i++) {
      Set<Integer> traceSet = new HashSet();
      int min = -1;
      for (int j = i; j > 0 && less(A[j], A[j - 1]); j--) {
        exch(A, j, j - 1);
        min = j - 1;
        traceSet.add(j);
        traceSet.add(j - 1);
      }
      rerender(draw, A, i, min, traceSet, "Insertion", 0); // Highlight swapped bars
    }
  }

  public static <T extends Comparable<T>> void shellSort(Draw draw, T[] A) {
    int N = A.length;
    int h = 1;
    while (h < N / 3)
      h = h * 3 + 1;

    while (h >= 1) {
      for (int i = h; i < N; i++) {
        Set<Integer> traceSet = new HashSet();
        int min = -1;
        for (int j = i; j >= h && less(A[j], A[j - h]); j -= h) {
          exch(A, j, j - h);
          min = j - h;
          traceSet.add(j);
          traceSet.add(j - h);
        }
        rerender(draw, A, i, min, traceSet, "Shell", h); // Highlight swapped bars
      }
      h /= 3;
    }
  }
}
