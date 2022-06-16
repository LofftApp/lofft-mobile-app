import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,} from 'react-native';
import { navigationRef } from '../../RootNavigation';

// Components
import UserIcon from '../iconsAndContainers/UserIcon';

// Stylesheets
import { fontStyles } from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderBarFlatHunt = ({
  image = '',
  onPress,
  title = '',
  close = false,
  style = {},
  neutral = false }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          close
            ? styles.closeButton
            : neutral
              ? styles.neutral
              : styles.backButton,
        ]}
        onPress={onPress}>
        {close ? (
          <Icon name="close" size={45} color={color.Black[50]} />
        ) : (
          <Icon
            name="chevron-back"
            size={45}
            color={neutral ? color.Black[50] : color.Lavendar[80]}
          />
        )}
      </TouchableOpacity>
      <Text style={fontStyles.headerMedium}>{title}</Text>
      <UserIcon
        image={image}
        onPress={() => {
          navigationRef.navigate('UserOptions');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 22,
  },
  backButton: {
    backgroundColor: color.Lavendar[10],
  },
  closeButton: {
    backgroundColor: color.Black[0],
  },
});

export default HeaderBarFlatHunt;
