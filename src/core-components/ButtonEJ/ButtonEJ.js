import React from 'react';
import { Container, Content, Button, Text } from 'native-base';

import styles from './ButtonEJ.style';

const ButtonEJ = ({ title = '', onPress = () => ({}) }) => {
  return (
    <Container style={styles.container}>
      <Content>
        <Button style={styles.button} onPress={onPress}>
          <Text>{title}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default ButtonEJ;
