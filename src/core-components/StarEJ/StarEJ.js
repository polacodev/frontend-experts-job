import React from 'react';
import { View } from 'react-native';

import IconEJ from '../IconEJ/IconEJ';

const StarEJ = ({ filled, color, size, onChangeRatingStars = () => ({}) }) => {
  return onChangeRatingStars.name ? (
    <View>
      <IconEJ
        onPressIcon={() => onChangeRatingStars()}
        iconName={filled ? 'star' : 'star-o'}
        size={size}
        color={color}
      />
    </View>
  ) : (
    <View>
      <IconEJ iconName={filled ? 'star' : 'star-o'} size={size} color={color} />
    </View>
  );
};

export default StarEJ;
