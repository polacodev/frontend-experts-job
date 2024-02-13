import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import localization from '../../localization/localization';
import IconEJ from '../../core-components/IconEJ/IconEJ';

import styles from './SocialNetworkLogin.style';

const SocialNetworkLogin = ({
  onFacebookLogin = () => ({}),
  onGoogleLogin = () => ({}),
}) => {
  return (
    <View style={styles.socialNetworkContainer}>
      <View style={styles.socialLogin}>
        <Text style={styles.googleLogin} onPress={onGoogleLogin}>
          <IconEJ color="white" size={30} iconName="google" />
          <Text style={styles.socialNetworkText}>
            {' '}
            {localization.googleSignin}
          </Text>
        </Text>
      </View>
      <View style={styles.socialLogin}>
        <Text style={styles.facebookLogin} onPress={onFacebookLogin}>
          <IconEJ color="white" size={30} iconName="facebook" />
          <Text style={styles.socialNetworkText}>
            {' '}
            {localization.facebookSignin}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SocialNetworkLogin;
