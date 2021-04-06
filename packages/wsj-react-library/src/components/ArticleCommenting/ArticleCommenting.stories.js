import React from 'react'
import ArticleCommenting from '.'

export default {
  title: 'ArticleCommenting',
  component: ArticleCommenting,
}

export const ArticleCommentingDefault = () => (
  <ArticleCommenting
    commentCount={50}
    coralCommentsEnabled={true}
    isProd={false}
    articleId={'SB00000000000000000000000'}
    isCoralLoaded={false}
  />
)

export const ZeroComments = () => (
  <ArticleCommenting
    commentCount={0}
    coralCommentsEnabled={true}
    isProd={false}
    articleId={'SB00000000000000000000000'}
    isCoralLoaded={false}
  />
)

export const CommentSectionDisabled = () => (
  <ArticleCommenting
    coralCommentsEnabled={false}
    articleId={'SB00000000000000000000000'}
    isCoralLoaded={false}
    isProd={false}
  />
)
