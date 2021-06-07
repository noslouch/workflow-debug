/* global Event */
import { render, fireEvent, act } from '@testing-library/react';

import ImageBigTop from '../../../__mocks__/bigTop/image.json';
import SplitTop from '../../../__mocks__/bigTop/splitTop.json';
import AutoPlay from '../../../__mocks__/bigTop/autoPlayVideo.json';
import Video from '../../../__mocks__/bigTop/video.json';

import GlobalStyles from '../GlobalStyles';
import BigTop from './index';
import { CENTER, LOWER_THIRD, UNDERNEATH } from '../../lib/consts';

import * as videoLib from '../../lib/load-video-lib';

const HEADLINE = 'Test Headline';
const DEK = 'Test Dek';
const FLASH = 'Test Flashline';
const CRUMB_LABEL = 'Test Breadcrumb';
const CRUMB_URL = '/news/types/foo';
const CRUMB = [
  {
    label: CRUMB_LABEL,
    url: CRUMB_URL,
  },
];
const atmosphericVideoData = {
  caption: 'Atmospheric Caption',
};
const videoData = {
  caption: 'Video Caption',
};

describe('BigTop', () => {
  // https://www.wsj.com/articles/empty-lots-angry-customers-chip-crisis-throws-wrench-into-car-business-11620909719
  describe('Image', () => {
    test('renders', () => {
      const { getByRole, getByText } = render(
        <BigTop
          media={ImageBigTop.properties}
          headline={HEADLINE}
          dek={DEK}
          breadcrumb={CRUMB}
        />
      );
      expect(getByRole('heading', { level: 1 })).toHaveTextContent(HEADLINE);
      expect(getByRole('navigation')).toHaveTextContent(CRUMB_LABEL);
      expect(getByText(DEK)).toBeInTheDocument();
      expect(
        getByText(ImageBigTop.properties.imagecaption)
      ).toBeInTheDocument();
      expect(getByText(ImageBigTop.properties.imagecredit)).toBeInTheDocument();
    });

    test('preview image', () => {
      const { getByRole } = render(<BigTop media={ImageBigTop.properties} />);

      const heroImage = getByRole('img', { name: 'big top image' });
      const previewImage = getByRole('presentation');

      expect(previewImage).toHaveAttribute(
        'src',
        expect.stringContaining('width=10&height=5')
      );

      // when hero image loads, preview fades out
      fireEvent.load(heroImage);

      expect(previewImage).toHaveStyle('opacity: 0');
    });

    // center lowerthird underneath
    // can't test media queries, so check the `type` attr instead
    test('places headlines correctly', () => {
      const media = {
        ...ImageBigTop.properties,
        headlineplacement: CENTER,
      };

      const { container, queryByRole, rerender } = render(
        <BigTop media={media} />
      );

      expect(container.querySelector(`[type="${CENTER}"]`)).toBeInTheDocument();

      media.headlineplacement = LOWER_THIRD;
      rerender(<BigTop media={media} />);
      expect(
        container.querySelector(`[type="${LOWER_THIRD}"]`)
      ).toBeInTheDocument();

      media.headlineplacement = UNDERNEATH;
      rerender(<BigTop media={media} />);
      expect(queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  // https://www.wsj.com/articles/cheating-at-school-is-easier-than-everand-its-rampant-11620828004
  describe('SplitTop', () => {
    test('renders', () => {
      const { getByRole, getByText } = render(
        <BigTop
          media={SplitTop.properties}
          headline={HEADLINE}
          dek={DEK}
          breadcrumb={CRUMB}
        />
      );
      expect(getByRole('heading', { level: 1 })).toHaveTextContent(HEADLINE);
      expect(getByRole('navigation')).toHaveTextContent(CRUMB_LABEL);
      expect(getByText(DEK)).toBeInTheDocument();
      expect(getByText(SplitTop.properties.imagecaption)).toBeInTheDocument();
    });

    test('preview image', () => {
      const { getByRole } = render(<BigTop media={SplitTop.properties} />);

      const heroImage = getByRole('img', { name: 'big top image' });
      const previewImage = getByRole('presentation');

      expect(previewImage).toHaveAttribute(
        'src',
        expect.stringContaining('width=10&height=5')
      );

      // when hero image loads, preview fades out
      fireEvent.load(heroImage);

      expect(previewImage).toHaveStyle('opacity: 0');
    });

    // black white
    test('sets the correct headline color', () => {
      const media = {
        ...SplitTop.properties,
        headlineiswhite: 'false',
      };

      const { getByRole, rerender } = render(
        <>
          <GlobalStyles />
          <BigTop
            media={media}
            headline={HEADLINE}
            dek={DEK}
            breadcrumb={CRUMB}
          />
        </>
      );

      const heading = getByRole('heading', { level: 1 });
      expect(heading).toHaveStyle('color: var(--headline-font-color)');

      media.headlineiswhite = 'true';
      rerender(
        <>
          <GlobalStyles />
          <BigTop
            media={media}
            headline={HEADLINE}
            dek={DEK}
            breadcrumb={CRUMB}
          />
        </>
      );
      expect(heading).toHaveStyle('color: white');
    });
  });

  // https://www.wsj.com/articles/u-s-farmers-vie-for-land-as-a-grain-rally-sparks-shopping-spree-11616923981
  describe('AutoPlayVideoClip', () => {
    test('renders', () => {
      const appendMock = jest.spyOn(document.body, 'appendChild');

      const { getByRole, getByText } = render(
        <BigTop
          media={AutoPlay.properties}
          headline={HEADLINE}
          dek={DEK}
          breadcrumb={CRUMB}
          videoData={atmosphericVideoData}
        />
      );

      expect(appendMock).toHaveBeenCalled();
      expect(getByRole('presentation')).toHaveAttribute(
        'data-atm',
        AutoPlay.properties.bigtopheroid
      );
      expect(getByText(atmosphericVideoData.caption)).toBeInTheDocument();
    });
  });

  // https://www.wsj.com/articles/im-a-fish-out-of-water-1540822720
  describe('Video', () => {
    test('renders', async () => {
      jest.spyOn(videoLib, 'loadVideoLib').mockResolvedValue();

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockReturnValue({
          matches: true, // isMedium
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        }),
      });

      const mockVidLib = jest.fn((node) => ({
        WSJVideo: () => node,
      }));

      window.$jQ111 = mockVidLib;

      const { container, findByText, getByText } = render(
        <BigTop
          media={Video.properties}
          headline={HEADLINE}
          dek={DEK}
          breadcrumb={CRUMB}
          videoData={videoData}
        />
      );

      const headline = await findByText(HEADLINE);
      const player = container.querySelector(
        `#a${Video.properties.bigtopheroid}`
      );

      expect(headline).toBeInTheDocument();
      expect(player).toBeInTheDocument();
      expect(getByText(DEK)).toBeInTheDocument();

      act(() => {
        fireEvent(player, new Event('onPlayerStateChange'));
      });
      expect(headline).not.toBeInTheDocument();

      act(() => {
        fireEvent(player, new Event('onVideoComplete'));
      });
      expect(await findByText(HEADLINE)).toBeInTheDocument();
    });
  });

  describe('breadcrumbs and flashlines', () => {
    test('various permutations are supported', () => {
      const media = {
        ...ImageBigTop.properties,
      };

      const { getByRole, getByText, rerender } = render(
        <BigTop media={media} breadcrumb={CRUMB} />
      );

      const breadcrumb = getByRole('navigation');
      const breadcrumbText = getByText(CRUMB_LABEL);

      // passed in crumb and link should render
      expect(breadcrumbText).toHaveAttribute('href', '/news/types/foo');
      expect(breadcrumb).toHaveTextContent(CRUMB_LABEL);

      // flashlines should render as a text element
      rerender(<BigTop media={media} flashline={FLASH} />);
      const flashline = getByText(FLASH);

      expect(flashline).not.toHaveAttribute('href');
      expect(breadcrumb).toHaveTextContent(FLASH);

      // if exclusive, override passed-in breadcrumb
      rerender(<BigTop media={media} breadcrumb={CRUMB} isExclusive />);
      expect(breadcrumb).toHaveTextContent('WSJ News Exclusive');
      expect(breadcrumbText).not.toBeInTheDocument();

      // exclusive should also override flashlines
      rerender(<BigTop media={media} flashline={FLASH} isExclusive />);
      expect(flashline).toHaveTextContent('WSJ News Exclusive');

      // false on an inset should hide passed in flashline
      media.flashline = 'false'; // see note above about these values -__-
      rerender(<BigTop media={media} breadcrumb={CRUMB} />);
      expect(breadcrumb).not.toBeInTheDocument();
    });
  });
});
