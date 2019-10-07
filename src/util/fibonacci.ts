export const isFibonacci = async (num: number) => {
  const fibonacciNumbers = await getFibonacciNumbers()
  return fibonacciNumbers.includes(num)
}

let cached = [] as number[]
const getFibonacciNumbers = async (count = 1000) => {
  if (cached.length) {
    return cached
  }
  const result = [] as number[]
  let next = 1
  let current = 0
  let temp: number

  while (count > 0) {
    result.push(current)

    temp = next
    next = next + current
    current = temp

    count--
  }
  return (cached = result)
}
