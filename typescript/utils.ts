export const updateProgressBar = (iteration: number, total: number, message: string = "") => {
  const barLength = 40 // Length of the progress bar
  const progress = (iteration / total) * barLength
  const bar = "█".repeat(progress) + "-".repeat(barLength - progress)
  const percentage = ((iteration / total) * 100).toFixed(2)
  process.stdout.write(`\r[${bar}] ${percentage}% ${message} `)
}
