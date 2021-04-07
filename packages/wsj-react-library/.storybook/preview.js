import React from 'react'

import { withDsm } from '@invisionapp/dsm-storybook'
// TODO: can we theme this?
import { default as GlobalWSJStyles } from '../src/components/GlobalStyles'

export const decorators = [
  withDsm,
  (story) => (
    <>
      <GlobalWSJStyles />
      {story()}
    </>
  ),
]
