import Paragraph from './Paragraph';

const mockText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tortor metus, faucibus nec viverra nec, tempor consectetur sem. Integer nibh turpis, accumsan ut dolor feugiat, ultrices viverra enim. Vestibulum sodales est elit, eget porttitor quam lacinia at. Quisque aliquam sodales lacus, eu volutpat nisi mattis in. Suspendisse semper nisi ut ex vestibulum, at finibus eros tincidunt. Duis nec ligula tincidunt, vestibulum sapien eget, elementum mi. Mauris vel facilisis diam.';

export default {
  title: 'Article/Body/Components/Paragraph',
  component: Paragraph,
};

const Template = (args) => <Paragraph {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: mockText,
};

export const WithDropCap = Template.bind({});

WithDropCap.args = {
  children: mockText,
  hasDropCap: true,
};
