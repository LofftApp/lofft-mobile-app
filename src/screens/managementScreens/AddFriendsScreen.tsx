import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';

// Sample Images
import adam from '../../../assets/sampleFaces/adam.jpg';
import james from '../../../assets/sampleFaces/james.jpg';
import may from '../../../assets/sampleFaces/may.jpg';
import freddie from '../../../assets/sampleFaces/freddie.jpg';

// Components
import CustomBackButton from '../../components/buttons/CustomBackButton';
import {CoreButton} from '../../components/buttons/CoreButton';
import ImageFriendContainer from '../../components/cards/ImageFriendContainer';

// Styles
import {CoreStyleSheet} from '../../StyleSheets/CoreDesignStyleSheet';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

// Firestore

import {addEvent} from '../../api/firebase/fireStoreActions';

const importedFriends = [
  {id: 1, name: 'Adam', imgUrl: adam, selected: false},
  {id: 2, name: 'James', imgUrl: james, selected: false},
  {id: 3, name: 'May', imgUrl: may, selected: false},
  {id: 4, name: 'Freddie', imgUrl: freddie, selected: false},
];

const AddFriendsScreen = ({navigation, route}: any) => {
  const [friends, setFriends] = useState(importedFriends);
  const [allFriendsSelect, setAllFriendsSelect] = useState(false);

  const selectFriends = id => {
    const clickedFriends = friends.map(el => {
      if (el.id === id) {
        return {...el, selected: !el.selected};
      } else {
        return el;
      }
    });

    setFriends(clickedFriends);
  };

  const toggleFriends = () => {
    let allFriendsSelected;

    setAllFriendsSelect(!allFriendsSelect);

    if (allFriendsSelect) {
      allFriendsSelected = friends.map(el => {
        return {...el, selected: true};
      });
    } else {
      allFriendsSelected = friends.map(el => {
        return {...el, selected: false};
      });
    }

    setFriends(allFriendsSelected);
  };

  // if (allFriendsSelect) {
  //   const selectAllFriends = () => {
  //     const selectAllFriends = friends.map(el => {
  //       return {...el, selected: true};
  //     });
  //     setAllFriendsSelect(true);
  //     setFriends(selectAllFriends);
  //   };
  // }

  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <CustomBackButton
        onPress={() => navigation.goBack()}
        title="Add new event"
      />

      <View style={styles.centerContainer}>
        <View style={styles.friendsContainer}>
          <View style={styles.selectContainer}>
            <Text style={[fontStyles.buttonTextMedium, {width: '50%'}]}>
              Who do you want to invite?
            </Text>
            <TouchableOpacity
              style={[styles.buttonStyle]}
              onPress={() => toggleFriends()}>
              <Text
                style={[fontStyles.buttonTextMedium, styles.buttonTextStyle]}>
                {allFriendsSelect ? 'Select all' : 'Unselect'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chooseFriendsContainer}>
            {friends.map((el, index) => (
              <ImageFriendContainer
                selectFriends={selectFriends}
                key={index + 1}
                id={el.id}
                name={el.name}
                imgUrl={el.imgUrl}
                selected={el.selected}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.actionButtonContainer}>
        <CoreButton
          value="Confirm"
          style={styles.button}
          onPress={() => {
            navigation.navigate('EventConfirmation'), addEvent(route.params.title, route.params.location);
          }}
        />
        <CoreButton
          value="Cancel"
          style={styles.button}
          invert
          onPress={() => navigation.navigate('Managment')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  friendsContainer: {
    height: 450,
    width: 344,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: color.Lavendar[5],
  },

  selectContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 14,
    marginHorizontal: 14,
  },

  addFriendsButton: {
    backgroundColor: color.White[100],
    flex: 1,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.White[100],
    borderColor: color.Lavendar[100],
    borderRadius: 16,
    borderWidth: 2,
    marginLeft: 19,
    flex: 1,
    paddingVertical: 10,
  },
  buttonTextStyle: {
    color: color.Lavendar[100],
  },
  chooseFriendsContainer: {
    marginHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  actionButtonContainer: {
    marginTop: 30,
  },
  button: {
    marginVertical: 5,
  },
});

export default AddFriendsScreen;
