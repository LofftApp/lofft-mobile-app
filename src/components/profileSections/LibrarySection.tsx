import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

// Components
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

// StyleSheets
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// Firestore 🔥
import {deleteLibraryImage} from '../../api/firebase/firebaseStorage';

const LibrarySection = ({library, onPress, edit}) => {
  const DATA = library;
  const Item = src => {
    return (
      <>
        <FastImage
          source={{uri: src.item, priority: FastImage.priority.normal}}
          style={styles.imageSquare}
          resizeMode={FastImage.resizeMode.cover}
        />
        {edit ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              deleteLibraryImage(src.item);
            }}>
            <Icon name="close-outline" size={15} color={color.White[100]} />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  return (
    <View style={styles.sectionContainer}>
      <Text style={fontStyles.buttonTextMedium}>Photo Library</Text>
      <View style={styles.libraryContainer}>
        {edit && DATA.length < 5 ? (
          <TouchableOpacity
            style={[styles.imageSquare, styles.addImageButton]}
            onPress={onPress}>
            <Icon name="add-outline" size={60} color={color.Black[30]} />
          </TouchableOpacity>
        ) : null}
        {DATA.length > 0 ? (
          <FlatList
            data={DATA}
            renderItem={Item}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        ) : edit ? null : (
          <Text style={[fontStyles.bodySmall, styles.noPhotos]}>
            There are currently no Photos 😢
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 15,
  },
  libraryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  addImageButton: {
    backgroundColor: color.Black[10],
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  imageSquare: {
    borderRadius: 8,
    width: 95,
    height: 95,
    marginVertical: 5,
    marginHorizontal: 2.5,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.Tomato[100],
    width: 15,
    height: 15,
    borderRadius: 15,
    marginLeft: -15,
    marginTop: 3,
  },
  noPhotos: {
    marginTop: 5,
  },
});

export default LibrarySection;
