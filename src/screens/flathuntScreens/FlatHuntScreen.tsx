import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

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
import FadeInView from '../../components/animations/FadeInView';

const FlatHuntScreen = () => {
  const [image, setImage]: any = useState('');
  const [city, setCity]: any = useState('');
  const [date, setDate]: any = useState('');
  const [dateOpen, setDateOpen] = useState(false);
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

    if (input === 'Berlin') {
      cities.forEach(el => tagsArray.push({city: el.city, id: el.id}));
    }
    setTags(tagsArray);
    setCity(input);
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
    console.log(tags);
  };

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <HeaderBarFlatHunt onPress={() => navigation.goBack()} />
          <View style={styles.container}>
            <Text style={[fontStyles.headerMedium, {marginTop: 10}]}>
              Looking for a new{' '}
              <Text style={{color: color.Lavendar[80]}}>Home</Text>?
            </Text>

            <View style={styles.questionsContainer}>
              <Text style={fontStyles.buttonTextMedium}>Where? 👀</Text>
              <View style={styles.questionInputContainer}>
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

            <Text style={[{ marginTop: 20},fontStyles.buttonTextMedium]}>When? ⏱</Text>
            <View style={styles.dateContainer}>
              <TouchableOpacity
                style={styles.inputStyle}
                onPress={() => setDateOpen(true)}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  questionsContainer: {
    marginTop: 20,
  },
  questionInputStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: color.Lavendar[10],
    color: color.Black[80],
    borderRadius: 12,
  },
  tagsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateContainer: {
    backgroundColor: color.Lavendar[10],
    padding: 20,
    borderRadius: 12,
  },
  textNoValue: {
    color: '#B9B8C4',
  }
});

export default FlatHuntScreen;
