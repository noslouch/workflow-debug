import { render } from '@testing-library/react';
import AtmosphericPlayer from './index';

describe('AtmosphericPlayer', () => {
  beforeAll(() => {
    window.com_marketwatch_atmplayer = jest.fn();
  });
  beforeEach(() => window.com_marketwatch_atmplayer.mockClear());

  test('should render the container', () => {
    const { queryByRole } = render(<AtmosphericPlayer guid="test" />);
    const playerEl = queryByRole('presentation');
    expect(playerEl).toBeInTheDocument();
    expect(playerEl).toHaveAttribute('data-atm', 'test');
  });

  test('should not render anything if guid is not provided', () => {
    const { queryByRole } = render(<AtmosphericPlayer />);
    const playerEl = queryByRole('presentation');
    expect(playerEl).toBeNull();
  });

  test('should init atmo player', async () => {
    render(<AtmosphericPlayer guid="test" />);
    await new Promise((resolve) => setImmediate(() => resolve()));
    expect(window.com_marketwatch_atmplayer).toHaveBeenCalledTimes(1);
  });
});
