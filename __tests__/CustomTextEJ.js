import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

import CustomTextEJ from '../src/core-components/CustomTextEJ/CustomTextEJ';
jest.useFakeTimers();
describe('<CustomTextEJ />', () => {
  test('renders <CustomTextEJ /> correctly', () => {
    const tree = renderer
      .create(
        <CustomTextEJ
          type="normal"
          children="test label normal"
          color="#ffffff"
          size={20}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should find "test label normal"', async () => {
    const { getByText } = render(
      <CustomTextEJ
        type="note"
        children="test label normal"
        color="#ffffff"
        size={20}
      />,
    );
    expect(getByText('test label normal').children).toBeDefined();
  });

  test('should find "test label note"', async () => {
    const { getByText } = render(
      <CustomTextEJ
        type="note"
        children="test label note"
        color="#ffffff"
        size={20}
      />,
    );
    expect(getByText('test label note').children).toBeDefined();
  });

  test('should find "test label empty"', async () => {
    const { container } = render(
      <CustomTextEJ
        type="lol"
        children="test label empty"
        color="#ffffff"
        size={20}
      />,
    );
    expect(container.firstChild).toBeUndefined();
  });

  test('should return undefined due the empty props', async () => {
    const { container } = render(<CustomTextEJ />);
    expect(container.firstChild).toBeUndefined();
  });
});
