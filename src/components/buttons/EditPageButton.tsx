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
          <TouchableOpacity
            onPress={onPressSave}
            style={[styles.editButton, {backgroundColor: color.Mint[100]}]}>
            <Icon name="checkmark-outline" size={23} color={color.White[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressCancel}
            style={[styles.editButton, {backgroundColor: color.Tomato[100]}]}>
            <Icon name="close-outline" size={23} color={color.White[100]} />
          </TouchableOpacity>
        </View>
      ) : admin ? (
        <TouchableOpacity
          onPress={onPressEdit}
          style={[styles.editButton, {backgroundColor: color.Blue[100]}]}>
          <Icon name="pencil-sharp" size={23} color={color.White[100]} />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default EditPageButton;
