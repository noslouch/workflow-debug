import { addons } from '@storybook/addons'
import { getDsmOptions } from '@invisionapp/dsm-storybook'

addons.setConfig({
  ...getDsmOptions(process.env.STORYBOOK_DSM),
})
