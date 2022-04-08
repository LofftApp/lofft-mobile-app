import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TextInput} from 'react-native';
import {navigationRef as navigation} from './../../RootNavigation';
import values from '../../data/hobbiesAndValues.json';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';

// Components
import {CoreButton} from '../../components/buttons/CoreButton';
import CustomBackButton from '../../components/buttons/CustomBackButton';
import HobbiesAndValues from '../../components/HobbiesAndValues';

// Firebase
import {createLofft} from '../../api/firebase/fireStoreActions';

const AddApartmentScreen = ({route}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [docId] = useState(route.params.docId);
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
            docId,
            hobbiesAndValues: userHobbies,
          });
          navigation.navigate('Costs');
        }}
      />
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
