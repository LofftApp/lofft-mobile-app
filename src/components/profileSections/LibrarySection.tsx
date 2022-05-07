import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

// Components
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

// StyleSheets
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import color from './../../assets/defaultColorPallet.json';

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
        <FlatList
          data={DATA}
          renderItem={Item}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
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
    paddingVertical: 15,
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
    marginHorizontal: 2.5,
  },
});

export default LibrarySection;
