import React from 'react'
import Summary from './index'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Summary', () => {
  test('Should render summary text', () => {
    const { getByText } = render(
      <Summary>
        U.S. stocks climbed on Monday as gains in technology stocks powered the Nasdaq Composite higher, recovering some
        ground it lost last week.
      </Summary>
    )
    expect(
      getByText(
        'U.S. stocks climbed on Monday as gains in technology stocks powered the Nasdaq Composite higher, recovering some ground it lost last week.'
      )
    ).toBeInTheDocument()
  })
})
