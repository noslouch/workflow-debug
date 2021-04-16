import React from 'react';
import Box from '.';

export default {
  title: 'Box',
  component: Box,
  parameters: {
    componentSubtitle: 'In addition, you can pass any props that https://styled-system.com/table supports',
  },
};
const InnerBox = ({ children, ...props }) => <Box {...props}>{children}</Box>;
InnerBox.defaultProps = {
  border: '2px solid #222222',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Template = (args) => <Box {...args}></Box>;

export const Regular = Template.bind({});
Regular.args = {
  bg: 'gray',
  border: 'solid 1px #222222',
  m: '50px',
  p: '50px',
  children: <div>Regular Box</div>,
};

export const Vertical = Template.bind({});
Vertical.args = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '150px',
  height: '450px',
  children: (
    <>
      <InnerBox>Component 1</InnerBox>
      <InnerBox>Component 2</InnerBox>
      <InnerBox>Component 3</InnerBox>
      <InnerBox>Component 4</InnerBox>
    </>
  ),
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '450px',
  height: '150px',
  children: (
    <>
      <InnerBox>Component 1</InnerBox>
      <InnerBox>Component 2</InnerBox>
      <InnerBox>Component 3</InnerBox>
      <InnerBox>Component 4</InnerBox>
    </>
  ),
};

export const Spacing = Template.bind({});
Spacing.args = {
  width: '324px',
  m: '10px',
  p: '10px',
  border: '2px solid #222222',
  children: (
    <div style={{ width: '100%', height: '80px', border: '1px solid #222222' }}>
      Component <strong>width: 100% No spacing</strong> <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Aenean rutrum.
    </div>
  ),
};

export const Strip = Template.bind({});
Strip.args = {
  display: 'flex',
  width: '100%',
  height: '40px',
  bg: 'black',
  color: 'white',
  px: '250px',
  width: '600px',
  border: '2px solid #222222',
  children: (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        border: '2px solid #222222',
      }}
    >
      <div>Content 1</div>
      <div>Content 2</div>
      <div>Content 3</div>
      <div>Content 4</div>
    </div>
  ),
};
