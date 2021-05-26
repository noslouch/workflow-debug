import { render, screen, within } from '@testing-library/react';
import JoinTheConversation from './index';
import mockData from '../../../__mocks__/joinTheConversationMock.json';

describe('Join The Conversation', () => {
  test('Should render the Join The Conversation title', () => {
    const { getByText } = render(<JoinTheConversation items={mockData} />);
    expect(getByText('Join the Conversation')).toBeInTheDocument();
  });

  test('Should not render a specific list item when title is not present', () => {
    const items = [
      {
        trackingUrl:
          'https://www.wsj.com/articles/5g-us-rollout-11621897471?mod=cxrecs_join#cxrecs_s',
        url: 'https://www.wsj.com/articles/5g-us-rollout-11621897471',
        title: '',
        image:
          'https://content-thumbnail.cxpublic.com/content/dominantthumbnail/956753797ffab27a73230b4065fc366c5763099c.jpg?60ad031d',
      },
      {
        trackingUrl:
          'https://www.wsj.com/articles/5g-us-rollout-11621897471?mod=cxrecs_join#cxrecs_s',
        url: 'https://www.wsj.com/articles/5g-us-rollout-11621897471',
        title: 'Why the U.S. Rollout of 5G Is So Slow',
        image:
          'https://content-thumbnail.cxpublic.com/content/dominantthumbnail/956753797ffab27a73230b4065fc366c5763099c.jpg?60ad031d',
      },
    ];

    render(<JoinTheConversation items={items} />);

    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const listItems = getAllByRole('listitem');

    expect(listItems.length).toBe(1);
  });

  test('Should not render a specific list item when trackingUrl is not present', () => {
    const items = [
      {
        trackingUrl: '',
        url: 'https://www.wsj.com/articles/5g-us-rollout-11621897471',
        title: 'Why the U.S. Rollout of 5G Is So Slow',
        image:
          'https://content-thumbnail.cxpublic.com/content/dominantthumbnail/956753797ffab27a73230b4065fc366c5763099c.jpg?60ad031d',
      },
    ];

    const { queryByText } = render(<JoinTheConversation items={items} />);

    expect(
      queryByText('Why the U.S. Rollout of 5G Is So Slow')
    ).not.toBeInTheDocument();
  });
});
