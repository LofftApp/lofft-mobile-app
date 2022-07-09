import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/lofftColorPallet.json';

const ImageFriendContainer = ({id, name, imgUrl, selectFriends, selected}) => {
  return (
    <TouchableOpacity onPress={() => selectFriends(id)}>
      <View style={styles.imageContainer}>
        <Image
          style={selected ? styles.selectedFriendFaceImage : styles.faceImage}
          source={imgUrl}
        />
        <Text style={fontStyles.buttonTextSmall}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    padding: 4,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  faceImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginBottom: 10,
  },
  selectedFriendFaceImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: color.Lavendar[50],
  },
});

export default ImageFriendContainer;
