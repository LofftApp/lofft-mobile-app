import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {navigationRef as navigation} from '../../RootNavigation';

// Components 🪢
import {CoreButton} from '../../components/buttons/CoreButton';

// Assets 🖼
import paymentContainerBackground from './../../assets/paymentContainer.png';

// Stylesheets 🖌
import color from '../../assets/defaultColorPallet.json';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';

const LofftDetailsCard = ({lofftId, lofftName, pending}) => {
  return (
    <ImageBackground
      style={styles.apartmentContainer}
      source={paymentContainerBackground}>
      <View style={styles.lofftDetailsContainer}>
        <View>
          <Text style={fontStyles.buttonTextMedium}>{lofftName}</Text>
          {pending ? (
            <View style={styles.statusButton}>
              <Text style={[fontStyles.buttonTextSmall, styles.pendingText]}>
                Pending
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          {pending ? (
            <Text style={fontStyles.buttonTextSmall}>
              Your request to join a lofft is pending
            </Text>
          ) : (
            <View style={styles.buttonContainer}>
              {lofftId ? (
                <CoreButton
                  value="View"
                  style={styles.buttons}
                  onPress={() => {
                    navigation.navigate('LofftProfile', {lofft: lofftId});
                  }}
                />
              ) : (
                <>
                  <CoreButton
                    value="Join"
                    style={styles.buttons}
                    onPress={() => navigation.navigate('JoinApartment')}
                  />
                  <CoreButton
                    value="Create"
                    style={[styles.buttons, styles.mintButton]}
                    onPress={() => {
                      navigation.navigate('AddApartment');
                    }}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    width: 150,
  },
  apartmentContainer: {
    height: 172,
    marginTop: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: color.White[0],
    overflow: 'hidden',
    borderRadius: 16,
  },
  lofftDetailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
  },
  statusButton: {
    borderWidth: 2,
    borderColor: color.Mint[50],
    borderRadius: 4,
    padding: 3,
    backgroundColor: color.Mint[50],
  },
  pendingText: {color: color.White[80]},
});

export default LofftDetailsCard;
