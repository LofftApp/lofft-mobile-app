import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

// Assets 🖼
import * as color from '@Assets/lofftColorPallet.json';

const UserIcon = ({
  image = '',
  style = {},
  onPress = {},
  disabled = false,
  icon = 'person-outline',
  iconSize = null,
  iconColor = 'Lavendar',
}: any) => {
  const colorImage = iconColor => {
    switch (iconColor) {
      case 'Blue':
        return color.Blue[80];
      case 'Mint':
        return color.Mint[80];
      case 'Gold':
        return color.Gold[80];
      case 'Blue':
        return color.Blue[80];
      case 'Tomato':
        return color.Tomato[80];
      default:
        return color.Lavendar[80];
    }
  };
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
              color={colorImage(iconColor)}
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
