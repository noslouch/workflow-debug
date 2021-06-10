import Tagline from './Tagline';

const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export default {
  title: 'Article/Body/Components/Tagline',
  component: Tagline,
};

const Template = (args) => <Tagline {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: mockText,
};
