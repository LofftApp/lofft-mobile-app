import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

// Components
import CustomBackButton from '../buttons/CustomBackButton';
import EditPageButton from '../buttons/EditPageButton';
import EditableTextField from '../inputFields/EditableTextFields';
import FastImage from 'react-native-fast-image';

// Images
import blueBackground from '../../assets/backgroundShapes/blue.png';

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
  modalShow,
  imageURI,
  name,
  newName,
  updateUserName,
}) => {
  return (
    <ImageBackground source={blueBackground} style={styles.headerBackground}>
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
        <TouchableOpacity disabled={edit ? false : true} onPress={modalShow}>
          <FastImage
            source={{uri: imageURI}}
            style={styles.userImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <View style={styles.nameAndEditContainer}>
          {name || edit ? (
            <EditableTextField
              placeholder="Name"
              edit={edit}
              value={name}
              newValue={newName}
              fontStyle={fontStyles.headerSmall}
              multiline={true}
              onChangeText={updateUserName}
            />
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
    borderWidth: 4,
    borderColor: color.Blue[100],
    borderRadius: 75,
  },
  nameAndEditContainer: {
    alignItems: 'flex-end',
  },
});

export default ProfileHeader;
