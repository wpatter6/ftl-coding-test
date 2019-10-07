export const isFibonacci = (num: number) => {
  return fibonacciNumbers.includes(num)
}

const fibonacciNumbers = [] as number[]

const fibonacciSize = 1000

// Set timeout to prevent blocking rendering thread
setTimeout(() => {
  let size = fibonacciSize
  let next = 1
  let current = 0
  let temp: number

  while (size > 0) {
    fibonacciNumbers.push(current)

    temp = next
    next = next + current
    current = temp

    size--
  }
}, 1)
