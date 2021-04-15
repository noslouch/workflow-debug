import { fireEvent, render, screen } from '@testing-library/react';
import OpinionArticleTypeContent from './OpinionArticleTypeContent';

describe('OpinionArticleTypeContent', () => {
  const defaultProps = {
    link: 'test_link',
    header: 'Test Header',
    description: 'Test Description',
  };

  const defaultImageProps = {
    link: 'test_link',
    header: 'Test Header',
    description: 'Test Description',
    image: 'test_image_link',
  };

  const truncatedStyles = `position: relative;
  max-height: 123px;
  overflow: hidden;`;

  test('Component is rendered when all the props are passed', () => {
    render(<OpinionArticleTypeContent {...defaultProps} />);
    expect(screen.getByText(defaultProps.header)).toBeTruthy();
    expect(screen.getByText(defaultProps.description)).toBeTruthy();
    expect(screen.getByText(defaultImageProps.header).href).toContain(defaultImageProps.link);
    expect(screen.queryByRole('img')).toBeFalsy();
  });

  test('Component is not rendered when description is null', () => {
    render(<OpinionArticleTypeContent />);

    expect(screen.firstChild).toBeFalsy();
  });

  test('Component renders image when image prop is set', () => {
    render(<OpinionArticleTypeContent {...defaultImageProps} />);

    expect(screen.getByText(defaultImageProps.header)).toBeTruthy();
    expect(screen.getByText(defaultImageProps.description)).toBeTruthy();
    expect(screen.getByRole('img')).toHaveAttribute('src', defaultImageProps.image);
    expect(screen.getByText(defaultImageProps.header).href).toContain(defaultImageProps.link);
  });

  test('Component does not render show more button if description length is less than 256', () => {
    render(<OpinionArticleTypeContent {...defaultProps} />);

    expect(screen.queryByText('+ Show More')).toBeFalsy();
  });

  test('Component renders show more button if description length is more than 256', () => {
    render(<OpinionArticleTypeContent {...defaultProps} description={'Test Description'.repeat(17)} />);

    expect(screen.queryByText('+ Show More')).toBeTruthy();
    expect(screen.queryByText('- Show Less')).toBeFalsy();
  });

  test('Show more button on click renders right button label', () => {
    render(<OpinionArticleTypeContent {...defaultProps} description={'Test Description'.repeat(17)} />);

    fireEvent.click(screen.queryByText('+ Show More'));
    expect(screen.queryByText('+ Show More')).toBeFalsy();
    expect(screen.queryByText('- Show Less')).toBeTruthy();
  });

  test('Show less button on click renders right button label', () => {
    render(<OpinionArticleTypeContent {...defaultProps} description={'Test Description'.repeat(17)} />);

    fireEvent.click(screen.queryByText('+ Show More'));
    expect(screen.queryByText('- Show Less')).toBeTruthy();

    fireEvent.click(screen.queryByText('- Show Less'));
    expect(screen.queryByText('+ Show More')).toBeTruthy();
    expect(screen.queryByText('- Show Less')).toBeFalsy();
  });

  test('Show more button on click applies right class', () => {
    const { getByTestId } = render(
      <OpinionArticleTypeContent {...defaultProps} description={'Test Description'.repeat(17)} />
    );

    expect(getByTestId('opinion-article-description')).toHaveStyle(truncatedStyles);
    fireEvent.click(screen.queryByText('+ Show More'));
    expect(getByTestId('opinion-article-description')).not.toHaveStyle(truncatedStyles);
  });
});
