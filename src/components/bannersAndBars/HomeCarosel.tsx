import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const {width} = Dimensions.get('screen');

const DATA = [
  {
    colorRef: 'Mint',
    imageUri: require('./../../assets/handsHome.png'),
    headerText: 'Meet your people',
    text: "We match you with the flatmates that suit you best. You choose what's important to you.",
  },
  {
    colorRef: 'Gold',
    imageUri: require('./../../assets/moneyHome.png'),
    headerText: 'No more 🤯 because of 💶',
    text: 'Lofft makes it easy to split bills and manage shared household finances.',
  },
  {
    colorRef: 'Lavendar',
    imageUri: require('./../../assets/eyesHome.png'),
    headerText: 'Discover great flatshares',
    text: "No matter if you're looking for a flat or offering up your own space. Lofft makes the process pleasant and straight forward",
  },
  {
    colorRef: 'Blue',
    imageUri: require('./../../assets/peopleHome.png'),
    headerText: 'Find the Lofft of your life',
    text: 'The new way to manage shared flats and accommodation - together',
  },
];

const HomeCarosel = ({activeScreen}: any) => {
  const [cardData] = useState(DATA);

  const onViewRef = React.useRef((viewableItems: any) => {
    activeScreen(Number(viewableItems.viewableItems[0].key));
  });

  return (
    <FlatList
      data={cardData}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={{itemVisiblePercentThreshold: 50}}
      renderItem={({item}: any) => {
        return (
          <View
            style={{
              width,
              height: 750,
            }}>
            <Image
              source={item.imageUri}
              style={{
                width: '100%',
                height: 485,
                resizeMode: 'cover',
              }}
            />
            <Text style={[fontStyles.headerSmall, styles.headerText]}>
              {item.headerText}
            </Text>
            <Text style={[fontStyles.bodyMedium, styles.subTexStyle]}>
              {item.text}
            </Text>
          </View>
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    paddingVertical: 10,
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
  },
  subTexStyle: {
    color: color.Black[50],
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default HomeCarosel;
