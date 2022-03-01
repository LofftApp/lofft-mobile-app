import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import ActiveCard from './ActiveCard';

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(props.userCards);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        {/* {props.userCards.map((el,index) => <ActiveCardX key={index} type={el.type}/>)} */}
        <ActiveCard type={item.type} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}></TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default MyCarousel;
