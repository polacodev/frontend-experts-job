import * as React from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';

import { getPersonalInformation } from '../../graphql/user/user.api';
import { getAllStatus } from '../../graphql/status/status.api';
import {
  // SUBSCRIPTION_NOTIFICATION_ADDED,
  SUBSCRIPTION_NOTIFICATION_ADDED_BY_ID,
} from '../../graphql/status/status.graphql';

import ActivityIndicatorEJ from '../../core-components/ActivityIndicatorEJ/ActivityIndicatorEJ';
import EmptyDataEJ from '../../core-components/EmptyData/EmptyDataEJ';
import ListEJ from '../../core-components/ListEJ/ListEJ';
import HeaderEJ from '../../core-components/HeaderEJ/HeaderEJ';

import * as localStorage from '../../config/local-storage/localStorage';
import localization from '../../localization/localization';
import * as utils from '../../utils/utils';
import client from '../../service/setup';

export default class Status extends React.Component {
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
      statusList: [],
      originalData: [],
      searchText: '',
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    await this.isUserLogged();
  };

  componentDidUpdate = () => {
    client
      .subscribe({
        query: SUBSCRIPTION_NOTIFICATION_ADDED_BY_ID,
        variables: {
          _id: this.state.user._id,
        },
      })
      .subscribe({
        next: (data) => {
          this.updateStatusList(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  updateStatusList = ({ data }) => {
    this.setState((prevState) => ({
      statusList: _.uniqBy(
        [...prevState.statusList, data.notificationAddedById],
        '_id',
      ),
    }));
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
      await this.getStatus(getUserByString._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  getStatus = async (id) => {
    const { data, loading } = await getAllStatus(id);
    this.setState({
      statusList: data.getNotificationsByUserId,
      originalData: data.getNotificationsByUserId,
      isLoading: loading,
    });
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
    if (text.length === 0) {
      this.setState({ statusList: this.state.originalData });
    } else {
      const response = utils.fuse(text, this.state.originalData);
      const res = response.map((element) => element.item);
      this.setState({ statusList: res });
    }
    this.setState({ searchText: text });
  };

  render() {
    const { statusList, searchText, isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicatorEJ />;
    }

    if (!statusList.length) {
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
          data={statusList}
          leftIcon="user-o"
          rightIcon="dot-circle-o"
          onPressItem={this.onPressItem}
          onPressRightIcon={this.onPressItem}
        />
      </>
    );
  }
}
