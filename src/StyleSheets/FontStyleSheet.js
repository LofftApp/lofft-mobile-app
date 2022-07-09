import {StyleSheet} from 'react-native';
import color from './../assets/lofftColorPallet.json';

const headerFont700 = 'Montserrat-Bold';
const headerFont600 = 'Montserrat-SemiBold';
const ButtonFont = 'Roboto-Bold';
const bodyFont = 'Roboto';

export const fontStyles = StyleSheet.create({
  headerDisplay: {
    fontFamily: headerFont700,
    color: color.Black[100],
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 48,
    lineHeight: 64,
  },
  headerLarge: {
    fontFamily: headerFont700,
    color: color.Black[100],
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 40,
    lineHeight: 56,
  },
  headerMedium: {
    fontFamily: headerFont600,
    color: color.Black[100],
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 0.2,
  },
  headerSmall: {
    fontFamily: headerFont600,
    color: color.Black[100],
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 0.2,
    lineHeight: 48,
  },
  headerXtraSmall: {
    fontFamily: headerFont700,
    color: color.Black[100],
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.1,
    lineHeight: 35,
  },
  bodyLarge: {
    fontFamily: bodyFont,
    color: color.Black[100],
    fontSize: 22,
  },
  bodyMedium: {
    fontFamily: bodyFont,
    color: color.Black[100],
    fontSize: 18,
  },
  bodySmall: {
    fontFamily: bodyFont,
    color: color.Black[100],
    fontSize: 14,
  },
  bodyExtraSmall: {
    fontFamily: bodyFont,
    color: color.Black[100],
    fontSize: 12,
  },
  buttonTextLarge: {
    fontFamily: ButtonFont,
    color: color.Black[100],
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 22,
  },
  buttonTextMedium: {
    fontFamily: ButtonFont,
    color: color.Black[100],
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 18,
  },
  buttonTextSmall: {
    fontFamily: ButtonFont,
    color: color.Black[100],
    letterSpacing: 0.2,
    fontSize: 14,
  },
});
