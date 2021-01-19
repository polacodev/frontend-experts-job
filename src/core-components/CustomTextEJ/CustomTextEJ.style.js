import { StyleSheet } from 'react-native';

export const styles = (color, size) =>
  StyleSheet.create({
    customText: {
      fontSize: size,
      color: color,
      paddingTop: 2,
    },
  });

export default styles;
