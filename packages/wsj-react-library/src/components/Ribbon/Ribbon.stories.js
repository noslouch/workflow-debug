import React from 'react'
import Ribbon from '.'
import RibbonData from './__mocks__/ribbon.js'

const { slug, tabs, titleUrl, sectionSubHed, sectionTitle } = RibbonData

export default {
  title: 'Ribbon',
  component: Ribbon,
  parameters: {
    componentSubtitle: 'The ribbon component is found on some pages at the top, just underneath the header.',
  },
}

const Template = (args) => <Ribbon {...args} />

export const Regular = Template.bind({})
Regular.args = {
  isOpinion: false,
  border: ['bottom'],
  showRibbon: true,
  sectionSubHed,
  sectionTitle,
  slug,
  tabs,
  titleUrl,
}

export const Opinion = Template.bind({})
Opinion.args = {
  isOpinion: true,
  border: ['bottom'],
  showRibbon: true,
  sectionSubHed: 'Resources',
  sectionTitle: 'Coronavirus',
  slug,
  tabs,
  titleUrl,
}
