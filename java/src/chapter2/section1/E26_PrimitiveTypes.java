package chapter2.section1;

import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.Stopwatch;

// For 100000 random numbers
//    Insertion is 7.2 times slower than InsertionPrimitive

public class E26_PrimitiveTypes {

  public static class InsertionPrimitive {
    public static void sort(int[] a) {
      int N = a.length;
      for (int i = 1; i < N; i++) {
        for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
          exch(a, j, j - 1);
        }
      }
    }

    private static boolean less(int v, int w) {
      return v < w;
    }

    private static void exch(int[] a, int i, int j) {
      int t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }

  public static class Insertion {
    public static <T extends Comparable<T>> void sort(T[] a) {
      int N = a.length;
      for (int i = 1; i < N; i++) {
        for (int j = i; j > 0 && less(a[j], a[j - 1]); j--) {
          exch(a, j, j - 1);
        }
      }
    }

    private static <T extends Comparable<T>> boolean less(T v, T w) {
      return v.compareTo(w) < 0;
    }

    private static <T extends Comparable<T>> void exch(T[] a, int i, int j) {
      T t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
  }

  public static double time(String alg, Integer[] a) throws IllegalArgumentException {
    Stopwatch timer;
    switch (alg) {
      case "Insertion":
        timer = new Stopwatch();
        Insertion.sort(a);
        return timer.elapsedTime();
      case "InsertionPrimitive":
        int N = a.length;
        int[] b = new int[N];
        for (int i = 0; i < N; i++) {
          b[i] = a[i];
        }
        timer = new Stopwatch();
        InsertionPrimitive.sort(b);
        return timer.elapsedTime();
      default:
        throw new IllegalArgumentException("Unknown algorithm: " + alg);
    }
  }

  public static double timeRandomInput(String alg, int N, int T) {
    double total = 0.0;
    Integer[] a = new Integer[N];
    for (int t = 0; t < T; t++) {
      for (int i = 0; i < N; i++) {
        a[i] = StdRandom.uniformInt(N);
      }
      try {
        total += time(alg, a);
      } catch (IllegalArgumentException e) {
        StdOut.println(e.getMessage());
        return 0;
      }
    }
    return total;
  }

  public static void main(String[] args) {
    if (args.length != 4) {
      StdOut.println("Usage: java SortCompare <alg1> <alg2> <array size> <number of trials>");
      return;
    }

    String alg1 = args[0];
    String alg2 = args[1];
    int N = Integer.parseInt(args[2]);
    int T = Integer.parseInt(args[3]);
    double t1 = timeRandomInput(alg1, N, T);
    double t2 = timeRandomInput(alg2, N, T);

    if (t1 < 1e-6 || t2 < 1e-6) {
      StdOut.printf("The elapsed time for one or both algorithms is too small to make a reliable comparison.\n");
    } else {
      double ratio = t2 / t1;
      if (ratio > 1) {
        StdOut.printf("For %d random numbers\n   %s is %.1f times faster than %s\n", N, alg1, ratio, alg2);
      } else {
        StdOut.printf("For %d random numbers\n   %s is %.1f times slower than %s\n", N, alg1, 1 / ratio, alg2);
      }
    }
  }
}
