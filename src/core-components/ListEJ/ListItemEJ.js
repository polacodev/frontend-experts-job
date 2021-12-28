import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ListItem, Body, Right } from 'native-base';

import StarEJ from '../StarEJ/StarEJ';
import IconEJ from '../IconEJ/IconEJ';
import TextEJ from '../TextEJ/TextEJ';

import { stars } from '../../utils/utils';
import color from '../../config/color/color';
import styles from './ListItemEj.style';

const ListItemEJ = ({
  user,
  rightIcon = '',
  leftIcon = '',
  onPressItem = () => ({}),
  onPressRightIcon = () => ({}),
  onRatingValues = false,
}) => {
  const userName = user.lastName ? `${user.name} ${user.lastName}` : user.name;
  const userInfo = `${user.workarea} | ${user.cellphone}`;
  return (
    <ListItem avatar>
      <IconEJ iconName={leftIcon} size={20} color={color.icon} />
      <Body>
        <TouchableOpacity
          testID="button-body"
          onPress={() => onPressItem(user)}>
          <TextEJ type="normal">{userName}</TextEJ>
          <TextEJ type="note">{user.email}</TextEJ>
        </TouchableOpacity>
        <View style={styles.starContainer}>
          {onRatingValues &&
            stars.map((star, index) => (
              <View key={star.id} style={styles.starItems}>
                <StarEJ
                  filled={index < user?.rate?.averageRate ? true : false}
                  size={12}
                  color={color.star}
                  onChangeRatingStars={() => ({})}
                />
              </View>
            ))}
        </View>
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
