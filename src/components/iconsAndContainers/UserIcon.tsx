import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import color from './../../assets/defaultColorPallet.json';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

const UserIcon = ({
  image = '',
  style = {},
  onPress = {},
  disabled = false,
  icon = 'person-outline',
  iconSize = null,
  lofftSpace = false,
}: any) => {
  return (
    <View style={[styles.imageContainer, style]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        {image ? (
          <FastImage
            source={{uri: image}}
            style={styles.userImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={[styles.userImage, styles.noImageIcon, style]}>
            <Icon
              name={icon}
              size={iconSize ? iconSize : 45}
              color={color.Lavendar[80]}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 78,
    height: 78,
    borderWidth: 3,
    borderColor: color.Lavendar[100],
    backgroundColor: color.Lavendar[10],
    borderRadius: 75,
  },
  noImageIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserIcon;
