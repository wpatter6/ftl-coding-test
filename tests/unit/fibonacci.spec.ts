import { isFibonacci, getFibonacciNumbers } from '@/util/fibonacci'

describe('fibonaci.ts', () => {
  it('loads the correct number of fibonacci numbers', async () => {
    const val = 111

    const fib = await getFibonacciNumbers(val)

    expect(fib.length).toEqual(val)
  })

  it('returns true for valid fibonacci numbers', async () => {
    const vals = [5, 8, 13, 701408733, 354224848179262000000]

    for (const val of vals) {
      expect(await isFibonacci(val)).toBe(true)
    }
  })

  it('returns false for invalid fibonacci numbers', async () => {
    const vals = [6, 9, 14, 3453, 234523]

    for (const val of vals) {
      expect(await isFibonacci(val)).toBe(false)
    }
  })
})
