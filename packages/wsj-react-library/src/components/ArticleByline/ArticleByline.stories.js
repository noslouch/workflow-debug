import ArticleByline from './index';

export default {
  title: 'Article Byline',
  component: ArticleByline,
};

const singleMock = [
  {
    text: 'By ',
  },
  {
    type: 'phrase',
    phrase_type: 'author',
    id: '123',
    text: 'John Doe',
  },
];

const multipleMock = [
  {
    text: 'By ',
  },
  {
    type: 'phrase',
    phrase_type: 'author',
    id: '123',
    text: 'John Doe',
  },
  {
    text: ', ',
  },
  {
    type: 'phrase',
    phrase_type: 'author',
    id: '456',
    text: 'Jane Doe',
  },
  {
    text: ' and ',
  },
  {
    type: 'phrase',
    phrase_type: 'author',
    id: '789',
    text: 'Juan Doe',
  },
];

const mixedMock = [
  {
    text: 'By ',
  },
  {
    type: 'phrase',
    phrase_type: 'author',
    id: '123',
    text: 'John Doe',
  },
  {
    text: ' and ',
  },
  {
    text: 'Jane Doe',
  },
];

const plainTextMock = [
  {
    text: 'By John Doe',
  },
];

const opinionMock = [
  {
    text: 'By ',
  },
  {
    type: 'phrase',
    phrase_type: 'author',
    id: '123',
    text: 'John Doe',
    hedcut: 'https://i.pravatar.cc/100',
  },
];

export const Single = () => <ArticleByline data={singleMock} />;

export const Multiple = () => <ArticleByline data={multipleMock} />;

export const Mixed = () => <ArticleByline data={mixedMock} />;

export const PlainText = () => <ArticleByline data={plainTextMock} />;

export const Opinion = () => <ArticleByline data={opinionMock} isOpinion />;

export const OpinionNoHedcut = () => <ArticleByline data={singleMock} isOpinion />;
