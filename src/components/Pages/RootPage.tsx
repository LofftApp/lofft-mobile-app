import React from 'react';
import {View, Platform} from 'react-native';

// Components 🪢
import HeaderBar from '@Bars/HeaderBar';

// StyleSheets 🖌
import {CoreStyleSheet} from '@StyleSheets/CoreDesignStyleSheet';

const RootPage = ({name, image, userHeader = false, children}) => {
  const title = userHeader ? `Hi ${name}` : name;
  return (
    <View
      style={[
        CoreStyleSheet.viewContainerStyle,
        Platform.OS === 'ios' ? CoreStyleSheet.viewContainerIOSStyle : null,
      ]}>
      <HeaderBar title={name ? title : 'Welcome'} image={image} />
      {children}
    </View>
  );
};

export default RootPage;
