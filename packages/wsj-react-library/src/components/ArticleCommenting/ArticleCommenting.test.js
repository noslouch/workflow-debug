import ArticleCommenting from './index'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('ArticleCommenting Component', () => {
  test('should render when enableCoralComments is set to true', () => {
    const { container } = render(
      <ArticleCommenting id="SB00000000000000000" commentCount={50} coralCommentsEnabled={true} isCoralLoaded={true} />
    )
    expect(container.firstChild).not.toBeNull()
  })

  test('should not render when enableCoralComments is set to false', () => {
    const { container } = render(<ArticleCommenting coralCommentsEnabled={false} />)
    expect(container.firstChild).toBeNull()
  })

  test('should deliberately return a comment count of 0 when comment count is 0', () => {
    render(
      <ArticleCommenting id="SB00000000000000000" commentCount={0} coralCommentsEnabled={true} isCoralLoaded={true} />
    )
    expect(screen.queryByText('(0)')).toBeTruthy()
  })
})
