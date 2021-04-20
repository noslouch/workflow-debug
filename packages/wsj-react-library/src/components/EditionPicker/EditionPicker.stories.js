import React from 'react';
import styled from 'styled-components';
import EditionPicker from '.';
import mockData from '../../../__mocks__/edition-picker.json';

export default {
  title: 'WSJ/EditionPicker',
  component: EditionPicker,
};

const Wrapper = styled.div`
  width: 300px;
`;

const StyledEditionPicker = styled(EditionPicker)`
  background-color: blue;
`;

const Template = (args) => (
  <Wrapper>
    <EditionPicker {...args} />
  </Wrapper>
);

const StyledTemplate = (args) => (
  <Wrapper>
    <StyledEditionPicker {...args} />
  </Wrapper>
);

export const English = Template.bind({});
English.args = mockData['na,us'];

export const ChineseHans = Template.bind({});
ChineseHans.args = mockData['asia,cn'];

export const Japanese = Template.bind({});
Japanese.args = mockData['asia,jp'];

export const ChineseHant = Template.bind({});
ChineseHant.args = mockData['asia,cn_hant'];

export const withStyles = StyledTemplate.bind({});
withStyles.args = mockData['na,us'];
