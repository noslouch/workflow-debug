import styled from 'styled-components';
import AudioPlayer from './index';

const Container = styled.div`
  margin: 0 auto;
  width: 720px;
`;

export default {
  title: 'AudioPlayer',
  component: AudioPlayer,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

const Template = (args) => <AudioPlayer {...args} />;

export const StandardAudio = Template.bind({});
StandardAudio.args = {
  guid: '796ad6e1-e9fa-4c29-bbb3-69d2096021f1',
};
