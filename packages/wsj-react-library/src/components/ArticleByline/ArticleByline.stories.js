import ArticleByline from './index';

export default {
  title: 'Article/Byline',
  component: ArticleByline,
};

const mockAuthor1 = {
  type: 'phrase',
  phrase_type: 'author',
  id: '123',
  text: 'John Doe',
  twitterHandle: 'john-doe',
  facebookAccount: 'JohnDoe',
  emailAddress: 'johndoe@example.com',
};

const mockAuthor2 = {
  type: 'phrase',
  phrase_type: 'author',
  id: '456',
  text: 'Jane Doe',
  twitterHandle: 'jane-doe',
  facebookAccount: 'JaneDoe',
  emailAddress: 'janedoe@example.com',
};

const mockAuthor3 = {
  type: 'phrase',
  phrase_type: 'author',
  id: '789',
  text: 'Juan Doe',
  twitterHandle: 'juan-doe',
  facebookAccount: 'JuanDoe',
  emailAddress: 'juandoe@example.com',
};

const singleMock = [
  {
    text: 'By ',
  },
  {
    ...mockAuthor1,
  },
];

const multipleMock = [
  {
    text: 'By ',
  },
  {
    ...mockAuthor1,
  },
  {
    text: ', ',
  },
  {
    ...mockAuthor2,
  },
  {
    text: ' and ',
  },
  {
    ...mockAuthor3,
  },
];

const mixedMock = [
  {
    text: 'By ',
  },
  {
    ...mockAuthor1,
  },
  {
    text: ' and Jane Doe',
  },
];

const plainTextMock = [
  {
    text: 'By John Doe',
  },
];

const hedcutMock = [
  {
    text: 'By ',
  },
  {
    ...mockAuthor1,
    hedcutImage: 'https://i.pravatar.cc/100',
  },
];

const Template = (args) => <ArticleByline {...args} />;

export const Single = Template.bind({});

Single.args = {
  data: singleMock,
};

export const WithHedcut = Template.bind({});

WithHedcut.args = {
  data: hedcutMock,
  shouldShowHedcut: true,
};

export const Multiple = Template.bind({});

Multiple.args = {
  data: multipleMock,
};

export const Mixed = Template.bind({});

Mixed.args = {
  data: mixedMock,
};

export const PlainText = Template.bind({});

PlainText.args = {
  data: plainTextMock,
};

export const Opinion = Template.bind({});

Opinion.args = {
  data: hedcutMock,
  isOpinion: true,
  shouldShowHedcut: true,
};

export const OpinionNoHedcut = Template.bind({});

OpinionNoHedcut.args = {
  data: singleMock,
  isOpinion: true,
};
