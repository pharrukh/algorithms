package chapter2.section1;

import edu.princeton.cs.algs4.Insertion;
import edu.princeton.cs.algs4.Selection;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.Stopwatch;

public class E28_EqualKeys {

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
            default:
                throw new IllegalArgumentException("Unknown algorithm: " + alg);
        }
    }

    public static double timeRandomInput(String alg, int N, int T) {
        double total = 0.0;
        Integer[] a = new Integer[N];
        for (int t = 0; t < T; t++) {
            for (int i = 0; i < N; i++) {
                a[i] = StdRandom.uniformInt(2);
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
        String[] algorithms = { "Insertion", "Selection" };
        int[] sizes = { 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768 };

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
