import { render } from '@testing-library/react';
import AudioPlayer from './index';

describe('AudioPlayer', () => {
  test('should render the container', () => {
    const { container } = render(
      <AudioPlayer guid="796ad6e1-e9fa-4c29-bbb3-69d2096021f1" />
    );
    expect(
      container.querySelector('#audio-796ad6e1-e9fa-4c29-bbb3-69d2096021f1')
    ).toBeInTheDocument();
  });

  describe('AmpAudioPlayer', () => {
    test('should render amp version', () => {
      const { container } = render(
        <AudioPlayer guid="test" isAmp width="580" height="50" />
      );
      const ampIframe = container.getElementsByTagName('amp-iframe')?.[0];
      expect(ampIframe).toBeInTheDocument();
      expect(ampIframe).toHaveAttribute('frameborder', '0');
      expect(ampIframe).toHaveAttribute('height', '50');
      expect(ampIframe).toHaveAttribute('layout', 'responsive');
      expect(ampIframe).toHaveAttribute(
        'sandbox',
        'allow-scripts allow-same-origin allow-popups'
      );
      expect(ampIframe).toHaveAttribute(
        'src',
        'https://video-api.wsj.com/api-video/audio/iframe.html?guid=test&height=50&width=580&showHeader=true&showTitle=true&showSubscribe=true&hideFeedback=false&theme=default&adsEnabled=false&hideDescription=false&articleSnippet=false&autoplay=false'
      );
      expect(ampIframe).toHaveAttribute('width', '580');
    });

    test('should append parentUrl to the src', () => {
      const { container } = render(
        <AudioPlayer
          guid="test"
          isAmp
          parentUrl="https://www.wsj.com"
          width="580"
          height="50"
        />
      );
      const ampIframe = container.getElementsByTagName('amp-iframe')?.[0];
      expect(ampIframe).toBeInTheDocument();
      expect(ampIframe).toHaveAttribute(
        'src',
        'https://video-api.wsj.com/api-video/audio/iframe.html?guid=test&height=50&width=580&showHeader=true&showTitle=true&showSubscribe=true&hideFeedback=false&theme=default&adsEnabled=false&hideDescription=false&articleSnippet=false&autoplay=false&parentUrl=https%3A%2F%2Fwww.wsj.com'
      );
    });
  });
});
