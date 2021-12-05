import * as React from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';

import {
  getAllUsers,
  getPersonalInformation,
} from '../../graphql/user/user.api';
import {
  getAllContacts,
  createNewContact,
} from '../../graphql/contact/contact.api';
import { SUBSCRIPTION_USER_ADDED } from '../../graphql/user/user.graphql';

import ActivityIndicatorEJ from '../../core-components/ActivityIndicatorEJ/ActivityIndicatorEJ';
import EmptyDataEJ from '../../core-components/EmptyData/EmptyDataEJ';
import ListEJ from '../../core-components/ListEJ/ListEJ';
import HeaderEJ from '../../core-components/HeaderEJ/HeaderEJ';

import * as localStorage from '../../config/local-storage/localStorage';
import localization from '../../localization/localization';
import * as utils from '../../utils/utils';
import client from '../../service/setup';

export default class Search extends React.Component {
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
      users: [],
      contacts: [],
      currentUser: {},
      isLoading: true,
      search: undefined,
      searchText: '',
    };
  }

  componentDidMount = async () => {
    await this.isUserLogged();
    await this.getUsers();
  };

  componentDidUpdate = () => {
    this.querySubscription = client
      .subscribe({
        query: SUBSCRIPTION_USER_ADDED,
      })
      .subscribe({
        next: (data) => {
          this.updateUserList(data);
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
        this.setState({ currentUser: storedSignInDetails });
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

  getContacts = async (_id) => {
    try {
      const { data, loading } = await getAllContacts(_id);
      this.setState({ contacts: data.getContactsByUserId });
      this.setState({ isLoading: loading });
    } catch (e) {
      console.log(e.message);
    }
  };

  updateUserList = ({ data }) => {
    this.setState((prevState) => ({
      users: _.uniqBy([...prevState.users, data.userAdded], '_id'),
    }));
  };

  getUsers = async () => {
    const { search, currentUser, contacts } = this.state;
    try {
      const { data, loading } = await getAllUsers(search, currentUser);
      const usersFiltered = _.differenceBy(
        utils.buildArray(data.getUsers),
        utils.buildArray(contacts),
        'email',
      );
      this.setState({
        users: usersFiltered,
        isLoading: loading,
        searchText: '',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  onPressAddNewUserIcon = async (value) => {
    const { users, user } = this.state;
    const newList = users.filter((item) => item._id !== value._id);
    try {
      const contact = {
        _id: value._id,
        createdBy: user._id,
        name: value.name,
        email: value.email,
        cellphone: value.cellphone,
        workarea: value.workarea,
        status: value.status,
        description: value.description,
        knowledge: value.knowledge,
      };
      await createNewContact(contact);
      this.setState({ users: newList });
    } catch (error) {
      console.log(error.message);
    }
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

  handlerSearch = async (text) => {
    const { users } = this.state;

    if (text.length === 0) {
      await this.getUsers();
    } else {
      this.setState({
        users: utils.fuse(text, users).map((element) => element.item),
        searchText: text,
      });
    }
  };

  render() {
    const { isLoading, users, searchText } = this.state;
    if (isLoading) {
      return <ActivityIndicatorEJ />;
    }
    if (users.length === 0 && searchText.length === 0) {
      return <EmptyDataEJ />;
    }
    return (
      <>
        <HeaderEJ searchText={searchText} handlerSearch={this.handlerSearch} />
        <ListEJ
          data={users}
          leftIcon="user-o"
          rightIcon="user-plus"
          onPressItem={this.onPressItem}
          onPressRightIcon={this.onPressAddNewUserIcon}
        />
      </>
    );
  }
}
