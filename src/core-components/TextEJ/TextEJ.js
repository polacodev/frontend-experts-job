import React from 'react';
import { Text } from 'native-base';

const TextEJ = ({ type = '', children }) => {
  const typeOfText = (element) => {
    switch (element) {
      case 'normal':
        return <Text numberOfLines={1}>{children}</Text>;
      case 'note':
        return (
          <Text note numberOfLines={1}>
            {children}
          </Text>
        );
      default:
        return null;
    }
  };

  return typeOfText(type);
};

export default TextEJ;
