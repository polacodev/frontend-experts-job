import { StyleSheet } from 'react-native';

export const styles = (color, size) =>
  StyleSheet.create({
    icon: {
      fontSize: size,
      color: color,
    },
  });

export default styles;
