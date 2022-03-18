import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';

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

const importedFriends = [
  {id: 1, name: 'Adam', imgUrl: adam, selected: false},
  {id: 2, name: 'James', imgUrl: james, selected: false},
  {id: 3, name: 'May', imgUrl: may, selected: false},
  {id: 4, name: 'Freddie', imgUrl: freddie, selected: false},
];

const AddFriendsScreen = ({navigation}) => {
  const [friends, setFriends] = useState(importedFriends);


  const selectFriends = (id) => {
    console.log(id);
    console.log(friends);


    const clickedFriends = friends.map(el => {
      if (el.id === id) {
      return {...el, selected: !el.selected};
      } else {
      return el;
       }
    });



    setFriends(clickedFriends);
  };

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
            <CoreButton
              newcolor="blue"
              value="Create New Poll"
              style={styles.addFriendsButton}
            />
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
  chooseFriendsContainer: {
    marginHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 40,
  },
});

export default AddFriendsScreen;
