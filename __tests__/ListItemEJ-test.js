import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';

import ListItemEJ from '../src/core-components/ListEJ/ListItemEJ';
jest.useFakeTimers();
describe('<ListItemEJ />', () => {
  const user = {
    name: 'Mark',
    lastName: 'Stobbe',
    workarea: 'Developer',
    cellphone: '75412587',
  };
  test('renders <ListItemEJ /> correctly', () => {
    const tree = renderer
      .create(
        <ListItemEJ
          user={user}
          rightIcon="check-circle-o"
          leftIcon="times-circle-o"
          onPressItem={() => ({})}
          onPressRightIcon={() => ({})}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should call onPressItem and onPressRightIcon events', async () => {
    const onPressItem = jest.fn();
    const onPressRightIcon = jest.fn();

    const { findByTestId } = render(
      <ListItemEJ
        user={user}
        rightIcon="check-circle-o"
        leftIcon="times-circle-o"
        onPressItem={onPressItem}
        onPressRightIcon={onPressRightIcon}
      />,
    );
    fireEvent.press(await findByTestId('button-body'), onPressItem);
    fireEvent.press(await findByTestId('button-icon'), onPressRightIcon);
    expect(onPressItem).toHaveBeenCalled();
    expect(onPressRightIcon).toHaveBeenCalled();
  });
});
