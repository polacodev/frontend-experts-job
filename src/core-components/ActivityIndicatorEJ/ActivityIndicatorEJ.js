import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import localization from '../../localization/localization';
import TextEJ from '../TextEJ/TextEJ';
import styles from './ActivityIndicatorEJ.style';

const ActivityIndicatorEJ = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size="large" color="#00796b" />
      <TextEJ type="note">{localization.loading}</TextEJ>
    </View>
  );
};

export default ActivityIndicatorEJ;
