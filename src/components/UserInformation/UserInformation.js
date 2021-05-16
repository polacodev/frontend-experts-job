import React from 'react';
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
import { getAllContacts } from '../../graphql/contact/contact.api';
import { createNewStatus } from '../../graphql/status/status.api';

import color from '../../config/color/color';
import styles from './UserInformation.style';

export default class UserInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: '',
        name: '',
        email: '',
        cellphone: '',
        workarea: '',
        status: undefined,
        description: '',
        knowledge: '',
      },
      contacts: [],
      // originalData: [],
      // searchText: '',
      isLoading: true,
      isDisabledButton: true,
      token: undefined,
      radio: {
        available: undefined,
        unavailable: undefined,
      },
    };
  }

  componentDidMount = () => {
    this.getNetworkInfo();
  };

  isUserLogged = async () => {
    try {
      const storedSignInDetails = await localStorage.getStringValue('token');
      if (storedSignInDetails !== null) {
        this.setState({ token: storedSignInDetails });
        await this.userInformation(storedSignInDetails);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  exitFromApp = () => {
    BackHandler.exitApp();
  };

  alertNetInfo = () => {
    Alert.alert(localization.networkTitle, localization.networkMessage, [
      {
        text: localization.dismiss,
        onPress: () => {
          this.exitFromApp();
        },
      },
    ]);
  };

  getNetworkInfo = async () => {
    try {
      const network = await NetInfo.fetch();
      if (network.isConnected) {
        this.isUserLogged();
      } else {
        this.alertNetInfo();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  userInformation = async (value) => {
    try {
      const { getUserByString } = await getPersonalInformation({
        token: value,
      });
      this.setState({
        user: {
          _id: getUserByString._id,
          name: getUserByString.name,
          email: getUserByString.email,
          cellphone: getUserByString.cellphone,
          workarea: getUserByString.workarea,
          status: getUserByString.status,
          description: getUserByString.description,
          knowledge: getUserByString.knowledge,
        },
        radio: {
          available: getUserByString.status ? true : false,
          unavailable: !getUserByString.status ? true : false,
        },
      });
      await this.getContacts(getUserByString._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  getContacts = async (id) => {
    try {
      const { data, loading } = await getAllContacts(id);
      this.setState({
        contacts: data.getContactsByUserId,
        isLoading: loading,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  inputChange = (id, text) => {
    const { user } = this.state;
    this.setState({ isDisabledButton: false });
    switch (id) {
      case 'cellphone':
        this.setState({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cellphone: text,
            workarea: user.workarea,
            status: user.status,
            description: user.description,
            knowledge: user.knowledge,
          },
        });
        break;
      case 'email':
        this.setState({
          user: {
            _id: user._id,
            name: user.name,
            email: text,
            cellphone: user.cellphone,
            workarea: user.workarea,
            status: user.status,
            description: user.description,
            knowledge: user.knowledge,
          },
        });
        break;
      case 'workarea':
        this.setState({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cellphone: user.cellphone,
            workarea: text,
            status: user.status,
            description: user.description,
            knowledge: user.knowledge,
          },
        });
        break;
      case 'description':
        this.setState({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cellphone: user.cellphone,
            workarea: user.workarea,
            status: user.status,
            description: text,
            knowledge: user.knowledge,
          },
        });
        break;
      case 'knowledge':
        this.setState({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cellphone: user.cellphone,
            workarea: user.workarea,
            status: user.status,
            description: user.description,
            knowledge: text,
          },
        });
        break;
      default:
        break;
    }
  };

  radioButtonHandle = (value) => {
    this.setState({
      radio: {
        available: value === 'available' ? true : false,
        unavailable: value === 'unavailable' ? true : false,
      },
      isDisabledButton: false,
    });
  };

  cancelConfiguration = async () => {
    await this.userInformation(this.state.token);
    this.setState({ isDisabledButton: true });
  };

  saveConfiguration = async () => {
    const { user, radio, contacts } = this.state;
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
      this.setState({ isDisabledButton: true });
    } catch (error) {
      console.log(error.message);
    }

    contacts.forEach(async (item) => {
      const notification = {
        _id: item.user_id,
        name: user.name,
        email: user.email,
        message: 'lol',
        createdBy: user._id,
        cellphone: user.cellphone,
        workarea: user.workarea,
        knowledge: user.knowledge,
      };
      try {
        if (radio.available) {
          await createNewStatus(notification);
        }
      } catch (e) {
        console.log(e.message);
      }
    });
  };

  render() {
    const { user, radio, isDisabledButton } = this.state;
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
            onPress={() => this.radioButtonHandle('available')}
          />
          <RadioButton
            innerColor={radio.unavailable ? color.icon : color.gray}
            outerColor={radio.unavailable ? color.icon : color.gray}
            animation={'bounceIn'}
            size={12}
            isSelected={radio.unavailable ? true : false}
            onPress={() => this.radioButtonHandle('unavailable')}
          />
        </View>
        <View style={styles.userTopInfoRadioStatus}>
          <TouchableOpacity onPress={() => this.radioButtonHandle('available')}>
            <CustomTextEJ
              size={13}
              color={radio.available ? color.text : color.gray}>
              {localization.availableText}
            </CustomTextEJ>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.radioButtonHandle('unavailable')}>
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
              onChangeText={(text) => this.inputChange('email', text)}
            />
          </Item>
          <Item inlineLabel style={styles.userTopInformationForm}>
            <Label>{localization.cellphone}:</Label>
            <Input
              style={styles.inputEdit}
              defaultValue={user.cellphone}
              onChangeText={(text) => this.inputChange('cellphone', text)}
            />
          </Item>
          <Item inlineLabel style={styles.userTopInformationForm}>
            <Label>{localization.userWorkarea}:</Label>
            <Input
              style={styles.inputEdit}
              defaultValue={user.workarea}
              onChangeText={(text) => this.inputChange('workarea', text)}
            />
          </Item>
          <Item inlineLabel style={styles.userTopInformationForm}>
            <Label>{localization.userDescription}:</Label>
            <Input
              style={styles.inputEdit}
              defaultValue={user.description}
              onChangeText={(text) => this.inputChange('description', text)}
            />
          </Item>
          <Textarea
            rowSpan={4}
            defaultValue={user.knowledge}
            placeholder={localization.userKnowledge}
            onChangeText={(text) => this.inputChange('knowledge', text)}
            style={styles.userTextArea}
          />
        </Form>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <ButtonEJ
              disable={isDisabledButton}
              title={localization.userCancel}
              onPress={() => this.cancelConfiguration()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonEJ
              disable={isDisabledButton}
              title={localization.userSave}
              onPress={() => this.saveConfiguration()}
            />
          </View>
        </View>
      </View>
    );

    return (
      <Container>
        {/* {console.log('status=>', this.state.user.status)} */}
        <Content>
          {userTopInformation()}
          {userInformationForm()}
        </Content>
      </Container>
    );
  }
}
