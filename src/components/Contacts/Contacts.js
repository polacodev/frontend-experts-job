import * as React from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';
import OneSignal from 'react-native-onesignal';

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
      isExternalUserIdPushed: false,
      isLoading: true,
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    await this.isUserLogged();
  };

  componentDidUpdate = () => {
    this.querySubscription = client
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

  componentWillUnmount = () => {
    this.querySubscription.unsubscribe();
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
      this.setExternalUserId(getUserByString._id);
      await this.getContacts(getUserByString._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  setExternalUserId = (userId) => {
    OneSignal.setExternalUserId(userId, (results) => {
      // console.log('Results of setting external user id');
      // console.log(results);
      // Push can be expected in almost every situation with a success status, but
      // as a pre-caution its good to verify it exists
      if (results.push && results.push.success) {
        // console.log('Results of setting external user id push status:');
        // console.log(results.push.success);
        this.setState({ isExternalUserIdPushed: results.push.success });
      }
      // Verify the email is set or check that the results have an email success status
      // if (results.email && results.email.success) {
      //   console.log('Results of setting external user id email status:');
      //   console.log(results.email.success);
      // }
    });
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

  onRefresh = () => {
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    this.setState({ refreshing: true });
    this.getContacts(this.state.user._id);

    wait(2000).then(() => this.setState({ refreshing: false }));
  };

  render() {
    const { contacts, searchText, isLoading, refreshing } = this.state;
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
          onRefresh={this.onRefresh}
          refreshing={refreshing}
        />
      </>
    );
  }
}
