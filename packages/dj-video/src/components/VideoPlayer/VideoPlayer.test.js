import { render } from '@testing-library/react';
import VideoPlayer from './index';

describe('VideoPlayer', () => {
  test('should render the container', () => {
    const { container } = render(<VideoPlayer guid="test" />);
    expect(container.querySelector('#test')).toBeInTheDocument();
  });

  describe('AmpVideoPlayer', () => {
    test('should render amp version', () => {
      const { container } = render(<VideoPlayer guid="test" isAmp />);
      const ampIframe = container.getElementsByTagName('amp-iframe')?.[0];
      expect(ampIframe).toBeInTheDocument();
      expect(ampIframe).toHaveAttribute('allowfullscreen');
      expect(ampIframe).toHaveAttribute('frameborder', '0');
      expect(ampIframe).toHaveAttribute('height', '225');
      expect(ampIframe).toHaveAttribute('layout', 'responsive');
      expect(ampIframe).toHaveAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-popups'
      );
      expect(ampIframe).toHaveAttribute(
        'src',
        'https://video-api.wsj.com/api-video/player/v3/iframe.html?guid=test&height=225&width=400&plid=video_amp&chainVideos=true&resetOnComplete=true&a=a'
      );
      expect(ampIframe).toHaveAttribute('width', '400');
    });

    test('should append parentUrl to the src', () => {
      const { container } = render(
        <VideoPlayer guid="test" isAmp parentUrl="https://www.wsj.com" />
      );
      const ampIframe = container.getElementsByTagName('amp-iframe')?.[0];
      expect(ampIframe).toBeInTheDocument();
      expect(ampIframe).toHaveAttribute(
        'src',
        'https://video-api.wsj.com/api-video/player/v3/iframe.html?guid=test&height=225&width=400&plid=video_amp&chainVideos=true&resetOnComplete=true&a=a&parentUrl=https%3A%2F%2Fwww.wsj.com'
      );
    });
  });
});
