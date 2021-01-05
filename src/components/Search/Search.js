import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { SUBSCRIPTION_USER_ADDED } from '../../graphql/user/user.graphql';
import { getAllUsers, deleteUser } from '../../graphql/user/user.api';
import ActivityIndicatorEJ from '../../core-components/ActivityIndicatorEJ/ActivityIndicatorEJ';
import EmptyDataEJ from '../../core-components/EmptyData/EmptyDataEJ';
import ListEJ from '../../core-components/ListEJ/ListEJ';
import localization from '../../localization/localization';
import client from '../../service/setup';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateUserList = ({ data }) => {
    setUsers((currentUsers) => {
      return [...currentUsers, data.userAdded];
    });
  };

  useEffect(() => {
    getUsers();

    client
      .subscribe({
        query: SUBSCRIPTION_USER_ADDED,
      })
      .subscribe({
        next: (data) => {
          updateUserList(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }, []);

  const getUsers = async () => {
    try {
      const { data, loading } = await getAllUsers();
      setUsers(data.getUsers);
      setIsLoading(loading);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPressItem = (user) => {
    const knowledge = user.email || '';
    Alert.alert(
      user.name,
      `${localization.KnowledgeContact}: ${knowledge}`,
      [
        {
          text: localization.dismiss,
        },
      ],
      { cancelable: false },
    );
  };

  const onPressDeleteIcon = async (user) => {
    try {
      await deleteUser(user._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <ActivityIndicatorEJ />;
  }

  const emptyRender = () => <EmptyDataEJ />;

  const listRender = (data) => (
    <ListEJ
      data={users}
      leftIcon="user-o"
      rightIcon="user-plus"
      onPressItem={onPressItem}
      onPressRightIcon={onPressDeleteIcon}
    />
  );

  return users ? listRender(users) : emptyRender();
};

export default Search;
