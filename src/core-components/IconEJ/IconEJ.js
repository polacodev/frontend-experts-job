import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import styles from './IconEJ.style';

const IconEJ = ({
  iconName = '',
  color = '',
  size = 20,
  onPressIcon = () => ({}),
}) => {
  return onPressIcon.name ? (
    <TouchableOpacity testID="button-icon" onPress={onPressIcon}>
      <Icon
        type="FontAwesome"
        name={iconName}
        style={styles(color, size).icon}
      />
    </TouchableOpacity>
  ) : (
    <Icon type="FontAwesome" name={iconName} style={styles(color, size).icon} />
  );
};

export default IconEJ;
