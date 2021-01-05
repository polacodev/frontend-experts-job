import React from 'react';
import { View } from 'native-base';

import IconEJ from '../IconEJ/IconEJ';
import TextEJ from '../TextEJ/TextEJ';

import color from '../../config/color/color';
import styles from './EmptyDataEJ.style';

const EmptyDataEJ = () => (
  <View style={styles.emptyDataContainer}>
    <IconEJ color={color.gray} size={40} iconName="archive" />
    <TextEJ type="note">No Data</TextEJ>
  </View>
);

export default EmptyDataEJ;
