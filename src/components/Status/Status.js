import * as React from 'react';
import { Alert } from 'react-native';
import _ from 'lodash';

import { getPersonalInformation } from '../../graphql/user/user.api';
import { createNewRate } from '../../graphql/rate/rate.api';
import {
  getAllStatus,
  deleteStatusById,
} from '../../graphql/status/status.api';
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
import CustomDialogEJ from '../../core-components/DialogEJ/CustomDialogEJ';

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
      isModalVisible: false,
      userOnModal: {},
      originalData: [],
      searchText: '',
      isLoading: true,
      rating: 0,
    };
  }

  componentDidMount = async () => {
    await this.isUserLogged();
  };

  componentDidUpdate = () => {
    this.querySubscription = client
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

  componentWillUnmount = () => {
    this.querySubscription.unsubscribe();
  };

  updateStatusList = ({ data }) => {
    const { statusList } = this.state;
    if (
      _.findIndex(statusList, { _id: data.notificationAddedById._id }) === -1
    ) {
      //New Status inserted
      this.setState((prevState) => ({
        statusList: _.uniqBy(
          [...prevState.statusList, data.notificationAddedById],
          '_id',
        ),
      }));
    } else {
      //Status updated
      const newStatusList = statusList.map((status) => {
        return status._id === data.notificationAddedById._id
          ? data.notificationAddedById
          : status;
      });
      this.setState({ statusList: newStatusList });
    }
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
    const email = value.email || '';
    const workarea = value.workarea || '';
    const knowledge = value.knowledge || '';
    Alert.alert(
      value.name,
      `${localization.email}: ${email}\n${localization.workarea}: ${workarea}\n${localization.KnowledgeContact}: ${knowledge}`,
      [
        {
          text: localization.dismiss,
        },
        {
          text: localization.delete,
          onPress: () => this.deleteStatus(value._id),
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

  deleteStatus = async (id) => {
    const newStatusList = this.state.statusList.filter(
      (item) => item._id !== id,
    );
    try {
      await deleteStatusById(id);
      this.setState({
        statusList: newStatusList,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  createRate = async (value) => {
    const { rating } = this.state;
    const newRate = {
      _id: value.createdBy,
      ratedBy: value.user_id,
      name: value.name,
      rate: rating,
    };
    try {
      const res = await createNewRate(newRate);
      this.setState({ rating: 0 });
    } catch (error) {
      console.log(error.message);
    }
  };

  onCloseRateModal = (value) => {
    this.setState({ isModalVisible: value, rating: 0 });
  };

  onChangeRatingStars = (value) => {
    this.setState({ rating: value });
  };

  onRateUser = (value) => {
    const { userOnModal } = this.state;
    this.deleteStatus(userOnModal._id);
    this.createRate(userOnModal);
    this.setState({ isModalVisible: value });
  };

  onPressStarIcon = (value) => {
    this.setState({ isModalVisible: true, userOnModal: value });
  };

  render() {
    const {
      statusList,
      searchText,
      isLoading,
      isModalVisible,
      userOnModal,
      rating,
    } = this.state;
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
          rightIcon="star"
          onPressItem={this.onPressItem}
          onPressRightIcon={this.onPressStarIcon}
        />
        {isModalVisible && (
          <CustomDialogEJ
            isModalVisible={isModalVisible}
            user={userOnModal}
            onCloseRateModal={this.onCloseRateModal}
            onChangeRatingStars={this.onChangeRatingStars}
            onRateUser={this.onRateUser}
            rating={rating}
          />
        )}
      </>
    );
  }
}
