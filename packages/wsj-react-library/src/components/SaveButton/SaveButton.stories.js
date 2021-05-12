import React from 'react';
import SaveButton from './index';

export default {
  title: 'Save Button',
  component: SaveButton,
};

const Template = (args) => (
  <>
    <SaveButton {...args} />
    <details style={{ marginTop: 20 }}>
      <summary style={{ marginBottom: 8 }}>Experiencing issues?</summary>
      Sometimes an SBID goes bad. Please add a different SBID in the controls
      tab if so.
    </details>
  </>
);

export const DefaultSaveButton = Template.bind({});
DefaultSaveButton.args = {
  sbid: 'SB12140738439335043595204587449112906534498',
  baseURL: 'https://www.s.dev.wsj.com/articles/svc/personalization',
};
