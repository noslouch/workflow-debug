import Hat from './index';
import mockHatData from '../../../__mocks__/hat.json';

export default {
  title: 'Hat',
  component: Hat,
};

const Template = (args) => <Hat {...args} />;
export const Default = Template.bind({});

Default.args = {
  hatData: mockHatData,
  showAboutWsj: true,
};
