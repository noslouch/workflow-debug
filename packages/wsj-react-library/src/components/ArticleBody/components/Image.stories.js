import styled from 'styled-components';
import Image from './Image';
import imageMock from './__mocks__/image.json';

const SAMPLE_WIDTHS = [639, 640, 560, 720];

const Container = styled.article`
  margin: 0 auto;
  width: 100%;

  @media (min-width: 640px) {
    width: 640px;
  }

  @media (min-width: 980px) {
    width: 560px;
  }

  @media (min-width: 1300px) {
    width: 720px;
  }
`;

export default {
  title: 'Article/Body/Components/Image',
  component: Image,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

export const SoftCropImageManagerImage = () => (
  <Image widths={SAMPLE_WIDTHS} data={imageMock.softcrop} />
);

export const GAMSImage = () => (
  <Image widths={SAMPLE_WIDTHS} data={imageMock.gams} />
);
