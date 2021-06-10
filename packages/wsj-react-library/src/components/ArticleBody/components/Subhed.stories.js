import Subhed from './Subhed';

const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export default {
  title: 'Article/Body/Components/Subhed',
  component: Subhed,
};

const Template = (args) => <Subhed {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: mockText,
};
