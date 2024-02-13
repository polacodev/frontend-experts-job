import { ToastAndroid, Platform, AlertIOS } from 'react-native';

const NotifyMessage = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
};

export default NotifyMessage;
