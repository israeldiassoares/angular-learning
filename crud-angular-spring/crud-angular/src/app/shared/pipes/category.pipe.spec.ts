import { pipe } from 'rxjs'
import { CategoryPipe } from './category.pipe'

describe('CategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new CategoryPipe()
    expect(pipe).toBeTruthy()
  })
})

describe('Show Code icon', () => {
  const pipe = new CategoryPipe()

  it('Show front-end icon Category', () => {
    expect(pipe.transform('front-end')).toBe('code')
  })

  it("Show back-end icon category", () => {
    expect(pipe.transform('back-end')).toBe('laptop_mac')
  })
})
