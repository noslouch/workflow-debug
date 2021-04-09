import React from 'react'
import ArticleCommenting from '.'

export default {
  title: 'ArticleCommenting',
  component: ArticleCommenting,
  parameters: {
    componentSubtitle: 'The ArticleCommenting component sets the Coral Talk script and platform',
  },
}

export const ArticleCommentingDefault = () => (
  <ArticleCommenting commentCount={50} id={'SB00000000000000000000000'} canComment={false} />
)

export const ZeroComments = () => (
  <ArticleCommenting commentCount={0} id={'SB00000000000000000000001'} canComment={false} />
)

export const ErrorMessage = () => (
  <ArticleCommenting commentCount={0} id={'SB00000000000000000000002'} canComment={true} />
)

ErrorMessage.parameters = {
  docs: {
    storyDescription:
      'The canComment prop indicates whether or not a user is logged in via entitlements. If true, the getCoralToken API call passes cookies in order to generate a token. This is intentionally set to true in order to cause an error client side.',
  },
}
