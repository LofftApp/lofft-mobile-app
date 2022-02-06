import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';

// Firebase
import {findLofft} from '../../api/firebase/fireStoreActions';

// StyleSheets
import color from '../../assets/defaultColorPallet.json';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

// Componenets
import CustomBackButton from '../../components/CustomBackButton';
import {CoreButton} from '../../components/CoreButton';

// Images
import paymentContainerBackground from './../../assets/paymentContainer.png';

const JoinApartmentScreen = () => {
  const [formInput, setFormInput] = useState('');
  const [results, setResults]: any = useState();
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Join a Lofft"
      />
      <View style={styles.pageContainer}>
        <ImageBackground
          style={styles.inputContainer}
          source={paymentContainerBackground}>
          <TextInput
            style={[styles.formField, fontStyles.bodyMedium]}
            placeholder="Enter Name or Lofft ID"
            autoCapitalize="none"
            value={formInput}
            onChangeText={e => setFormInput(e)}
          />
          <View style={styles.buttonContainer}>
            <CoreButton
              value="Search"
              style={styles.buttons}
              onPress={() => {
                const search = async () => {
                  setResults(await findLofft(formInput));
                };
                search();
              }}
            />
          </View>
        </ImageBackground>
      </View>
      {results ? (
        <View>
          <Text style={fontStyles.headerSmall}>Results</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingVertical: 15,
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: color.Lavendar[30],
    height: 172,
    borderRadius: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  formField: {
    height: 60,
    width: '100%',
    backgroundColor: color.White[80],
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    width: 150,
  },
});

export default JoinApartmentScreen;
