import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const ToggleBar = ({dashboard}: any) => {
  const [toggled, setToggled] = useState(true);
  return (
    <View style={styles.togglePillContainer}>
      <TouchableOpacity
        style={[styles.toggleHalfPill, toggled ? styles.selected : null]}
        onPress={() => {
          setToggled(true);
          dashboard(true);
        }}>
        <Text
          style={[
            fontStyles.bodyMedium,
            styles.textStyle,
            toggled ? styles.activeText : null,
          ]}>
          Dashboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleHalfPill, toggled ? null : styles.selected]}
        onPress={() => {
          setToggled(false);
          dashboard(false);
        }}>
        <Text
          style={[
            fontStyles.bodyMedium,
            styles.textStyle,
            toggled ? null : styles.activeText,
          ]}>
          History
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  togglePillContainer: {
    borderRadius: 18,
    height: 37,
    flexDirection: 'row',
    backgroundColor: color.Lavendar[10],
    marginTop: 22,
    paddingVertical: 1,
  },
  toggleHalfPill: {
    flex: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: color.Lavendar[80],
  },
  textStyle: {
    color: color.Lavendar[80],
  },
  activeText: {
    color: color.White[100],
  },
});

export default ToggleBar;
