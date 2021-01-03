import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Body, Right } from 'native-base';

import IconEJ from '../IconEJ/IconEJ';
import TextEJ from '../TextEJ/TextEJ';

import color from '../../config/color/color';

const ListItemEJ = ({
  user,
  rightIcon = '',
  leftIcon = '',
  onPressItem = () => ({}),
  onPressRightIcon = () => ({}),
}) => {
  const userName = user.lastName ? `${user.name} ${user.lastName}` : user.name;
  const userInfo = `${user.workarea} | ${user.cellphone}`;
  return (
    <ListItem avatar>
      <IconEJ iconName={leftIcon} size={20} color={color.icon} />
      <Body>
        <TouchableOpacity onPress={() => onPressItem(user)}>
          <TextEJ type="normal">{userName}</TextEJ>
          <TextEJ type="note">{user.email}</TextEJ>
        </TouchableOpacity>
      </Body>
      <Right>
        <IconEJ
          onPressIcon={() => onPressRightIcon(user)}
          iconName={rightIcon}
          size={20}
          color={color.icon}
        />
        <TextEJ type="note">{userInfo}</TextEJ>
      </Right>
    </ListItem>
  );
};

export default ListItemEJ;
