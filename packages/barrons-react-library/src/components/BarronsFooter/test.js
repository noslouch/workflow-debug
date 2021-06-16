import renderer from 'react-test-renderer';
import Component from './index';
import props from './props';

test('renders correctly', () => {
  const tree = renderer.create(<Component {...props} />).toJSON();
  expect(tree).toEqual(tree);
});
