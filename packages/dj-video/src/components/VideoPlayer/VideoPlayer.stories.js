import styled from 'styled-components';
import VideoPlayer from './index';

const Container = styled.div`
  margin: 0 auto;
  width: 720px;
`;

export default {
  title: 'VideoPlayer',
  component: VideoPlayer,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

const Template = (args) => <VideoPlayer {...args} />;

export const StandardVideo = Template.bind({});
StandardVideo.args = {
  guid: 'BA978506-2434-4014-9B5E-082BB22101E1',
};
