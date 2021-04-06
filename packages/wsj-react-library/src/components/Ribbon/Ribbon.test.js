import React from 'react'
import { render } from '@testing-library/react'
import Ribbon from './index'
import ribbonMockData from './__mocks__/ribbon'

test('Ribbon is not rendered when showRibbon is set to false', () => {
  const { container } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={false} isOpinion={false} {...ribbonMockData}></Ribbon>
  )
  expect(container.firstChild).toBeNull()
})

test('Ribbon is not rendered when showRibbon prop is not provided', () => {
  const { container } = render(<Ribbon page="hp" border={['bottom']} isOpinion={false} {...ribbonMockData}></Ribbon>)
  expect(container.firstChild).toBeNull()
})

test('Ribbon renders when showRibbon is set to true', () => {
  const { container } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={false} {...ribbonMockData}></Ribbon>
  )
  expect(container.firstChild).not.toBeNull()
})

test('Ribbon is not renderd when no tabs are provided', () => {
  const { container } = render(
    <Ribbon page="hp" border={['bottom']} isOpinion={false} showRibbon={true} tabs={[]}></Ribbon>
  )
  expect(container.firstChild).toBeNull()
})

test('Ribbon renders the correct tabs', () => {
  const tabTitles = ribbonMockData.tabs.map((tab) => tab.title)
  const { getByText } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={false} {...ribbonMockData}></Ribbon>
  )

  tabTitles.forEach((title) => {
    expect(getByText(title)).toBeInTheDocument()
  })
})

test('Ribbon renders the correct title', () => {
  const { getByText } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={false} {...ribbonMockData}></Ribbon>
  )
  expect(getByText('Coronavirus')).toBeInTheDocument()
})

test('Ribbon renders the correct sub hed', () => {
  const { getByText } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={false} {...ribbonMockData}></Ribbon>
  )
  expect(getByText('Resources')).toBeInTheDocument()
})

test('Ribbon renders the correct background color', () => {
  const { container } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={false} {...ribbonMockData}></Ribbon>
  )
  expect(container.firstChild).toHaveStyle(`background-color: #f4f4f4`)
})

// OPINION STYLING TEST
test('Ribbon renders the correct title when isOpinion is true', () => {
  const { getByText } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={true} {...ribbonMockData}></Ribbon>
  )
  expect(getByText('Opinion')).toBeInTheDocument()
})

test('Ribbon renders the correct sub hed when isOpinion is true', () => {
  const { getByText } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={true} {...ribbonMockData}></Ribbon>
  )
  expect(getByText('Resources')).toBeInTheDocument()
})

test('Ribbon renders the correct background color when isOpinion is true', () => {
  const { container } = render(
    <Ribbon page="hp" border={['bottom']} showRibbon={true} isOpinion={true} {...ribbonMockData}></Ribbon>
  )
  expect(container.firstChild).toHaveStyle(`background-color: #f8f7f5`)
})
