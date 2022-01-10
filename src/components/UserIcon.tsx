import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import color from './../assets/defaultColorPallet.json';

const UserIcon = ({image, userIconStyle, userImageStyle}: any) => {
  return (
    <View style={[styles.backgroundCurcle, userIconStyle]}>
      <Image source={image} style={[styles.userIcon, userImageStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: color.Lavendar[100],
    resizeMode: 'contain',
  },
  backgroundCurcle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 50,
    backgroundColor: color.Lavendar[10],
  },
});

export default UserIcon;
