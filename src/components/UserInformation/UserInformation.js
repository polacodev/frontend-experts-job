import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import RadioButton from 'react-native-radio-button';
import { View, Alert, BackHandler, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Form,
  Textarea,
  Input,
  Label,
  Item,
} from 'native-base';

import ButtonEJ from '../../core-components/ButtonEJ/ButtonEJ';
import localization from '../../localization/localization';
import * as localStorage from '../../config/local-storage/localStorage';

import CustomTextEJ from '../../core-components/CustomTextEJ/CustomTextEJ';
import {
  getPersonalInformation,
  updateUser,
} from '../../graphql/user/user.api';

import color from '../../config/color/color';
import styles from './UserInformation.style';

const UserInformation = () => {
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    cellphone: '',
    workarea: '',
    status: undefined,
    description: '',
    knowledge: '',
  });

  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [token, setToken] = useState(undefined);
  const [radio, setRadio] = useState({
    available: undefined,
    unavailable: undefined,
  });

  useEffect(() => {
    const isUserLogged = async () => {
      try {
        const storedSignInDetails = await localStorage.getStringValue('token');
        if (storedSignInDetails !== null) {
          setToken(storedSignInDetails);
          await userInformation(storedSignInDetails);
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

    getNetworkInfo();
  }, []);

  const userInformation = async (value) => {
    try {
      const { getUserByString } = await getPersonalInformation({
        token: value,
      });
      setUser({
        _id: getUserByString._id,
        name: getUserByString.name,
        email: getUserByString.email,
        cellphone: getUserByString.cellphone,
        workarea: getUserByString.workarea,
        status: getUserByString.status,
        description: getUserByString.description,
        knowledge: getUserByString.knowledge,
      });
      setRadio({
        available: getUserByString.status ? true : false,
        unavailable: !getUserByString.status ? true : false,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const inputChange = (id, text) => {
    setIsDisabledButton(false);
    switch (id) {
      case 'cellphone':
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          cellphone: text,
          workarea: user.workarea,
          status: user.status,
          description: user.description,
          knowledge: user.knowledge,
        });
        break;
      case 'email':
        setUser({
          _id: user._id,
          name: user.name,
          email: text,
          cellphone: user.cellphone,
          workarea: user.workarea,
          status: user.status,
          description: user.description,
          knowledge: user.knowledge,
        });
        break;
      case 'workarea':
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          cellphone: user.cellphone,
          workarea: text,
          status: user.status,
          description: user.description,
          knowledge: user.knowledge,
        });
        break;
      case 'description':
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          cellphone: user.cellphone,
          workarea: user.workarea,
          status: user.status,
          description: text,
          knowledge: user.knowledge,
        });
        break;
      case 'knowledge':
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          cellphone: user.cellphone,
          workarea: user.workarea,
          status: user.status,
          description: user.description,
          knowledge: text,
        });
        break;
      default:
        break;
    }
  };

  const radioButtonHandle = async (value) => {
    setRadio({
      available: value === 'available' ? true : false,
      unavailable: value === 'unavailable' ? true : false,
    });
    setIsDisabledButton(false);
  };

  const cancelConfiguration = async () => {
    await userInformation(token);
    setIsDisabledButton(true);
  };

  const saveConfiguration = async () => {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      cellphone: user.cellphone,
      workarea: user.workarea,
      status: radio.available,
      description: user.description,
      knowledge: user.knowledge,
    };
    try {
      await updateUser(user._id, userToUpdate);
      setIsDisabledButton(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const userTopInformation = () => (
    <View>
      <View style={styles.userTopInformationTitle}>
        <CustomTextEJ size={17} color={color.text}>
          {user.name.toLocaleUpperCase()}
        </CustomTextEJ>
      </View>
      <View style={styles.userTopInfoTextStatus}>
        <RadioButton
          innerColor={radio.available ? color.icon : color.gray}
          outerColor={radio.available ? color.icon : color.gray}
          animation={'bounceIn'}
          size={12}
          isSelected={radio.available ? true : false}
          onPress={() => radioButtonHandle('available')}
        />
        <RadioButton
          innerColor={radio.unavailable ? color.icon : color.gray}
          outerColor={radio.unavailable ? color.icon : color.gray}
          animation={'bounceIn'}
          size={12}
          isSelected={radio.unavailable ? true : false}
          onPress={() => radioButtonHandle('unavailable')}
        />
      </View>
      <View style={styles.userTopInfoRadioStatus}>
        <TouchableOpacity onPress={() => radioButtonHandle('available')}>
          <CustomTextEJ
            size={13}
            color={radio.available ? color.text : color.gray}>
            {localization.availableText}
          </CustomTextEJ>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => radioButtonHandle('unavailable')}>
          <CustomTextEJ
            size={13}
            color={radio.unavailable ? color.text : color.gray}>
            {localization.unavailableText}
          </CustomTextEJ>
        </TouchableOpacity>
      </View>
    </View>
  );

  const userInformationForm = () => (
    <View>
      <Form>
        <Item inlineLabel style={styles.userTopInformationForm}>
          <Label>{localization.userEmail}:</Label>
          <Input
            style={styles.inputEdit}
            editable={false}
            defaultValue={user.email}
            onChangeText={(text) => inputChange('email', text)}
          />
        </Item>
        <Item inlineLabel style={styles.userTopInformationForm}>
          <Label>{localization.cellphone}:</Label>
          <Input
            style={styles.inputEdit}
            defaultValue={user.cellphone}
            onChangeText={(text) => inputChange('cellphone', text)}
          />
        </Item>
        <Item inlineLabel style={styles.userTopInformationForm}>
          <Label>{localization.userWorkarea}:</Label>
          <Input
            style={styles.inputEdit}
            defaultValue={user.workarea}
            onChangeText={(text) => inputChange('workarea', text)}
          />
        </Item>
        <Item inlineLabel style={styles.userTopInformationForm}>
          <Label>{localization.userDescription}:</Label>
          <Input
            style={styles.inputEdit}
            defaultValue={user.description}
            onChangeText={(text) => inputChange('description', text)}
          />
        </Item>
        <Textarea
          rowSpan={4}
          defaultValue={user.knowledge}
          placeholder={localization.userKnowledge}
          onChangeText={(text) => inputChange('knowledge', text)}
          style={styles.userTextArea}
        />
      </Form>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <ButtonEJ
            disable={isDisabledButton}
            title={localization.userCancel}
            onPress={() => cancelConfiguration()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonEJ
            disable={isDisabledButton}
            title={localization.userSave}
            onPress={() => saveConfiguration()}
          />
        </View>
      </View>
    </View>
  );

  return (
    <Container>
      <Content>
        {userTopInformation()}
        {userInformationForm()}
      </Content>
    </Container>
  );
};

export default UserInformation;
