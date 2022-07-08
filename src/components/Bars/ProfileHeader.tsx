import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

// Components
import CustomBackButton from '../Buttons/CustomBackButton';
import EditPageButton from '../Buttons/EditPageButton';
import EditableTextField from '../InputFields/EditableTextFields';
import FastImage from 'react-native-fast-image';
import UserIcon from '../Icons/UserIcon';

// Images
import blueBackground from '../../assets/backgroundShapes/blue.png';
import greenBackground from '../../assets/backgroundShapes/mint.png';

// Styles
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

const ProfileHeader = ({
  navigation,
  edit,
  admin,
  onSave,
  onEdit,
  onCancel,
  modalShow = null,
  imageURI = null,
  name = '',
  newName = '',
  updateProfileName = null,
  address = '',
  newAddress = '',
  updateLofftAddress = null,
  lofftProfile = false,
  emoji = null,
  newEmoji = null,
}) => {
  return (
    <ImageBackground
      source={lofftProfile ? greenBackground : blueBackground}
      style={[
        styles.headerBackground,
        lofftProfile ? styles.green : styles.blue,
      ]}>
      <View style={styles.topBarWithEdit}>
        {edit ? null : (
          <CustomBackButton
            style={styles.backButton}
            neutral={true}
            onPress={() => navigation.goBack()}
          />
        )}

        <EditPageButton
          edit={edit}
          admin={admin}
          onPressSave={onSave}
          onPressCancel={onCancel}
          onPressEdit={onEdit}
        />
      </View>
      <View style={styles.imageHeaderContainer}>
        {lofftProfile ? (
          <>
            <TouchableOpacity
              disabled={edit ? false : true}
              onPress={modalShow}>
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>{edit ? newEmoji : emoji}</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <UserIcon
            image={imageURI}
            style={styles.userImage}
            iconColor="Blue"
            onPress={modalShow}
            disabled={!edit}
          />
        )}

        <View style={styles.nameAndEditContainer}>
          {name || edit ? (
            <EditableTextField
              placeholder="Name"
              edit={edit}
              value={name}
              newValue={newName}
              fontStyle={fontStyles.headerSmall}
              multiline={true}
              onChangeText={updateProfileName}
            />
          ) : null}
          {lofftProfile ? (
            address || edit ? (
              <EditableTextField
                placeholder="Address"
                edit={edit}
                value={address}
                newValue={newAddress}
                fontStyle={fontStyles.bodySmall}
                textStyle={styles.addressInput}
                inputFieldStyle={styles.addressInput}
                onChangeText={updateLofftAddress}
              />
            ) : null
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topBarWithEdit: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'baseline',
  },
  headerBackground: {
    width: '100%',
    height: 200,
  },
  green: {
    backgroundColor: color.Mint[10],
  },
  blue: {
    backgroundColor: color.Blue[10],
  },
  backButton: {
    marginHorizontal: 15,
    marginTop: 35,
  },
  imageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  userImage: {
    width: 78,
    height: 78,
    borderColor: color.Blue[100],
  },
  emojiContainer: {
    width: 65,
    height: 65,
    backgroundColor: color.White[100],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 35,
  },
  nameAndEditContainer: {
    alignItems: 'flex-end',
  },
  addressInput: {
    marginTop: 5,
  },
});

export default ProfileHeader;
