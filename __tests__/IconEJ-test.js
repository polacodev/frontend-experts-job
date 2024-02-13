import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';

import IconEJ from '../src/core-components/IconEJ/IconEJ';
jest.useFakeTimers();
describe('<IconEJ />', () => {
  const user = {
    name: 'Brian',
    lastName: 'Stobbe',
    workarea: 'Developer',
    cellphone: '67415847',
  };
  test('renders <IconEJ /> correctly', () => {
    const tree = renderer
      .create(
        <IconEJ
          iconName="times-circle-o"
          color="#ffffff"
          size={20}
          onPressIcon={() => ({})}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call onEventMock when the icon is pressed', async () => {
    const onEventMock = jest.fn();

    const { findByTestId } = render(
      <IconEJ
        iconName="times-circle-o"
        color="#ffffff"
        size={20}
        onPressIcon={() => onEventMock(user)}
      />,
    );
    fireEvent.press(await findByTestId('button-icon'), onEventMock);
    expect(onEventMock).toHaveBeenCalled();
  });

  test('should return undefined due the empty props', () => {
    const onEventMock = jest.fn();
    const { container } = render(
      <IconEJ
        iconName="times-circle-o"
        color="#ffffff"
        size={20}
        onPressIcon={() => onEventMock(user)}
      />,
    );
    expect(container.firstChild).toBeUndefined();
  });
});
