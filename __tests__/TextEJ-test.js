import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

import TextEJ from '../src/core-components/TextEJ/TextEJ';
jest.useFakeTimers();
describe('<TextEJ />', () => {
  test('renders <TextEJ /> correctly', () => {
    const tree = renderer
      .create(<TextEJ type="normal" children="test label example" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should be no render the component due the fake props', async () => {
    const { container } = render(
      <TextEJ type="fake type" children="test no-label example" />,
    );
    expect(container.firstChild).toBeUndefined();
  });
});
