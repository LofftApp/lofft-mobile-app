import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ImageBackground,
  Keyboard,
  Pressable,
} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';

// Firebase
import {findLofft, joinLofft} from '../../api/firebase/fireStoreActions';

// StyleSheets
import color from '@Assets/defaultColorPallet.json';
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '@StyleSheets/FontStyleSheet';

// Componenets
import CustomBackButton from '@Buttons/CustomBackButton';
import {CoreButton} from '@Buttons/CoreButton';

// Images
import paymentContainerBackground from '@Assets/paymentContainer.png';

const JoinApartmentScreen = () => {
  const [formInput, setFormInput] = useState('');
  const [lofft, setLofft]: any = useState();
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
      <Pressable onPressIn={Keyboard.dismiss}>
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
                    const response: any = await findLofft(formInput);
                    setLofft({id: response.id, data: response.data()});
                  };
                  search();
                }}
              />
            </View>
          </ImageBackground>
        </View>
        <View>
          {lofft ? (
            <>
              <Text style={fontStyles.headerSmall}>Results</Text>
              <View style={styles.lofftCard}>
                <View>
                  <Text style={fontStyles.headerSmall}>{lofft.data.name}</Text>
                  <Text style={fontStyles.bodyMedium}>
                    {lofft.data.description}
                  </Text>
                </View>
                <CoreButton
                  value="Join"
                  style={[styles.buttons, styles.smallButton]}
                  onPress={() => {
                    const response = joinLofft(lofft.id);
                    if (response) {
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            </>
          ) : (
            <Text style={fontStyles.headerSmall}>There are no results</Text>
          )}
        </View>
      </Pressable>
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
  lofftCard: {
    height: 150,
    justifyContent: 'space-between',
    backgroundColor: color.Blue[10],
    borderRadius: 12,
    padding: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    width: 150,
  },
  smallButton: {
    alignSelf: 'flex-end',
    width: 80,
    height: 30,
    borderRadius: 5,
    backgroundColor: color.Mint['80'],
    borderColor: color.Mint['80'],
  },
});

export default JoinApartmentScreen;
