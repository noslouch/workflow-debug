import AtmosphericPlayer from './index';

export default {
  title: 'AtmosphericPlayer',
  component: AtmosphericPlayer,
};

const Template = (args) => <AtmosphericPlayer {...args} />;

export const Default = Template.bind({});
Default.args = {
  guid: 'C677848D-4AD2-47E1-9598-BE63CF10162C',
};
