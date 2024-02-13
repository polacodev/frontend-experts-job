import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';

import ListEJ from '../src/core-components/ListEJ/ListEJ';
jest.useFakeTimers();
describe('<ListEJ />', () => {
  test('renders <ListEJ /> correctly', () => {
    const tree = renderer
      .create(
        <ListEJ
          data={[]}
          rightIcon=""
          leftIcon=""
          onPressItem={() => ({})}
          onPressRightIcon={() => ({})}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call onPressItemMock and onPressRightIconMock when fire the events', async () => {
    const onPressItemMock = jest.fn();
    const onPressRightIconMock = jest.fn();
    const data = [
      {
        name: 'Brian',
        // lastName: 'Stobbe',
        workarea: 'Developer',
        cellphone: '74521856',
      },
    ];
    const { findByTestId } = render(
      <ListEJ
        data={data}
        rightIcon="steam-square"
        leftIcon="recycle"
        onPressItem={onPressItemMock}
        onPressRightIcon={onPressRightIconMock}
      />,
    );
    fireEvent.press(await findByTestId('button-body'), onPressItemMock);
    fireEvent.press(await findByTestId('button-icon'), onPressRightIconMock);
    expect(onPressItemMock).toHaveBeenCalled();
    expect(onPressRightIconMock).toHaveBeenCalled();
  });
});
