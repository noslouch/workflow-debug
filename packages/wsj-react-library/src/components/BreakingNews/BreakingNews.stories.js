import BreakingNews from '.';

export default {
  title: 'BreakingNews',
  component: BreakingNews,
};

const Template = (args) => <BreakingNews {...args} />;
export const WithURL = Template.bind({});

WithURL.args = {
  headline: 'This has a link!',
  url: 'https://s.dev.wsj.com',
};

export const WithoutURL = Template.bind({});
WithoutURL.args = {
  headline: 'This does not have a link!',
};
