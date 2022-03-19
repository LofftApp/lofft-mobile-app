import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {navigationRef as navigation} from './../../RootNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import values from '../../data/hobbiesAndValues.json';

// StyleSheets
import color from './../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from './../../StyleSheets/FontStyleSheet';

// Components
import {CoreButton} from '../../components/buttons/CoreButton';
import CustomBackButton from '../../components/buttons/CustomBackButton';

// Firebase
import {createLofft} from '../../api/firebase/fireStoreActions';

const AddApartmentScreen = ({route}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [docId] = useState(route.params.docId);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

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
          <View style={styles.hobbyContaner}>
            {Object.entries(values).map(([k, v]) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.hobby,
                    selectedHobbies.includes(k) ? styles.active : null,
                  ]}
                  key={k}
                  onPress={() => {
                    if (!selectedHobbies.includes(k)) {
                      setSelectedHobbies(selectedHobbies => [
                        ...selectedHobbies,
                        k,
                      ]);
                    } else {
                      const result = selectedHobbies.filter(el => {
                        return el !== k;
                      });
                      setSelectedHobbies(result);
                    }
                  }}>
                  <Icon name={v.icon} size={36} color={color.Black[100]} />
                  <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
                    {v.value_en}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
  hobbyContaner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hobby: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    flexBasis: '48%',
    borderRadius: 4,
    backgroundColor: color.Lavendar[5],
  },
  hobbyText: {
    marginHorizontal: 20,
  },
  active: {
    backgroundColor: color.Lavendar[30],
  },
});

export default AddApartmentScreen;
