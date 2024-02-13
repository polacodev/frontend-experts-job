import React from 'react';
import { View } from 'native-base';

import localization from '../../localization/localization';
import IconEJ from '../IconEJ/IconEJ';
import TextEJ from '../TextEJ/TextEJ';

import color from '../../config/color/color';
import styles from './EmptyDataEJ.style';

const EmptyDataEJ = () => (
  <View style={styles.emptyDataContainer}>
    <IconEJ color={color.gray} size={40} iconName="archive" />
    <TextEJ type="note">{localization.noData}</TextEJ>
  </View>
);

export default EmptyDataEJ;
