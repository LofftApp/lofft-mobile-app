import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

// stylesheets
import color from '../assets/lofftColorPallet.json';
import {fontStyles} from '../StyleSheets/FontStyleSheet';

const HobbiesAndValues = ({
  values,
  selectHobby,
  selectedHobbies,
  edit = false,
}) => {
  return (
    <>
      <Text style={fontStyles.buttonTextMedium}>Hobbies & Values</Text>
      <View style={styles.hobbyContaner}>
        {Object.entries(values).map(([k, v]) => {
          if (v.active || edit) {
            return (
              <TouchableOpacity
                style={[
                  styles.hobby,
                  edit ? styles.edit : null,
                  (edit && selectedHobbies.includes(k)) ||
                  (edit && selectedHobbies.includes(k) && v.active)
                    ? styles.active
                    : null,
                ]}
                key={k}
                onPress={() => {
                  selectHobby(k);
                }}
                disabled={!edit}>
                <Icon name={v.icon} size={36} color={color.Black[100]} />
                <Text style={[fontStyles.bodySmall, styles.hobbyText]}>
                  {v.value_en}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    // backgroundColor: color.Lavendar[5],
  },
  hobbyText: {
    marginHorizontal: 20,
  },
  edit: {
    backgroundColor: color.Lavendar[5],
  },
  active: {
    backgroundColor: color.Lavendar[30],
  },
});

export default HobbiesAndValues;
