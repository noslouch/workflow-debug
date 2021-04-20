import { render, screen } from '@testing-library/react';
import OpinionArticleTypeExplainer from '.';
import MockArticle from '../../../__mocks__/article.json';
import MockArticleType from '../../../__mocks__/articleType.json';
import MockAuthor from '../../../__mocks__/author.json';

describe('OpinionArticleTypeExplainer', () => {
  const MockArticleData = MockArticle.data;
  const defaultProps = {
    articleData: { ...MockArticleData },
    articleDataType: { ...MockArticleType },
    authorData: { ...MockAuthor },
  };

  const articleWithNoTypeDisplayName = {
    ...MockArticleData.attributes,
    type_display_name: null,
  };

  const propsWithNoTypeDisplayName = {
    ...defaultProps,
    articleData: {
      ...MockArticleData,
      attributes: articleWithNoTypeDisplayName,
    },
  };

  const label =
    MockArticleData.attributes.type_display_name || MockArticleData.type;
  const authorName = MockArticleData.attributes.authors[0].text;

  test('Component is rendered when all the props are passed', () => {
    render(<OpinionArticleTypeExplainer {...defaultProps} />);

    expect(screen.getByText('About this article')).toBeTruthy();
    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(authorName)).toBeTruthy();
  });

  test('Component passes right links to its children component', () => {
    render(<OpinionArticleTypeExplainer {...defaultProps} />);
    expect(screen.getByText(label).href).toContain(
      `/news/types/${defaultProps.articleDataType.seoName}`
    );
    expect(screen.getByText(authorName).href).toContain(
      `/news/author/${defaultProps.authorData.seoname}`
    );
  });

  test('Component passes right label to its children component', () => {
    render(<OpinionArticleTypeExplainer {...propsWithNoTypeDisplayName} />);

    expect(
      screen.getByText(propsWithNoTypeDisplayName.articleData.type)
    ).toBeTruthy();
  });

  test('Component is not rendered when description is null', () => {
    render(<OpinionArticleTypeExplainer />);
    expect(screen.firstChild).toBeFalsy();
  });
});
