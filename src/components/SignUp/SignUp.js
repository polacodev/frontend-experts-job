import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
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
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Keyboard,
} from 'react-native';
import localization from '../../localization/localization';
import { createUser } from '../../graphql/user/user.api';
import authentication from '../../graphql/authentication/authentication.api';
import * as localStorage from '../../config/local-storage/localStorage';

import IconEJ from '../../core-components/IconEJ/IconEJ';
import ButtonEJ from '../../core-components/ButtonEJ/ButtonEJ';
import CustomTextEJ from '../../core-components/CustomTextEJ/CustomTextEJ';

import styles from './SignUp.style';
import color from '../../config/color/color';

const SignUp = ({ navigation }) => {
  const [englishLanguage, setEnglishLanguage] = useState({
    englishLabel: 'EN',
    isEnglishLabel: true,
  });
  const [isSignUpErrorDisplayed, setIsSignUpErrorDisplayed] = useState(false);
  const [userAlreadyExist, setUserAlreadyExist] = useState(false);

  const [isFooterHidden, setIsFooterHidden] = useState(false);
  const [userName, setUserName] = useState({
    name: '',
    isValidUserName: false,
    stateUserName: 'empty',
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
  const [cellphone, setCellphone] = useState({
    cellphone: '',
    isValidCellphone: false,
    stateCellphone: 'empty',
  });
  const [workarea, setWorkarea] = useState({
    workarea: '',
    isValidWorkarea: false,
    stateWorkarea: 'empty',
  });

  useEffect(() => {
    let unmounted = false;
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

    if (!unmounted) {
      getNetworkInfo();
    }
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
      unmounted = true;
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

  const validateName = (value) => {
    const match = /^[a-zA-Z0-9]+$/;
    return (
      match.test(value) && value.trim().length >= 5 && value.trim().length <= 20
    );
  };

  const inputChangedHandler = (id, text) => {
    switch (id) {
      case 'name':
        if (validateName(text)) {
          setUserName({
            name: text,
            isValidUserName: true,
            stateUserName: 'valid',
          });
        } else {
          setUserName({
            name: text,
            isValidUserName: false,
            stateUserName: 'invalid',
          });
        }
        break;
      case 'email':
        if (validateEmail(text)) {
          setEmail({
            email: text,
            isValidEmail: true,
            stateEmail: 'valid',
          });
        } else {
          setEmail({
            email: text,
            isValidEmail: false,
            stateEmail: 'invalid',
          });
        }
        break;
      case 'password':
        if (text.trim().length >= 5 && text.trim().length <= 20) {
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
      case 'cellphone':
        if (text.trim().length === 8) {
          setCellphone({
            cellphone: text,
            isValidCellphone: true,
            stateCellphone: 'valid',
          });
        } else {
          setCellphone({
            cellphone: text,
            isValidCellphone: false,
            stateCellphone: 'invalid',
          });
        }
        break;
      case 'workarea':
        if (text.trim().length >= 5 && text.trim().length <= 20) {
          setWorkarea({
            workarea: text.toUpperCase(),
            isValidWorkarea: true,
            stateWorkarea: 'valid',
          });
        } else {
          setWorkarea({
            workarea: text,
            isValidWorkarea: false,
            stateWorkarea: 'invalid',
          });
        }
        break;
      default:
        break;
    }
  };

  const isValidForm = () => {
    let res = false;
    if (
      userName.isValidUserName &&
      email.isValidEmail &&
      password.isValidPassword &&
      cellphone.isValidCellphone &&
      workarea.isValidWorkarea
    ) {
      res = true;
    }
    return res;
  };

  const addNewUser = async () => {
    if (isValidForm()) {
      let signUpDetails = {
        auth: {
          email: email.email,
          password: password.password,
        },
      };

      const user = {
        name: userName.name,
        email: email.email,
        password: password.password,
        cellphone: cellphone.cellphone,
        workarea: workarea.workarea,
        status: false,
        description: '',
        knowledge: '',
      };

      try {
        const response = await createUser(user);
        // await insertNewUserList(newUser);
        // await this.addNewContact(newUser.id);
        // await this.addNewNotification(newUser.id);
        // Actions.FooterTabComponent();
        if (response.addUser !== null) {
          const auth = await authentication(signUpDetails);
          if (
            auth.authentication.isAuthenticated &&
            auth.authentication.token !== null
          ) {
            localStorage.setStringValue('token', auth.authentication.token);
            localStorage.setStringValue(
              'language',
              englishLanguage.englishLabel,
            );
            navigation.navigate('Contacts');
          }
          navigation.navigate('Contacts');
        } else {
          setUserAlreadyExist(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setIsSignUpErrorDisplayed(true);
    }
  };

  const signUpTopContent = () => (
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
          {isSignUpErrorDisplayed ? localization.signUpError : null}
          {userAlreadyExist ? localization.userAlreadyExistMessage : null}
        </Text>
      </View>
    </View>
  );

  const iconItems = {
    empty: <Text />,
    valid: <IconEJ color="green" size={20} iconName="check-circle-o" />,
    invalid: <IconEJ color="red" size={20} iconName="times-circle-o" />,
  };

  const signUpForm = () => (
    <Form>
      <Item
        success={
          userName.isValidUserName && userName.stateUserName === 'valid'
            ? true
            : false
        }
        error={
          !userName.isValidUserName && userName.stateUserName === 'invalid'
            ? true
            : false
        }>
        <Input
          placeholder={localization.name}
          onChangeText={(text) => inputChangedHandler('name', text)}
        />
        {userName.isValidUserName
          ? iconItems[userName.stateUserName]
          : iconItems[userName.stateUserName]}
      </Item>
      {!userName.isValidUserName && userName.stateUserName === 'invalid' ? (
        <View style={styles.formStyles}>
          <CustomTextEJ type="normal" size={9} color={color.error}>
            {localization.validationName}
          </CustomTextEJ>
        </View>
      ) : null}

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
      {!email.isValidEmail && email.stateEmail === 'invalid' ? (
        <View style={styles.formStyles}>
          <CustomTextEJ type="normal" size={9} color={color.error}>
            {localization.validationName}
          </CustomTextEJ>
        </View>
      ) : null}
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
      {!password.isValidPassword && password.statePassword === 'invalid' ? (
        <View style={styles.formStyles}>
          <CustomTextEJ type="normal" size={9} color={color.error}>
            {localization.validationPassword}
          </CustomTextEJ>
        </View>
      ) : null}
      <Item
        success={
          cellphone.isValidCellphone && cellphone.stateCellphone === 'valid'
            ? true
            : false
        }
        error={
          !cellphone.isValidCellphone && cellphone.stateCellphone === 'invalid'
            ? true
            : false
        }>
        <Input
          placeholder={localization.cellphone}
          keyboardType="numeric"
          onChangeText={(text) => inputChangedHandler('cellphone', text)}
        />
        {cellphone.isValidCellphone
          ? iconItems[cellphone.stateCellphone]
          : iconItems[cellphone.stateCellphone]}
      </Item>
      {!cellphone.isValidCellphone && cellphone.stateCellphone === 'invalid' ? (
        <View style={styles.formStyles}>
          <CustomTextEJ type="normal" size={9} color={color.error}>
            {localization.validationCellphone}
          </CustomTextEJ>
        </View>
      ) : null}
      <Item
        success={
          workarea.isValidWorkarea && workarea.stateWorkarea === 'valid'
            ? true
            : false
        }
        error={
          !workarea.isValidWorkarea && workarea.stateWorkarea === 'invalid'
            ? true
            : false
        }>
        <Input
          placeholder={localization.workarea}
          onChangeText={(text) => inputChangedHandler('workarea', text)}
        />
        {workarea.isValidWorkarea
          ? iconItems[workarea.stateWorkarea]
          : iconItems[workarea.stateWorkarea]}
      </Item>
      {!workarea.isValidWorkarea && workarea.stateWorkarea === 'invalid' ? (
        <View style={styles.formStyles}>
          <CustomTextEJ type="normal" size={9} color={color.error}>
            {localization.validationArea}
          </CustomTextEJ>
        </View>
      ) : null}
      <ButtonEJ
        title={localization.signUpButton}
        onPress={() => addNewUser()}
      />
    </Form>
  );

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

  const signUpFooterContent = () => (
    <View style={styles.footerContent}>
      <Text style={styles.footerText}>{englishLanguage.englishLabel}</Text>
      <Switch
        onValueChange={setLanguage}
        value={englishLanguage.isEnglishLabel}
      />
      <Text style={styles.footerText}>{localization.signUpFooterLabel} </Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.footerTextButton}>
          {localization.signUpButtonFooterLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container style={styles.container}>
      <Content scrollEnabled={false}>
        {signUpTopContent()}
        {signUpForm()}
      </Content>
      {!isFooterHidden && <Footer>{signUpFooterContent()}</Footer>}
    </Container>
  );
};

export default SignUp;
