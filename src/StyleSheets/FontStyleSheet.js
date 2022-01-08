import {StyleSheet} from 'react-native';

// const headerFont700 = 'Montserrat-Bold';
// const headerFont600 = 'Montserrat-SemiBold';
// const ButtonFont = 'Roboto-Bold';
// const bodyFont = 'Roboto';

export const fontStyles = StyleSheet.create({
  headerDisplay: {
    // fontFamily: headerFont700,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 48,
    lineHeight: 64,
  },
  headerLarge: {
    // fontFamily: headerFont700,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 40,
    lineHeight: 56,
  },
  headerMedium: {
    // fontFamily: headerFont600,
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 0.2,
  },
  headerSmall: {
    // fontFamily: headerFont600,
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 0.2,
    lineHeight: 48,
  },
  bodyLarge: {
    // fontFamily: bodyFont,
    fontSize: 22,
  },
  bodyMedium: {
    // fontFamily: bodyFont,
    fontSize: 18,
  },
  bodySmall: {
    // fontFamily: bodyFont,
    fontSize: 14,
  },
  bodyExtraSmall: {
    // fontFamily: bodyFont,
    fontSize: 12,
  },
  buttonTextLarge: {
    // fontFamily: ButtonFont,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 22,
  },
  buttonTextMedium: {
    // fontFamily: ButtonFont,
    fontWeight: '700',
    letterSpacing: 0.2,
    fontSize: 18,
  },
  buttonTextSmall: {
    // fontFamily: ButtonFont,
    letterSpacing: 0.2,
    fontSize: 14,
  },
});
