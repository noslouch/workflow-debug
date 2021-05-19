import { render, fireEvent, screen } from '@testing-library/react';
import TableOfContents from './index';

const contents = Array(10)
  .fill()
  .map((_, index) => ({
    id: `section-${index + 1}`,
    text: `Section ${index + 1}`,
  }));

test('should show the correct number of list items', async () => {
  const { container } = render(<TableOfContents contents={contents} />);
  const items = await screen.findAllByText(/section [0-9]/i, {
    selector: 'li a',
  });
  const hiddenItems = container.querySelectorAll('li a[tabindex="-1"]');
  expect(items).toHaveLength(contents.length);
  expect(hiddenItems).toHaveLength(
    contents.length - TableOfContents.defaultProps.collapsedItemCount
  );
});

test('should not collapse when forceExpand is set', () => {
  const { container } = render(
    <TableOfContents contents={contents} forceExpand />
  );
  const button = screen.queryByText(/show all sections/i, {
    selector: 'button',
  });
  const hiddenItems = container.querySelectorAll('li a[tabindex="-1"]');
  expect(button).toBeNull();
  expect(hiddenItems).toHaveLength(0);
});

test('should change title tag, title text, and button text', () => {
  render(
    <TableOfContents
      contents={contents}
      titleTag="h3"
      titleText="foo"
      buttonText="bar"
    />
  );
  const title = screen.getByText('foo', { selector: 'h3' });
  const button = screen.getByText('bar', { selector: 'button' });
  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('should expand to show all', async () => {
  const { container } = render(<TableOfContents contents={contents} />);
  const button = screen.queryByText(/show all sections/i, {
    selector: 'button',
  });
  const hiddenItemsBefore = container.querySelectorAll('li a[tabindex="-1"]');
  expect(button).toBeInTheDocument();
  expect(hiddenItemsBefore).toHaveLength(
    contents.length - TableOfContents.defaultProps.collapsedItemCount
  );
  fireEvent.click(button);
  const items = await screen.findAllByText(/section [0-9]/i, {
    selector: 'li a',
  });
  const hiddenItemsAfter = container.querySelectorAll('li a[tabindex="-1"]');
  expect(
    screen.queryByText(/show all sections/i, { selector: 'button' })
  ).toBeNull();
  expect(hiddenItemsAfter).toHaveLength(0);
  expect(document.activeElement).toEqual(
    items[TableOfContents.defaultProps.collapsedItemCount]
  );
});
