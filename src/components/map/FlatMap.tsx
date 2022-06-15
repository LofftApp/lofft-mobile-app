import React from "react";
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const FlatMap = () => {
  return(
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -120,
    borderRadius: 30,
  },
  map:{
    flex: 1,
  }
});

export default FlatMap;
