import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Components 🪢
import UserIcon from '../iconsAndContainers/UserIcon';

// Styles 🖌
import {fontStyles} from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const ColiversSection = ({tenants, showAlert}) => {
  return (
    <View style={styles.tenantSection}>
      {tenants.map(tenant => {
        console.log(tenant.imageURI);
        return (
          <View style={styles.userCard} key={tenant.id}>
            <UserIcon
              image={tenant.imageURI ? {uri: tenant.imageURI} : ''}
              onPress={showAlert}
              userIconStyle={styles.userIconStyle}
              userImageContainerStyle={styles.userImageContainerStyle}
              userImageStyle={styles.userImageStyle}
              disabled={tenant.pending ? false : true}
            />
            <Text style={[fontStyles.buttonTextMedium, styles.userCardText]}>
              {tenant.name ? tenant.name.split(' ')[0] : null}
            </Text>
            {tenant.pending ? <Text>Pending</Text> : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tenantSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
  },
  userCardText: {
    marginVertical: 10,
  },
  userIconStyle: {
    width: 85,
    height: 85,
  },
  userImageStyle: {
    width: 80,
    height: 80,
  },
  userCard: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default ColiversSection;
