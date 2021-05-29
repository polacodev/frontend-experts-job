import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Keyboard,
} from 'react-native';
import {
  Container,
  Footer,
  Text,
  Content,
  Form,
  Item,
  Input,
  Switch,
} from 'native-base';

import localization from '../../localization/localization';
import ButtonEJ from '../../core-components/ButtonEJ/ButtonEJ';
import IconEJ from '../../core-components/IconEJ/IconEJ';
import * as localStorage from '../../config/local-storage/localStorage';
import authentication from '../../graphql/authentication/authentication.api';

import styles from './SignIn.style';

const SignIn = ({ navigation }) => {
  const [englishLanguage, setEnglishLanguage] = useState({
    englishLabel: 'EN',
    isEnglishLabel: true,
  });
  const [email, setEmail] = useState({
    email: '',
    isValidEmail: false,
    stateEmail: 'empty',
  });
  const [password, setPassword] = useState({
    password: '',
    isValidPassword: false,
    statePassword: 'empty',
  });

  const [isSignInErrorDisplayed, setIsSignInErrorDisplayed] = useState(false);
  const [isFooterHidden, setIsFooterHidden] = useState(false);

  useEffect(() => {
    const isUserLogged = async () => {
      try {
        const storedSignInDetails = await localStorage.getStringValue('token');
        const storedLanguage = await localStorage.getStringValue('language');
        setLanguage(storedLanguage === 'EN');
        if (storedLanguage !== null && storedSignInDetails !== null) {
          navigation.navigate('Contacts');
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    const exitFromApp = () => {
      BackHandler.exitApp();
    };

    const alertNetInfo = () => {
      Alert.alert(localization.networkTitle, localization.networkMessage, [
        {
          text: localization.dismiss,
          onPress: () => {
            exitFromApp();
          },
        },
      ]);
    };

    const getNetworkInfo = async () => {
      try {
        const network = await NetInfo.fetch();
        if (network.isConnected) {
          isUserLogged();
        } else {
          alertNetInfo();
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    getNetworkInfo();
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, [navigation]);

  const keyboardDidShow = () => {
    setIsFooterHidden(true);
  };

  const keyboardDidHide = () => {
    setIsFooterHidden(false);
  };

  const validateEmail = (value) => {
    const match = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    return match.test(value);
  };

  const inputChangedHandler = (id, text) => {
    switch (id) {
      case 'email':
        if (validateEmail(text)) {
          setEmail({
            email: text.toLowerCase(),
            isValidEmail: true,
            stateEmail: 'valid',
          });
        } else {
          setEmail({
            email: text.toLowerCase(),
            isValidEmail: false,
            stateEmail: 'invalid',
          });
        }
        break;
      case 'password':
        if (text.trim().length >= 5) {
          setPassword({
            password: text,
            isValidPassword: true,
            statePassword: 'valid',
          });
        } else {
          setPassword({
            password: text,
            isValidPassword: false,
            statePassword: 'invalid',
          });
        }
        break;
      default:
        break;
    }
  };

  const signInUser = async () => {
    let signInDetails = {
      auth: {
        email: email.email,
        password: password.password,
      },
    };
    try {
      const response = await authentication(signInDetails);
      if (
        response.authentication.isAuthenticated &&
        response.authentication.token !== null
      ) {
        localStorage.setStringValue('token', response.authentication.token);
        localStorage.setStringValue('language', englishLanguage.englishLabel);
        navigation.navigate('Contacts');
      } else {
        setIsSignInErrorDisplayed(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const setLanguage = async (isEnglish) => {
    if (isEnglish) {
      localStorage.setStringValue('language', 'EN');
      localization.setLanguage('en');
      setEnglishLanguage({
        englishLabel: 'EN',
        isEnglishLabel: true,
      });
    } else {
      localStorage.setStringValue('language', 'ES');
      localization.setLanguage('es');
      setEnglishLanguage({
        englishLabel: 'ES',
        isEnglishLabel: false,
      });
    }
  };

  const signInTopContent = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Image
          source={require('../../assets/img/epIcon.png')}
          style={styles.imageIcon}
        />
      </View>
      <View style={styles.headerContent}>
        <Image
          source={require('../../assets/img/epIconText.png')}
          style={styles.imageIconTitle}
        />
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.errorText}>
          {isSignInErrorDisplayed ? localization.loginError : null}
        </Text>
      </View>
    </View>
  );

  const iconItems = {
    empty: <Text />,
    valid: <IconEJ color="green" size={20} iconName="check-circle-o" />,
    invalid: <IconEJ color="red" size={20} iconName="times-circle-o" />,
  };

  const signInForm = () => (
    <Form>
      <Item
        success={
          email.isValidEmail && email.stateEmail === 'valid' ? true : false
        }
        error={
          !email.isValidEmail && email.stateEmail === 'invalid' ? true : false
        }>
        <Input
          placeholder={localization.email}
          onChangeText={(text) => inputChangedHandler('email', text)}
        />
        {email.isValidEmail
          ? iconItems[email.stateEmail]
          : iconItems[email.stateEmail]}
      </Item>
      <Item
        success={
          password.isValidPassword && password.statePassword === 'valid'
            ? true
            : false
        }
        error={
          !password.isValidPassword && password.statePassword === 'invalid'
            ? true
            : false
        }>
        <Input
          placeholder={localization.password}
          secureTextEntry={true}
          onChangeText={(text) => inputChangedHandler('password', text)}
        />
        {password.isValidPassword
          ? iconItems[password.statePassword]
          : iconItems[password.statePassword]}
      </Item>
      <ButtonEJ title={localization.signInButton} onPress={signInUser} />
    </Form>
  );

  const signInFooterContent = () => (
    <View style={styles.footerContent}>
      <Text style={styles.footerText}>{englishLanguage.englishLabel}</Text>
      <Switch
        onValueChange={setLanguage}
        value={englishLanguage.isEnglishLabel}
      />
      <Text style={styles.footerText}>{localization.signInFooterLabel} </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.footerTextButton}>
          {localization.signInButtonFooterLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container style={styles.container}>
      <Content scrollEnabled={false}>
        {signInTopContent()}
        {signInForm()}
      </Content>
      {!isFooterHidden && <Footer>{signInFooterContent()}</Footer>}
    </Container>
  );
};

export default SignIn;
