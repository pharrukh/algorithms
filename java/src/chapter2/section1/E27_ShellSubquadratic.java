package chapter2.section1;

import edu.princeton.cs.algs4.Selection;
import edu.princeton.cs.algs4.Shell;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.Stopwatch;

public class E27_ShellSubquadratic {

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
            case "Selection":
                timer = new Stopwatch();
                Selection.sort(a);
                return timer.elapsedTime();
            case "Shell":
                timer = new Stopwatch();
                Shell.sort(a);
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
        String[] algorithms = { "Insertion", "Selection", "Shell" };
        int[] sizes = { 128, 256, 512, 1024, 2048, 4096, 8192, 16384 };

        for (int N : sizes) {
            int T = 10; // Number of trials
            StdOut.printf("Array size: %d\n", N);
            for (int i = 0; i < algorithms.length; i++) {
                for (int j = i + 1; j < algorithms.length; j++) {
                    double t1 = timeRandomInput(algorithms[i], N, T);
                    double t2 = timeRandomInput(algorithms[j], N, T);

                    if (t1 < 1e-6 || t2 < 1e-6) {
                        StdOut.printf(
                                "The elapsed time for one or both algorithms is too small to make a reliable comparison.\n");
                    } else {
                        double ratio = t2 / t1;
                        if (ratio > 1) {
                            StdOut.printf("   %s is %.1f times faster than %s\n", algorithms[i], ratio, algorithms[j]);
                        } else {
                            StdOut.printf("   %s is %.1f times slower than %s\n", algorithms[i], 1 / ratio,
                                    algorithms[j]);
                        }
                    }
                }
            }
            StdOut.println();
        }
    }
}

/*
Array size: 128
   Insertion is 1.0 times slower than Selection
   Insertion is 2.0 times slower than Shell
The elapsed time for one or both algorithms is too small to make a reliable comparison.

Array size: 256
   Insertion is 1.0 times slower than Selection
   Insertion is 3.0 times slower than Shell
   Selection is 2.0 times slower than Shell

Array size: 512
   Insertion is 1.3 times faster than Selection
The elapsed time for one or both algorithms is too small to make a reliable comparison.
   Selection is 12.0 times slower than Shell

Array size: 1024
   Insertion is 1.3 times slower than Selection
   Insertion is 4.7 times slower than Shell
   Selection is 21.0 times slower than Shell

Array size: 2048
   Insertion is 3.0 times faster than Selection
   Insertion is 11.0 times slower than Shell
   Selection is 34.5 times slower than Shell

Array size: 4096
   Insertion is 2.7 times faster than Selection
   Insertion is 23.0 times slower than Shell
   Selection is 46.0 times slower than Shell

Array size: 8192
   Insertion is 2.4 times faster than Selection
   Insertion is 33.7 times slower than Shell
   Selection is 107.2 times slower than Shell

Array size: 16384
   Insertion is 1.8 times faster than Selection
   Insertion is 69.1 times slower than Shell
   Selection is 139.7 times slower than Shell
*/
