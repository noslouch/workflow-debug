import Skip from '.';

export default {
  title: 'Skip',
  component: Skip,
  parameters: {
    docs: {
      description: {
        component:
          'In order to test, click inside the Storybook Canvas, and then hit the TAB button. The Skip Component will then display.',
      },
    },
  },
};

export const WithDropdownMenu = () => (
  <div>
    <Skip />
    <div
      style={{ height: '1000px' }}
      id="explainer"
      aria-label="How to Show the Skip Component"
      role="complementary"
      tabIndex="-1"
    >
      <p>
        In order to display the Skip Component, please click first within the
        Storybook canvas and then hit the <strong>TAB</strong> button.
      </p>
    </div>
    <div
      style={{ height: '500px' }}
      id="click-me"
      aria-label="Press Enter To Scroll Down To This Div"
      role="complementary"
      tabIndex="-1"
    >
      <p>
        The Skip Component scrolls to and focuses on the element that is
        identified in the dropdown menu.
      </p>
    </div>
  </div>
);
