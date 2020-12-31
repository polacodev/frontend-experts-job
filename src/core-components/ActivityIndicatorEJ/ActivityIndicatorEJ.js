import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './ActivityIndicatorEJ.style';

const ActivityIndicatorEJ = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size="large" color="#00796b" />
    </View>
  );
};

export default ActivityIndicatorEJ;
