import React from 'react'

import { withDsm } from '@invisionapp/dsm-storybook'
// TODO: can we theme this?
import { GlobalStyles as GlobalWSJStyles } from './globals/wsj'
import { GlobalStyles as GlobalNotedStyles } from './globals/noted'

export const decorators = [
  withDsm,
  (story) => (
    <>
      <GlobalWSJStyles />
      <GlobalNotedStyles />
      {story()}
    </>
  ),
]
