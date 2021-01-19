import { StyleSheet } from 'react-native';
import color from '../../config/color/color';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tabBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingTop: 2,
    height: 49,
  },
});

export default styles;
