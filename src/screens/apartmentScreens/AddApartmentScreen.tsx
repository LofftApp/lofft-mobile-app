import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import {navigationRef as navigation} from './../../RootNavigation';
import values from '../../data/hobbiesAndValues.json';

// StyleSheets
import color from '@Assets/lofftColorPallet.json';
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Components
import {CoreButton} from '@Buttons/CoreButton';
import CustomBackButton from '@Buttons/CustomBackButton';
import HobbiesAndValues from '@Components/HobbiesAndValues';

// Firebase
import {createLofft} from '../../api/firebase/fireStoreActions';

// Context
import {Context as UserDetails} from '../../context/UserDetailsContext';

const AddApartmentScreen = () => {
  const {state} = useContext(UserDetails);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const selectHobby = key => {
    if (!selectedHobbies.includes(key)) {
      setSelectedHobbies(selectedHobbies => [...selectedHobbies, key]);
    } else {
      const result = selectedHobbies.filter(el => {
        return el !== key;
      });
      setSelectedHobbies(result);
    }
  };
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <Pressable onPressIn={Keyboard.dismiss} style={{flex: 1}}>
        <CustomBackButton
          title="Add your Lofft"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={fontStyles.buttonTextMedium}>Lofft Name</Text>
            <TextInput
              style={[fontStyles.bodyMedium, styles.formInput]}
              value={name}
              onChangeText={c => setName(c)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={fontStyles.buttonTextMedium}>Description</Text>
            <TextInput
              style={[fontStyles.bodyMedium, styles.formInput]}
              multiline
              value={description}
              onChangeText={c => setDescription(c)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={fontStyles.buttonTextMedium}>Values and Hobbies</Text>
            <HobbiesAndValues
              values={values}
              selectHobby={k => selectHobby(k)}
              selectedHobbies={selectedHobbies}
              edit={true}
            />
          </View>
        </View>
        <CoreButton
          value="Add Lofft"
          onPress={() => {
            let userHobbies = values;
            selectedHobbies.forEach(hobby => {
              userHobbies[hobby].active = true;
            });
            createLofft({
              name,
              description,
              userID: state.uid,
              hobbiesAndValues: userHobbies,
            });
            navigation.navigate('Costs');
          }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: '70%',
    marginVertical: 25,
    alignItems: 'center',
  },
  formInput: {
    width: '100%',
    minHeight: 55,
    borderBottomWidth: 2,
    borderBottomColor: color.Black[30],
  },
  fieldContainer: {
    width: '100%',
    marginTop: 15,
  },
});

export default AddApartmentScreen;
