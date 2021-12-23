import React from 'react';
import { Container, Content, List, View } from 'native-base';
import { RefreshControl } from 'react-native';

import ListItemEJ from './ListItemEJ';

const ListEJ = ({
  data = [],
  rightIcon = '',
  leftIcon = '',
  onPressItem = () => ({}),
  onPressRightIcon = () => ({}),
  onRefresh = () => ({}),
  onRatingValues = false,
  refreshing = false,
}) => {
  return (
    <Container>
      <Content
        style={{ backgroundColor: '#f5f5f5' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <List>
          {data.map((user, index) => (
            <View key={index}>
              <ListItemEJ
                user={user}
                rightIcon={rightIcon}
                leftIcon={leftIcon}
                onPressItem={onPressItem}
                onPressRightIcon={onPressRightIcon}
                onRatingValues={onRatingValues}
              />
            </View>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default ListEJ;
