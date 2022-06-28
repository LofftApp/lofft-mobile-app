/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';

import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {Slider} from '@miblanchard/react-native-slider';

// Helpers
import {
  dateFormatter,
  timeFormatter,
} from '../../components/helperFunctions/dateFormatter';

// Components 🪢
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';

// Stylesheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {navigationRef as navigation} from './../../RootNavigation';
import HeaderBarFlatHunt from '../../components/bannersAndBars/HeaderBarFlatHunt';
import TagIcon from '../../components/iconsAndContainers/TagIcon';
import TagIconDeux from '../../components/iconsAndContainers/TagIconDeux';
import FadeInView from '../../components/animations/FadeInView';

// Image
import imagesrc from './../../assets/beans.png';

const FlatHuntScreen = () => {
  const [image, setImage]: any = useState('');
  const [city, setCity]: any = useState('');
  const [date, setDate]: any = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [people, setPeople] = useState('');
  const [peopleTags, setPeopleTags] = useState([]);
  const cities = [
    {city: 'XBerg', id: 1, active: false},
    {
      city: 'Pberg',
      id: 2,
      active: false,
    },
    {city: 'Wedding', id: 3, active: false},
    {city: 'Moabit', id: 4, active: false},
    {city: 'Mitte', id: 5, active: false},
    {city: 'Fhain', id: 6, active: false},
  ];

  const peopleValues = [
    {value: 'LGBTQ+', id: 1, active: false, count: 0},
    {
      value: 'Feminism',
      id: 2,
      active: false,
    },
    {value: 'Rastafari', id: 3, active: false, count: 0},
    {value: 'Vegans', id: 4, active: false, count: 0},
    {value: 'Muslims', id: 5, active: false, count: 0},
    {value: 'Jews', id: 6, active: false, count: 0},
    {value: 'Refugees', id: 6, active: false, count: 0},
    {value: 'Green Peace', id: 6, active: false, count: 0},
  ];

  const [tags, setTags] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const cityTrack = input => {
    const tagsArray = [];

    if (input === 'Berlin' || input === 'berlin') {
      cities.forEach(el => tagsArray.push({city: el.city, id: el.id}));
    }
    setTags(tagsArray);
    setCity(input);
  };

  console.log(tags)

  const peopleTrack = (input, id) => {
    const tagsArray = [];

    peopleValues.forEach(el => {
      if (el.value === input) {
        tagsArray.push(el);
        el.count = el.count + 1;
      } else {
        null;
      }
    });

    const filteredArray = tagsArray.map(el => {
      if (el.id === id) {
        return { ...el, active: !el.active };
      } else {
        return el;
      }
    });

    setPeopleTags(filteredArray);
    console.log(input);

  };

  const pickCity = id => {
    const filteredArray = tags.map(el => {
      if (el.id === id) {
        return {...el, active: !el.active};
      } else {
        return el;
      }
    });

    setTags(filteredArray);
  };

  const pickPeople = id => {
    const filteredArray = peopleTags.map(el => {
      if (el.id === id) {
        return {...el, active: !el.active};
      } else {
        return el;
      }
    });


  };

  const randomColor = () => {
    const colours = ['Blue', 'Tomato', 'Gold', 'Mint'];
    return Math.floor(Math.random() * colours.length);
  };

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBarFlatHunt onPress={() => navigation.goBack()} />

          <View style={styles.container}>
            <ImageBackground
              source={imagesrc}
              style={{
                width: '100%',
                height: '100%',
                zIndex: 0,
              }}>
              <Text style={[fontStyles.headerMedium, {marginTop: 10}]}>
                Looking for a new{' '}
                <Text style={{color: color.Lavendar[80]}}>Home</Text>?
              </Text>
              <View style={styles.questionsContainer}>
                <Text style={fontStyles.buttonTextMedium}>Where? 👀</Text>
                <View>
                  <TextInput
                    style={[styles.questionInputStyle, fontStyles.bodyMedium]}
                    keyboardType="default"
                    placeholder="Berlin for instance?"
                    autoCapitalize="none"
                    value={city}
                    onChangeText={text => cityTrack(text)}
                  />
                </View>
              </View>

              <View style={styles.tagsContainer}>
                {tags.map((el, index) => (
                  <TagIcon
                    marginTop={10}
                    key={index + 1}
                    text={el.city}
                    userColor=""
                    id={el.id}
                    pickCity={pickCity}
                    activeColor={el.active ? '#B8A7FC' : '#F1EDFF'}
                  />
                ))}
              </View>

              <Text style={[{marginTop: 20}, fontStyles.buttonTextMedium]}>
                When? ⏱
              </Text>
              <View style={styles.dateContainer}>
                <TouchableOpacity onPress={() => setDateOpen(true)}>
                  <Text
                    style={[
                      fontStyles.bodyMedium,
                      date ? null : styles.textNoValue,
                    ]}>
                    {date ? dateFormatter(date) : 'Choose date'}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  minimumDate={new Date()}
                  mode="date"
                  open={dateOpen}
                  date={date ? date : new Date()}
                  onConfirm={date => {
                    setDateOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => setDateOpen(false)}
                />
              </View>

              <View>
                <View style={styles.sliderHeader}>
                  <Text style={[fontStyles.buttonTextMedium]}>
                    What is your budget? 💵
                  </Text>
                  <Text
                    style={[
                      fontStyles.buttonTextMedium,
                      {color: color.Mint[100]},
                    ]}>
                    {Math.floor(priceRange)} €
                  </Text>
                </View>

                <View style={styles.sliderContainer}>
                  <Slider
                    value={priceRange}
                    onValueChange={value => setPriceRange(value)}
                    maximumValue={2500}
                    minimumValue={0}
                    thumbTintColor="#B8A7FC"
                    minimumTrackTintColor="#B8A7FC"
                    maximumTrackTintColor="#F1EDFF"
                    trackStyle={styles.sliderStyle}
                    thumbStyle={styles.thumbSlider}
                  />
                </View>
              </View>

              <View style={styles.questionsContainer}>
                <Text style={fontStyles.buttonTextMedium}>
                  Who are your people? 🦄
                </Text>
                <View>
                  <TextInput
                    style={[styles.questionInputStyle, fontStyles.bodyMedium]}
                    keyboardType="default"
                    placeholder="LGBQT+, Feminism, Vegans etc"
                    autoCapitalize="none"
                    value={people}
                    onChangeText={text => setPeople(text)}
                  />
                </View>
              </View>
              <View style={styles.tagsContainer}>
                {peopleTags.map((el, index) => (
                  <TagIconDeux
                    marginTop={10}
                    key={index + 1}
                    text={el.value}
                    userColor=""
                    id={el.id}
                    people={people}
                    peopleTrack={peopleTrack}
                    activeColor={el.active ? '#B8A7FC' : '#F1EDFF'}

                  />
                ))}
              </View>
              <CoreButton
                value="Search"
                style={styles.button}
                onPress={() =>
                  navigation.navigate('FlatMap') }/>
            </ImageBackground>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  questionsContainer: {
    marginTop: 20,
    zIndex: 5000,
  },
  questionInputStyle: {
    padding: 15,
    backgroundColor: '#F1EDFE',
    color: color.Black[80],
    borderRadius: 12,
    zIndex: 5000,
  },
  tagsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  dateContainer: {
    backgroundColor: '#F1EDFE',
    padding: 15,
    borderRadius: 12,
    zIndex: 1000,
  },
  textNoValue: {
    color: '#B9B8C4',
  },
  sliderHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  sliderContainer: {
    marginTop: 30,
  },
  sliderStyle: {
    height: 20,
    borderRadius: 12,
  },
  thumbSlider: {
    height: 50,
    width: 15,
  },
  button: {
    marginTop: 40,
  },
});

export default FlatHuntScreen;
