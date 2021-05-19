import TableOfContents from './index';

export default {
  title: 'Table Of Contents',
  component: TableOfContents,
};

const Template = (args) => <TableOfContents {...args} />;

const contents = Array(10)
  .fill()
  .map((_, index) => ({
    id: `section-${index + 1}`,
    text: `Section ${index + 1}`,
  }));

export const Default = Template.bind({});
Default.args = {
  contents,
};

export const ForceExpand = Template.bind({});
ForceExpand.args = {
  contents,
  forceExpand: true,
};
