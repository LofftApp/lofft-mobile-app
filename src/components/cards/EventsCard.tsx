import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

// Components 🪢
import {CoreButton} from '../../components/buttons/CoreButton';
import HalfBackgroundImage from './../../assets/banner-background-half.png';
import TagIcon from '../iconsAndContainers/TagIcon';

// Styles
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const EventsCard = ({title, description, fromTime, toTime}) => {
  return (
    <View>
      <ImageBackground source={HalfBackgroundImage} style={styles.eventCard}>
        <View style={styles.contentContainer}>
          <View style={styles.headerBar}>
            <Text style={fontStyles.buttonTextMedium}>{title}</Text>
            <TagIcon text="invited" userColor="Blue" />
          </View>
          <Text>
            {fromTime} - {toTime}
          </Text>
          <View>
            <Text>{description}</Text>
          </View>
          <View style={styles.buttonBar}>
            <CoreButton
              value="Attend"
              style={styles.buttonStyle}
              textStyle={[fontStyles.buttonTextSmall, styles.buttonFontStyle]}
            />
            <CoreButton
              value="Reject"
              style={styles.buttonStyle}
              textStyle={[fontStyles.buttonTextSmall, styles.buttonFontStyle]}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
  eventCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.White[0],
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 75,
  },
  contentContainer: {
    padding: 10,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonStyle: {
    width: 75,
    height: 30,
    marginHorizontal: 5,
  },
  buttonFontStyle: {
    color: color.White[100],
  },
});

export default EventsCard;
