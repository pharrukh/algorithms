package utils;

import java.util.Random;

public class Utils {
  public static Double[] generateRandomDoubleArray(int n) {
    Double[] array = new Double[n];
    Random random = new Random();
    for (int i = 0; i < n; i++) {
      array[i] = random.nextDouble();
    }
    return array;
  }
}
