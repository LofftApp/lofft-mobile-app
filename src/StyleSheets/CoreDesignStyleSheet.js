import {StyleSheet} from 'react-native';
import color from './../assets/defaultColorPallet.json';

export const CoreStyleSheet = StyleSheet.create({
  viewContainerStyle: {
    backgroundColor: color.White[100],
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
    borderWidth: 1,
    borderColor: 'red',
  },
  viewContainerIOSStyle: {
    paddingTop: 65,
  },
});
