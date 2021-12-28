import React from 'react';
import { Modal, Text, View } from 'react-native';

import ButtonEJ from '../../core-components/ButtonEJ/ButtonEJ';
import IconEJ from '../IconEJ/IconEJ';
import StarEJ from '../StarEJ/StarEJ';

import { stars } from '../../utils/utils';
import localization from '../../localization/localization';
import color from '../../config/color/color';
import styles from './CustomDialogEJ.style';

const CustomDialogEJ = ({
  isModalVisible = false,
  user = {},
  onCloseRateModal = () => ({}),
  onChangeRatingStars = () => ({}),
  onRateUser = () => ({}),
  rating = 0,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <Text style={styles.textStyle}>
                  {localization.rate} {user.name}!
                </Text>
              </View>
              <Text style={styles.modalHeaderCloseText}>
                <IconEJ
                  onPressIcon={() => onCloseRateModal(false)}
                  iconName="times"
                  size={20}
                  color={color.dark_gray}
                />
              </Text>
            </View>
            <View style={styles.modalIcons}>
              {stars.map((star, index) => (
                <View key={star.id} style={styles.modalStar}>
                  <StarEJ
                    filled={index < rating ? true : false}
                    size={35}
                    color={color.star}
                    onChangeRatingStars={() => onChangeRatingStars(index + 1)}
                  />
                </View>
              ))}
            </View>
            <View style={{ height: 60, marginTop: 20, marginBottom: -15 }}>
              <ButtonEJ
                disable={false}
                title={localization.rateLabel}
                onPress={() => onRateUser(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDialogEJ;
