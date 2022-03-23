import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

// stylesheets
import color from '../../assets/defaultColorPallet.json';

import Icon from 'react-native-vector-icons/Ionicons';

const EditPageButton = ({
  edit = false,
  admin = false,
  onPressSave = null,
  onPressCancel = null,
  onPressEdit = null,
}) => {
  return (
    <>
      {edit && admin ? (
        <View>
          <TouchableOpacity onPress={onPressSave}>
            <Icon name="checkmark-outline" size={30} color={color.Black[30]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCancel}>
            <Icon name="close-outline" size={30} color={color.Black[30]} />
          </TouchableOpacity>
        </View>
      ) : admin ? (
        <TouchableOpacity onPress={onPressEdit}>
          <Icon name="settings-outline" size={30} color={color.Black[30]} />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default EditPageButton;
