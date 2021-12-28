import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -15,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -15,
  },
  modalIcons: {
    paddingTop: 30,
    flexDirection: 'row',
  },
  modalStar: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default styles;
