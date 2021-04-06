import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Ribbon from './index'
import ribbonMockData from './__mocks__/ribbon'

const { tabs } = ribbonMockData

test('Ribbon is not renderd when no tabs are provided', () => {
  const { container } = render(<Ribbon />)
  expect(container.firstChild).toBeNull()
})

test('Ribbon renders the correct tabs', () => {
  const tabTitles = ribbonMockData.tabs.map((tab) => tab.title)
  const { getByText } = render(<Ribbon tabs={tabs}></Ribbon>)

  tabTitles.forEach((title) => {
    expect(getByText(title)).toBeInTheDocument()
  })
})

test('Ribbon renders the correct section title', () => {
  const { getByText } = render(<Ribbon sectionTitle="Coronavirus" tabs={tabs}></Ribbon>)
  expect(getByText('Coronavirus')).toBeInTheDocument()
})

test('Ribbon renders the correct sub hed', () => {
  const { getByText } = render(<Ribbon sectionSubHed="Resources" tabs={tabs}></Ribbon>)
  expect(getByText('Resources')).toBeInTheDocument()
})

test('Ribbon renders the correct background color when isOpinion is false', () => {
  const { container } = render(<Ribbon isOpinion={false} tabs={tabs}></Ribbon>)
  expect(container.firstChild).toHaveStyle(`background-color: #f4f4f4`)
})

test('Ribbon renders the correct background color when isOpinion is true', () => {
  const { container } = render(<Ribbon isOpinion={true} tabs={tabs}></Ribbon>)
  expect(container.firstChild).toHaveStyle(`background-color: #f8f7f5`)
})
