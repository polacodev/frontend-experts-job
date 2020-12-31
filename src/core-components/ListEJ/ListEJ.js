import React from 'react';
import { Container, Content, List, View } from 'native-base';

import ListItemEJ from './ListItemEJ';

const ListEJ = ({
  data = [],
  rightIcon = '',
  leftIcon = '',
  onPressItem = () => ({}),
  onPressRightIcon = () => ({}),
}) => {
  return (
    <Container>
      <Content>
        <List>
          {data.map((user, index) => (
            <View key={index}>
              <ListItemEJ
                user={user}
                rightIcon={rightIcon}
                leftIcon={leftIcon}
                onPressItem={onPressItem}
                onPressRightIcon={onPressRightIcon}
              />
            </View>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default ListEJ;
