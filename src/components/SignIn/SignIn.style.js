import { StyleSheet, Dimensions } from 'react-native';

import color from '../../config/color/color';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: height,
  },
  imageIcon: {
    height: 80,
    width: 80,
  },
  imageIconTitle: {
    height: 32,
    width: 150,
  },
  errorText: {
    color: color.error,
  },
  headerContainer: {
    marginTop: '10%',
    marginBottom: 10,
  },
  headerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  footerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
    backgroundColor: color.white,
  },
  footerText: {
    color: color.secondary,
  },
  footerTextButton: {
    color: color.secondary,
    fontWeight: 'bold',
  },
});

export default styles;
