import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';

import HeaderEJ from '../src/core-components/HeaderEJ/HeaderEJ';
jest.useFakeTimers();
describe('<HeaderEJ />', () => {
  const onEventMock = jest.fn();

  test('renders <HeaderEJ /> correctly', () => {
    const tree = renderer
      .create(<HeaderEJ searchText="Mark" handlerSearch={onEventMock} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call handlerSearch event', () => {
    const { getByPlaceholderText } = render(
      <HeaderEJ searchText="Test" handlerSearch={onEventMock} />,
    );
    fireEvent(getByPlaceholderText('Search'), 'onChangeText', 'ab');
    expect(onEventMock).toHaveBeenCalledWith('ab');
  });

  test('should return undefined due the empty props', () => {
    const { container } = render(<HeaderEJ />);
    expect(container.firstChild).toBeUndefined();
  });
});
