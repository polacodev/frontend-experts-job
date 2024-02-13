import { StyleSheet } from 'react-native';

import color from '../../config/color/color';

const styles = (disable) =>
  StyleSheet.create({
    container: {
      marginTop: 10,
      alignItems: 'center',
    },
    button: {
      width: '100%',
      borderRadius: 5,
      justifyContent: 'center',
      backgroundColor: disable ? color.gray : color.primary,
    },
  });

export default styles;
