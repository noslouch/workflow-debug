import ShareButton from '../ShareButton';
import { UserProvider } from '../../../context/user-context';

const shareMock = {
  articleURL:
    'https://www.wsj.com/articles/former-braskem-ceo-pleads-guilty-to-operation-car-wash-charges-in-u-s-11618511611',
  author: 'Dylan Tokar',
  headline:
    'Former Braskem CEO Pleads Guilty to ‘Operation Car Wash’ Charges in U.S.',
  id: 'SB10519382422305624297404587404592362311740',
  source: 'NEWSPLUS,PRO,WSJ-PRO-WSJ.com',
  summary:
    'José Carlos Grubisich pleaded guilty to two counts of conspiring to violate U.S. antibribery law, which carry a possible sentence of 10 years',
  template: 'full',
  thumbnailURL: 'https://images.wsj.net/im-325652/D',
};

const user = {
  firstName: 'John',
  lastName: 'Boyd',
  email: 'johndoe@wsj.com',
  status: 'user_logged_in',
};

export default {
  title: 'Article/Tools/ShareButton',
  component: ShareButton,
  decorators: [
    (Story) => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
};

const Template = (args) => <ShareButton {...args} />;

export const Regular = Template.bind({});
Regular.args = { ...shareMock };

export const WithUser = Template.bind({});
WithUser.args = { ...shareMock };

WithUser.decorators = [
  (Story) => (
    <UserProvider user={user}>
      <Story />
    </UserProvider>
  ),
];
