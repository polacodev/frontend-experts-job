import * as React from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';

import { getPersonalInformation } from '../../graphql/user/user.api';
import {
  getAllContacts,
  deleteContactById,
} from '../../graphql/contact/contact.api';
import { SUBSCRIPTION_CONTACT_ADDED } from '../../graphql/contact/contact.graphql';

import ActivityIndicatorEJ from '../../core-components/ActivityIndicatorEJ/ActivityIndicatorEJ';
import EmptyDataEJ from '../../core-components/EmptyData/EmptyDataEJ';
import ListEJ from '../../core-components/ListEJ/ListEJ';
import HeaderEJ from '../../core-components/HeaderEJ/HeaderEJ';

import * as localStorage from '../../config/local-storage/localStorage';
import localization from '../../localization/localization';
import * as utils from '../../utils/utils';
import client from '../../service/setup';

export default class Contacts extends React.Component {
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
      originalData: [],
      searchText: '',
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.isUserLogged();
  };

  componentDidUpdate = () => {
    client
      .subscribe({
        query: SUBSCRIPTION_CONTACT_ADDED,
        variables: {
          _id: this.state.user._id,
        },
      })
      .subscribe({
        next: (data) => {
          this.updateContactList(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  isUserLogged = async () => {
    try {
      const storedSignInDetails = await localStorage.getStringValue('token');
      if (storedSignInDetails !== null) {
        await this.userInformation(storedSignInDetails);
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
        originalData: data.getContactsByUserId,
        isLoading: loading,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  updateContactList = ({ data }) => {
    this.setState((prevState) => ({
      contacts: _.uniqBy([...prevState.contacts, data.contactAddedById], '_id'),
    }));
  };

  onPressItem = (value) => {
    const knowledge = value.knowledge || '';
    Alert.alert(
      value.name,
      `${localization.KnowledgeContact}: ${knowledge}`,
      [
        {
          text: localization.dismiss,
        },
      ],
      { cancelable: false },
    );
  };

  onPressDeleteIcon = async (contact) => {
    const newContactList = this.state.contacts.filter(
      (item) => item._id !== contact._id,
    );
    try {
      await deleteContactById(contact._id);
      this.setState({
        contacts: newContactList,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handlerSearch = async (text) => {
    if (text.length === 0) {
      this.setState({ contacts: this.state.originalData });
    } else {
      const response = utils.fuse(text, this.state.originalData);
      const res = response.map((element) => element.item);
      this.setState({ contacts: res });
    }
    this.setState({ searchText: text });
  };

  render() {
    const { contacts, searchText, isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicatorEJ />;
    }

    if (!contacts.length) {
      return (
        <>
          <HeaderEJ
            searchText={searchText}
            handlerSearch={this.handlerSearch}
          />
          <EmptyDataEJ />
        </>
      );
    }

    return (
      <>
        <HeaderEJ searchText={searchText} handlerSearch={this.handlerSearch} />
        <ListEJ
          data={contacts}
          leftIcon="user-o"
          rightIcon="trash"
          onPressItem={this.onPressItem}
          onPressRightIcon={this.onPressDeleteIcon}
        />
      </>
    );
  }
}
