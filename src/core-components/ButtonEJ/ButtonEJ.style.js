import { StyleSheet } from 'react-native';

import color from '../../config/color/color';

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: color.white,
  },
});

export default styles;
