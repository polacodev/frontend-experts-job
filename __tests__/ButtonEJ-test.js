import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

import ButtonEJ from '../src/core-components/ButtonEJ/ButtonEJ';
jest.useFakeTimers();
describe('<ButtonEJ />', () => {
  test('renders <ButtonEJ /> correctly', () => {
    const tree = renderer
      .create(
        <ButtonEJ disable={true} title="Test Button" onPress={() => ({})} />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should return undefined due the empty props', async () => {
    const { container } = render(<ButtonEJ />);
    expect(container.firstChild).toBeUndefined();
  });
});
