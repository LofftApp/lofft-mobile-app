import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

// stylesheets
import color from '../../assets/lofftColorPallet.json';

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPressSave}
            style={[styles.editButton, {backgroundColor: color.Mint[80]}]}>
            <Icon name="checkmark-outline" size={32} color={color.White[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressCancel}
            style={[styles.editButton, {backgroundColor: color.Tomato[80]}]}>
            <Icon name="close-outline" size={32} color={color.White[100]} />
          </TouchableOpacity>
        </View>
      ) : admin ? (
        <TouchableOpacity
          onPress={onPressEdit}
          style={[styles.editButton, {backgroundColor: color.Blue[80]}]}>
          <Icon name="pencil-sharp" size={25} color={color.White[100]} />
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
    marginHorizontal: 15,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    // paddingHorizontal: 5,
    marginTop: 45,
  },
});

export default EditPageButton;
