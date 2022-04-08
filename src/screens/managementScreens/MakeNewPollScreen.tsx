import React, {useState, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Components
import HeaderBar from '../../components/bannersAndBars/HeaderBar';
import AddButtonPoll from '../../components/buttons/AddButtonPoll';
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';
import DatePicker from 'react-native-date-picker';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';
import ToggleBar from '../../components/bannersAndBars/ToggleBar';

// Firestore
import {addPoll} from '../../api/firebase/fireStoreActions';

const MakeNewPollScreen = ({navigation, route}) => {
  const [question, setQuestion] = useState('');
  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = useState(''); // our number of inputs, we can add the length or decrease
  const [numInputs, setNumInputs] = useState(2); // all our input fields are tracked with this array
  const refInputs = useRef<string[]>([textValue]);
  const [deadline, setDeadline] = useState('(dd/mm/yyyy)');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [multipleAnwser, setmultipleAnwsers] = useState(false);
  const [uniqueQuestionId, setQuestionId] = useState(
    Math.floor(Math.random() * 10000 + 1),
  );

  const alpha = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'z',
  ];

  const inputs: JSX.Element = [];

  for (let i = 0; i < numInputs; i++) {
    inputs.push(
      <View style={styles.anwsersTextFieldContainer} key={i}>
        <Text style={fontStyles.buttonTextMedium}>
          {alpha[i].toUpperCase()}
        </Text>
        <TextInput
          onChangeText={value => setInputValue(i, value)}
          value={refInputs.current[i]}
          placeholder="The Chicken"
          style={styles.anwsersinput}
        />
        {numInputs > 2 ? (
          <Pressable onPress={() => removeInput(i)}>
            <Text
              style={[fontStyles.buttonTextLarge, {color: color.Lavendar[10]}]}>
              &#8213;
            </Text>
          </Pressable>
        ) : null}
      </View>,
    );
  }

  const setInputValue = (index: number, value: string) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  };

  const addInput = () => {
    refInputs.current.push('');
    setNumInputs(value => value + 1);
  };

  const removeInput = (i: number) => {
    refInputs.current.splice(i, 1)[0];
    setNumInputs(value => value - 1);
  };

  const activateMultipleAnwsers = () => {
    setmultipleAnwsers(!multipleAnwser);
  };

  const fetchdate = newDate => {
    const splitDate = newDate.split('-');
    const dateFormated = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    setDeadline(dateFormated);
  };

  const activateNoDeadline = () => {
    setDeadline('');
  };

  const unitToTen = value => {
    return value.toString.length === 1 ? `0${value}` : value;
  };
  const convertDate = date => {
    const day = unitToTen(date.getDay());
    const month = unitToTen(date.getMonth());
    return `${day} - ${month} - ${date.getFullYear()}`;
  };

  // console.log(refInputs.current); // Tracking input of questions asked as an array
  // console.log(multipleAnwser);

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <CustomBackButton
            onPress={() => navigation.goBack()}
            title="Create new poll"
          />

          <View style={styles.questionsContainer}>
            <Text style={fontStyles.buttonTextMedium}>Question</Text>
            <View style={styles.questionInputContainer}>
              <TextInput
                style={[styles.questionInputStyle, fontStyles.bodyMedium]}
                keyboardType="email-address"
                placeholder="What came first 🐓 or 🥚?s"
                autoCapitalize="none"
                value={question}
                onChangeText={text => setQuestion(text)}
              />
            </View>
          </View>

          <View style={styles.answersHeaderContainer}>
            <Text style={fontStyles.buttonTextMedium}>Anwsers</Text>
            {multipleAnwser ? <AddButtonPoll addInput={addInput} /> : null}
          </View>

          <View style={styles.anwserInputContainer}>{inputs}</View>

          <View style={styles.deadlineContainer}>
            <Text style={fontStyles.buttonTextMedium}>Deadline</Text>
            <View style={styles.deadlineButtonOptionsContainer}>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => {
                  console.log('lets Open');
                  setOpen(true);
                  console.log(open);
                }}>
                <Text
                  style={[fontStyles.buttonTextSmall, styles.dateInputStyle]}>
                  {convertDate(date)}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                minimumDate={new Date()}
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => setOpen(false)}
              />
              <Pressable
                style={
                  deadline ? styles.deadlineButton : styles.deadlineButtonActive
                }
                onPress={() => activateNoDeadline()}>
                <Text
                  style={[
                    fontStyles.buttonTextSmall,
                    {flex: 0.5},
                    deadline
                      ? {color: color.Lavendar[50]}
                      : {color: color.Lavendar[100]},
                  ]}>
                  No deadline
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.multipleAnwserOuterContainer}>
            <Text style={fontStyles.buttonTextMedium}>
              Allow multiple anwsers?
            </Text>
            <View style={styles.multipleAnwserInnerContainer}>
              {multipleAnwser ? (
                <TouchableOpacity
                  style={styles.yesMultipleButtonTern}
                  onPress={activateMultipleAnwsers}>
                  <Text style={[fontStyles.buttonTextSmall, {color: 'white'}]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.yesMultipleButton}
                  onPress={activateMultipleAnwsers}>
                  <Text
                    style={[
                      fontStyles.buttonTextSmall,
                      {color: color.Lavendar[100]},
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.yesMultipleButton}
                onPress={activateMultipleAnwsers}>
                <Text
                  style={[
                    fontStyles.buttonTextSmall,
                    {color: color.Lavendar[100]},
                  ]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionButtonContainer}>
            <CoreButton
              value="Post the poll!"
              style={styles.button}
              onPress={() =>
                navigation.navigate(
                  'PollConfirmation',
                  addPoll(
                    Math.floor(Math.random() * 10000 + 1),
                    question,
                    refInputs,
                    date,
                    multipleAnwser,
                  ),
                )
              }
            />
            <CoreButton
              value="Cancel"
              style={styles.button}
              invert
              onPress={() => navigation.navigate('Managment')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  questionsContainer: {
    marginTop: 20,
  },
  questionInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionInputStyle: {
    height: 56,
    width: 350,
    paddingHorizontal: 15,
    fontSize: 24,
    marginVertical: 5,
    backgroundColor: color.Lavendar[10],
    color: color.Black[80],
    borderRadius: 16,
  },
  answersHeaderContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  anwserInputContainer: {},
  anwsersTextFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  anwsersinput: {
    height: 56,
    width: 280,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: color.Lavendar[10],
    borderRadius: 16,
  },
  deadlineContainer: {
    marginTop: 30,
  },
  deadlineButtonOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    flex: 1,
  },
  dateContainer: {
    backgroundColor: color.Lavendar[10],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    flex: 0.9,
  },
  dateInputStyle: {
    color: color.Black[30],
  },
  deadlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderColor: color.Lavendar[50],
    borderStyle: 'solid',
    borderWidth: 2,
  },
  deadlineButtonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderColor: color.Lavendar[100],
    borderStyle: 'solid',
    borderWidth: 2,
  },
  multipleAnwserOuterContainer: {
    marginTop: 25,
  },
  multipleAnwserInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  yesMultipleButton: {
    backgroundColor: color.Lavendar[10],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 14,
    width: 158,
  },
  yesMultipleButtonTern: {
    backgroundColor: color.Lavendar[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 14,
    width: 158,
  },
  actionButtonContainer: {
    marginTop: 30,
  },
  button: {
    marginVertical: 5,
  },
});

export default MakeNewPollScreen;
