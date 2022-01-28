import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

// StyleSheet
import color from './../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';

// Components
import CustomBackButton from '../../components/CustomBackButton';
import {CoreButton} from '../../components/CoreButton';

const PaymentConfirmationScreen = ({navigation, route}: any) => {
  const [nowActive, setNowActive] = useState(true);
  const [schedActive, setSchedActive] = useState(false);
  const [recipient] = useState(route.params.recipient);
  const [billDetails] = useState(route.params.billDetails);
  const [paymentMethod] = useState(route.params.paymentMethod);
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton onPress={() => navigation.goBack()} title="Payment" />
      <View style={styles.formContainer}>
        <View style={styles.inputFieldContainer}>
          <Text style={[fontStyles.buttonTextMedium]}>Paying</Text>
          <TextInput
            value={billDetails.title}
            style={[styles.inputField, fontStyles.bodyMedium]}
          />
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={fontStyles.buttonTextMedium}>Method</Text>
          <TextInput
            value={paymentMethod}
            style={[styles.inputField, fontStyles.bodyMedium]}
          />
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={fontStyles.buttonTextMedium}>When?</Text>
          <View style={styles.whenAnswers}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                nowActive ? styles.activeButton : null,
              ]}
              onPress={() => {
                setNowActive(true);
                setSchedActive(false);
              }}>
              <Text
                style={[
                  styles.answerText,
                  fontStyles.bodyMedium,
                  nowActive
                    ? [fontStyles.buttonTextMedium, styles.activeButtonText]
                    : null,
                ]}>
                Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                schedActive ? styles.activeButton : null,
              ]}
              onPress={() => {
                setNowActive(false);
                setSchedActive(true);
              }}>
              <Text
                style={[
                  styles.answerText,
                  fontStyles.bodyMedium,
                  schedActive
                    ? [fontStyles.buttonTextMedium, styles.activeButtonText]
                    : null,
                ]}>
                Set a schedule
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.subHeader, fontStyles.buttonTextLarge]}>
          Recipients
        </Text>
        <View style={styles.inputFieldContainer}>
          <Text style={[fontStyles.buttonTextMedium]}>
            {recipient.split(' ')[0]}
          </Text>
          <TextInput
            value={String(billDetails.value)}
            style={[styles.inputField, fontStyles.bodyMedium]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CoreButton
            value="Confirm Payment"
            style={styles.button}
            onPress={() => {
              navigation.navigate('PaymentConfirmation', {
                recipient: recipient.split(' ')[0],
              });
            }}
          />
          <CoreButton
            value="Cancel"
            style={styles.button}
            invert
            onPress={() => navigation.navigate('Costs')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    backgroundColor: color.White[100],
    flex: 1,
  },
  formContainer: {
    marginTop: 25,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 17,
  },
  inputField: {
    width: 269,
    height: 53,
    backgroundColor: color.Lavendar[5],
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  whenAnswers: {
    width: 269,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  answerText: {
    color: color.Lavendar[50],
  },
  answerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: color.Lavendar[5],
  },
  activeButtonText: {
    color: color.Lavendar[100],
  },
  subHeader: {
    marginVertical: 15,
    marginLeft: 3,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  button: {
    marginVertical: 5,
  },
});

export default PaymentConfirmationScreen;
