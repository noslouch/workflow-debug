import ImageMock from '../../../__mocks__/bigTop/image.json';
import SplitMock from '../../../__mocks__/bigTop/splitTop.json';
import AtmoMock from '../../../__mocks__/bigTop/autoPlayVideo.json';
import VideoMock from '../../../__mocks__/bigTop/video.json';

import BigTop from './index';

export default {
  title: 'BigTop',
};

const Template = (args) => <BigTop {...args} />;

export const Image = Template.bind({});
Image.args = {
  breadcrumb: [
    {
      label: 'Autos Industry',
      url: 'https://www.wsj.com/news/types/autos?mod=bigtop-breadcrumb',
    },
  ],
  headline:
    'Empty Lots, Angry Customers: Chip Crisis Throws Wrench Into Car Business',
  dek:
    'Car makers have cut production of 1.2 million vehicles in North America because of a shortage of computer chips, losing sales amid high demand',
  isExclusive: false,
  media: {
    ...ImageMock.properties,
  },
};

export const SplitTop = Template.bind({});
SplitTop.args = {
  breadcrumb: [
    {
      label: 'Education',
      url: 'https://www.wsj.com/news/types/education?mod=bigtop-breadcrumb',
    },
  ],
  headline: "Cheating at School Is Easier Than Ever—and It's Rampant",
  dek:
    'With many students at home, and with a mass of websites offering services to do their homework, schools have seen a surge in academic dishonesty',
  isExclusive: false,
  media: {
    ...SplitMock.properties,
  },
};

export const AtmoTop = Template.bind({});
AtmoTop.args = {
  breadcrumb: [
    {
      label: 'Business',
      url: 'https://www.wsj.com/news/types/business?mod=bigtop-breadcrumb',
    },
  ],
  headline: 'U.S. Farmers Vie for Land as a Grain Rally Sparks Shopping Spree',
  dek:
    'Rising prices for farmland sideline many smaller growers; ‘it’s a real kick in the shorts’',
  isAtmospheric: true,
  isExclusive: false,
  media: {
    ...AtmoMock.properties,
  },
  videoData: {
    thumbnail:
      'https://m.wsj.net/video-atmo/20210325/0328farmland01/0328farmland01_1000x562.jpg',
    caption:
      'Across the Midwest, prices to buy and rent farmland are climbing as rallying grain markets, historic government payments and low interest rates drive demand.',
  },
};

export const VideoTop = Template.bind({});
VideoTop.args = {
  flashline: 'Voices From a Divided America',
  headline: "‘I'm a Fish Out of Water’",
  dek:
    'A conservative in the Pacific Northwest and a liberal in Texas talk about feeling isolated in their communities',
  dynamicInset:
    '<div style="background-color: #222; color: white;">hello world</div>',
  isExclusive: false,
  media: {
    ...VideoMock.properties,
  },
  videoData: {
    caption: 'Video: Adya Beasley/The Wall Street Journal',
  },
};
