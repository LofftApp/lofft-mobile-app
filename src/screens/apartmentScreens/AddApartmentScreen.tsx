import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TextInput} from 'react-native';
import CustomBackButton from '../../components/CustomBackButton';
import {navigationRef as navigation} from './../../RootNavigation';
import {createLofft} from '../../api/firebase/fireStoreActions';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';
import {CoreButton} from '../../components/CoreButton';

const AddApartmentScreen = ({route}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [docId] = useState(route.params.docId);
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
        {/* <View style={styles.fieldContainer}>
          <Text style={fontStyles.buttonTextMedium}>Address 1</Text>
          <TextInput style={[fontStyles.bodyMedium, styles.formInput]} />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={fontStyles.buttonTextMedium}>Address 2</Text>
          <TextInput style={[fontStyles.bodyMedium, styles.formInput]} />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={fontStyles.buttonTextMedium}>City</Text>
          <TextInput style={[fontStyles.bodyMedium, styles.formInput]} />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={fontStyles.buttonTextMedium}>State</Text>
          <TextInput style={[fontStyles.bodyMedium, styles.formInput]} />
        </View> */}
      </View>
      <CoreButton
        value="Add Lofft"
        onPress={() => {
          createLofft({name, description, docId});
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
