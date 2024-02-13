import { StyleSheet } from 'react-native';

import color from '../../config/color/color';

const styles = StyleSheet.create({
  socialNetworkContainer: {
    margin: 10,
  },
  facebookLogin: {
    paddingLeft: 8,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    backgroundColor: '#3B5998',
  },
  googleLogin: {
    paddingLeft: 8,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    backgroundColor: '#dd4b39',
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
  },
  socialNetworkText: {
    color: color.white,
  },
});

export default styles;
