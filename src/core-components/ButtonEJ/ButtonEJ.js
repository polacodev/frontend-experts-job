import React from 'react';
import { Container, Content, Button, Text } from 'native-base';

import styles from './ButtonEJ.style';

const ButtonEJ = ({ disable = false, title = '', onPress = () => ({}) }) => {
  return (
    <Container style={styles(disable).container}>
      <Content>
        <Button
          style={styles(disable).button}
          disabled={disable}
          onPress={onPress}>
          <Text>{title}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ButtonEJ;
