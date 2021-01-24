import { StyleSheet } from 'react-native';
import color from '../../config/color/color';
const styles = StyleSheet.create({
  userTopInformationTitle: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  userTopInfoTextStatus: {
    marginTop: '6%',
    flexGrow: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  userTopInfoRadioStatus: {
    flexGrow: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  userTopInformation: {
    marginRight: '10%',
  },
  userTopInformationForm: {
    margin: -5,
  },
  inputEdit: {
    color: color.text,
    fontSize: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginLeft: '5%',
  },
  buttonContainer: {
    flex: 1,
  },
  userTextArea: {
    marginLeft: 5,
    color: color.text,
    fontSize: 15,
  },
});

export default styles;
