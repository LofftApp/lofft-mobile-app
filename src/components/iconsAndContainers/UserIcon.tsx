import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import color from './../../assets/defaultColorPallet.json';

import Icon from 'react-native-vector-icons/Ionicons';

const UserIcon = ({
  image = '',
  userIconStyle = {},
  userImageContainerStyle = {},
  userImageStyle = {},
  onPress = {},
  disabled = false,
  lofftSpace = false,
}: any) => {
  return (
    <TouchableOpacity
      style={[styles.backgroundCurcle, userIconStyle]}
      onPress={onPress}
      disabled={disabled}>
      <View style={[styles.imageContainer, userImageContainerStyle]}>
        {image === '' ? (
          <Icon
            name={lofftSpace ? 'home-outline' : 'person-outline'}
            size={30}
            color={color.Lavendar[100]}
          />
        ) : (
          <Image source={image} style={[styles.userIcon, userImageStyle]} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 40,
    overflow: 'hidden',
    resizeMode: 'contain',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCurcle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: color.Lavendar[10],
    borderWidth: 2,
    borderColor: color.Lavendar[100],
  },
});

export default UserIcon;
