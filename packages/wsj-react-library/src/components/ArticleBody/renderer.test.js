import React from 'react';
import { render, screen } from '@testing-library/react';
import { queryByTestId } from '@testing-library/dom';
import renderer from './renderer';

// eslint-disable-next-line react/prop-types
jest.mock('./components/Paragraph', () => ({ children }) => (
  <div data-testid="paragraph">{children}</div>
));
jest.mock('./components/Link', () => () => <div data-testid="link" />);
jest.mock('./components/List', () => ({
  OrderedList: () => <div data-testid="ordered-list" />,
  UnorderedList: () => <div data-testid="unordered-list" />,
}));
jest.mock('./components/ListItem', () => () => <div data-testid="list-item" />);
jest.mock('./components/Emphasis', () => ({
  Italic: () => <div data-testid="italic" />,
  Strong: () => <div data-testid="strong" />,
}));
jest.mock('./components/Subhed', () => () => <div data-testid="subhed" />);
jest.mock('./components/Tagline', () => () => <div data-testid="tagline" />);
jest.mock('./components/Image', () => () => <div data-testid="image" />);
jest.mock('./components/Video', () => () => <div data-testid="video" />);
jest.mock('./components/Audio', () => () => <div data-testid="audio" />);
jest.mock('./insets/Dynamic', () => () => <div data-testid="dynamic" />);
jest.mock('./insets/Pagebreak', () => () => <div data-testid="pagebreak" />);
jest.mock('./insets/RichText', () => () => <div data-testid="rich-text" />);
jest.mock('../TableOfContents', () => ({
  CapiTableOfContents: () => <div data-testid="table-of-contents" />,
}));
jest.mock('../Pullquote', () => ({
  CapiPullquote: () => <div data-testid="pullquote" />,
}));

describe('ArticleBody renderer', () => {
  test('should return empty array when no body data', () => {
    const ArticleBody = renderer();
    expect(Array.isArray(ArticleBody)).toBe(true);
    expect(ArticleBody).toHaveLength(0);
  });

  test('should return null for unknown types and malformed data', () => {
    const ArticleBody = renderer([{ type: 'foo' }, null]);
    expect(Array.isArray(ArticleBody)).toBe(true);
    expect(ArticleBody).toHaveLength(2);
    expect(ArticleBody[0]).toBe(null);
    expect(ArticleBody[1]).toBe(null);
  });

  test('should allow overriding known types with null', () => {
    const ArticleBody = renderer([{ type: 'paragraph', text: 'foo' }], {
      renderBlock: ({ type }) => {
        if (type === 'paragraph') return null;
        return undefined;
      },
    });
    expect(Array.isArray(ArticleBody)).toBe(true);
    expect(ArticleBody).toHaveLength(1);
    expect(ArticleBody[0]).toBe(null);
  });

  test('should allow overrides of matched types', () => {
    render(
      renderer([{ type: 'paragraph', text: 'foo' }], {
        renderBlock: ({ type }, index) => {
          if (type === 'paragraph')
            return <div data-testid="foo" key={index} />;
          return undefined;
        },
      })
    );
    expect(screen.getByTestId('foo')).toBeInTheDocument();
  });

  test('should not override if type mismatch', () => {
    const { container } = render(
      renderer([{ type: 'paragraph', text: 'foo' }], {
        renderBlock: ({ type }, index) => {
          if (type === 'foo') return <div data-testid="foo" key={index} />;
          return undefined;
        },
      })
    );
    expect(queryByTestId(container, 'foo')).not.toBeInTheDocument();
  });

  test('should return plain text if no known type but text available', () => {
    render(renderer([{ text: 'foo' }]));
    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  test('should return paragraph component if matching type', () => {
    render(renderer([{ type: 'paragraph' }]));
    expect(screen.getByTestId('paragraph')).toBeInTheDocument();
  });

  test('should return link component if matching type', () => {
    render(renderer([{ type: 'link' }]));
    expect(screen.getByTestId('link')).toBeInTheDocument();
  });

  test('should return ordered list component if matching type', () => {
    render(renderer([{ type: 'list', ordered: true }]));
    expect(screen.getByTestId('ordered-list')).toBeInTheDocument();
  });

  test('should return unordered list component if matching type', () => {
    render(renderer([{ type: 'list' }]));
    expect(screen.getByTestId('unordered-list')).toBeInTheDocument();
  });

  test('should return list item component if matching type', () => {
    render(renderer([{ type: 'listitem' }]));
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  test('should return italic emphasis component if matching type', () => {
    render(renderer([{ type: 'emphasis', emphasis: 'ITALIC' }]));
    expect(screen.getByTestId('italic')).toBeInTheDocument();
  });

  test('should return strong emphasis component if matching type', () => {
    render(renderer([{ type: 'emphasis', emphasis: 'BOLD' }]));
    expect(screen.getByTestId('strong')).toBeInTheDocument();
  });

  test('should return subhed component if matching type', () => {
    render(renderer([{ type: 'hed', hed_type: 'subhed' }]));
    expect(screen.getByTestId('subhed')).toBeInTheDocument();
  });

  test('should return tagline component if matching type', () => {
    render(renderer([{ type: 'tagline' }]));
    expect(screen.getByTestId('tagline')).toBeInTheDocument();
  });

  // TODO: replace with correct phrase mock once phrase component exists
  test('should return phrase component if matching type', () => {
    render(renderer([{ type: 'phrase', text: 'foo' }]));
    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  test('should return html br if `Break` type', () => {
    const { container } = render(renderer([{ type: 'Break' }]));
    expect(container.querySelector('br')).toBeInTheDocument();
  });

  test('should return image component if matching type', () => {
    render(renderer([{ type: 'image' }]));
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });

  test('should return video component if matching type', () => {
    render(renderer([{ type: 'video' }]));
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  test('should return audio component if matching type', () => {
    render(renderer([{ type: 'media', media_type: 'AUDIO' }]));
    expect(screen.getByTestId('audio')).toBeInTheDocument();
  });

  test('should return dynamic inset if matching type', () => {
    render(renderer([{ type: 'inset', inset_type: 'dynamic' }]));
    expect(screen.getByTestId('dynamic')).toBeInTheDocument();
  });

  test('should return pagebreak inset if matching type', () => {
    render(renderer([{ type: 'inset', inset_type: 'pagebreak' }]));
    expect(screen.getByTestId('pagebreak')).toBeInTheDocument();
  });

  test('should return pullquote inset if matching type', () => {
    render(renderer([{ type: 'inset', inset_type: 'pullquote' }]));
    expect(screen.getByTestId('pullquote')).toBeInTheDocument();
  });

  test('should return richtext inset if matching type', () => {
    render(renderer([{ type: 'inset', inset_type: 'richtext' }]));
    expect(screen.getByTestId('rich-text')).toBeInTheDocument();
  });

  test('should return table of contents component if matching type', () => {
    render(renderer([{ type: 'list', list_type: 'table_of_contents' }]));
    expect(screen.getByTestId('table-of-contents')).toBeInTheDocument();
  });

  test('shoulde use recursion to render nested blocks', () => {
    render(renderer([{ type: 'paragraph', content: [{ type: 'link' }] }]));
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(queryByTestId(paragraph, 'link')).toBeInTheDocument();
  });
});
