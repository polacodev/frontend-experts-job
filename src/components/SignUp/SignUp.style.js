import { StyleSheet, Dimensions } from 'react-native';

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
    color: '#F44336',
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
    backgroundColor: '#FFFFFF',
  },
  footerText: {
    color: '#12799f',
  },
  footerTextButton: {
    color: '#12799f',
    fontWeight: 'bold',
  },
  formStyles: {
    marginLeft: 15,
  },
});

export default styles;
