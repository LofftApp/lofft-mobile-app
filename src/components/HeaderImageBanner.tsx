import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import shapesBackground from './../assets/backgroundShapes/mint.png';
import Icon from 'react-native-vector-icons/Ionicons';

// stylesheets
import color from '../assets/defaultColorPallet.json';
import {fontStyles} from '../StyleSheets/FontStyleSheet';

const HeaderImageBanner = ({
  nameParameters,
  subInfo,
  editState,
  updateButton,
}) => {
  const [admin] = useState(true);
  // const [headerName, setHeaderName] = useState(name);
  // const [headerSubInfo, setHeaderSubInfo] = useState(subInfo);
  // const [lofftId] = useState(route.params.lofft);
  return (
    <ImageBackground
      source={shapesBackground}
      style={styles.imageBannerBackground}>
      <View style={styles.headerUpload}>
        <Text>🏳️‍🌈 🌱</Text>
        {admin ? (
          <Icon name="image-outline" size={25} color={color.Black[30]} />
        ) : null}
      </View>
      <View style={styles.headerBanner}>
        {/* Title Text and address container */}
        <View style={styles.title}>
          <View>
            {editState.edit ? (
              <TextInput
                value={nameParameters.name}
                style={[fontStyles.headerMedium, styles.inputField]}
                onChangeText={nameParameters.setNameValue}
              />
            ) : (
              <Text style={fontStyles.headerMedium}>{nameParameters.name}</Text>
            )}
            {/* Address Section */}
            {editState.edit ? (
              <View style={styles.addField}>
                <TextInput
                  style={[fontStyles.bodySmall, styles.inputField]}
                  value={subInfo.value}
                  onChangeText={subInfo.setSubInfoValue}
                  placeholder="Address line 1"
                />
              </View>
            ) : subInfo.value ? (
              <View style={styles.addressBar}>
                <Text style={[fontStyles.bodySmall, styles.address]}>
                  {subInfo.value}
                </Text>
              </View>
            ) : null}
          </View>
          {/* Toggle Edit mode if admin */}
          {admin ? (
            editState.edit ? (
              <TouchableOpacity onPress={updateButton}>
                <Icon
                  name="checkmark-outline"
                  size={25}
                  color={color.Black[30]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={editState.setEditValue}>
                <Icon
                  name="settings-outline"
                  size={25}
                  color={color.Black[30]}
                />
              </TouchableOpacity>
            )
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBannerBackground: {
    backgroundColor: color.Mint[10],
    paddingVertical: 10,
    marginTop: 25,
  },
  headerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  headerUpload: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    width: '100%',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 10,
    backgroundColor: color.Lavendar[10],
    marginTop: 0,
  },
  addField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  address: {},
  addressBar: {
    paddingLeft: 10,
  },
});

export default HeaderImageBanner;
