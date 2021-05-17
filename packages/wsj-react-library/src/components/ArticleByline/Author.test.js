import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Author from './Author';

describe('ArticleByline Author', () => {
  test('should render null if no text for author', () => {
    const { container } = render(<Author />);
    expect(container.firstChild).toBeNull();
  });

  test('should render author page link if isAmp is set', () => {
    render(
      <Author data={{ id: '1', text: 'foo' }} authorUrl="/news/author/" isAmp />
    );
    expect(screen.getByText('foo', { selector: 'a' })).toHaveAttribute(
      'href',
      '/news/author/1'
    );
  });

  test('should show profile information dropdown on click', () => {
    render(
      <Author
        data={{
          id: '1',
          text: 'foo',
          emailAddress: 'foo@email.com',
          twitterHandle: 'foo',
          facebookAccount: 'foo',
        }}
        authorUrl="/news/author/"
      />
    );
    fireEvent.click(screen.getByText('foo', { selector: 'button' }));
    expect(screen.getByText('Biography', { selector: 'a' })).toHaveAttribute(
      'href',
      '/news/author/1'
    );
    expect(screen.getByText('@foo', { selector: 'a' })).toHaveAttribute(
      'href',
      'https://www.twitter.com/foo'
    );
    expect(screen.getByText('foo', { selector: 'a' })).toHaveAttribute(
      'href',
      'https://www.facebook.com/foo'
    );
    expect(
      screen.getByText('foo@email.com', { selector: 'a' })
    ).toHaveAttribute('href', 'mailto:foo@email.com');
  });

  test('should open dropdown on focus, and close on blur', () => {
    render(
      <Author data={{ id: '1', text: 'foo' }} authorUrl="/news/author/" />
    );
    // First tab to focus button
    userEvent.tab();
    fireEvent.click(screen.getByText('foo', { selector: 'button' }));
    expect(screen.getByText('Biography', { selector: 'a' })).toHaveAttribute(
      'href',
      '/news/author/1'
    );
    // Second tab to focus biography link in now open dropdown
    userEvent.tab();
    // Escape closes menu
    userEvent.keyboard('{Escape}');
    expect(
      screen.queryByText('Biography', { selector: 'a' })
    ).not.toBeInTheDocument();
  });
});
