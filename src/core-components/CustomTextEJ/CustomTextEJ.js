import React from 'react';
import { Text } from 'native-base';

import styles from './CustomTextEJ.style';

const CustomTextEJ = ({ type = '', children, color, size }) => {
  const typeOfText = (element) => {
    switch (element) {
      case 'normal':
        return (
          <Text numberOfLines={1} style={styles(color, size).customText}>
            {children}
          </Text>
        );
      case 'note':
        return (
          <Text note numberOfLines={1} style={styles(color, size).customText}>
            {children}
          </Text>
        );
      default:
        return null;
    }
  };

  return typeOfText(type);
};

export default CustomTextEJ;
