import React, {useState, useEffect} from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, View} from 'react-native';

// external frameworks/libaries
import Geocode from 'react-geocode';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

// Stylesheets etc.
import { fontStyles } from '../../StyleSheets/FontStyleSheet';
import color from '../../assets/defaultColorPallet.json';

const FlatMap = ({flats}) => {
  Geocode.setApiKey('AIzaSyAD6t5T0t_ZJA5AELVE8JTboDGzKzERMBg');
  Geocode.setLanguage('en');
  Geocode.setRegion('de');



  const [coordinates, setCoordinates] = useState([]);

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];



  useEffect(() => {

    const geocoding = async (addresses) => {

      let formatedCordinates = await Promise.all(
        addresses.map(async el => {
          let addressObject = {};
          const response = await Geocode.fromAddress(el.address);
          const data = response.results[0].geometry.location;
          addressObject.address = data;
          addressObject.icon = el.icon

          return addressObject
        }));
      setCoordinates(formatedCordinates)
    };

    geocoding(flats);
  }, []);




  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 52.51682884931758,
          longitude: 13.369950653767397,
          latitudeDelta: 0.3822,
          longitudeDelta:
            Dimensions.get('window').width / Dimensions.get('window').height,
        }}
        customMapStyle={mapStyle}
      >

        {coordinates.map((el,index ) => <Marker key={index+1}
          coordinate={{ latitude: el.address.lat, longitude: el.address.lng }}

        ><View style={styles.iconcontainer}><Text style={[styles.icon, fontStyles.buttonTextMedium]}>{el.icon}</Text></View></Marker>)}

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Hard coded center due to IOS container see < Flatmapscreen /> Line 49
    borderRadius: 33,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 17,
    left: -25,
    width: "115%"
  },
  map: {
    flex: 1,
  },
  icon:{

      padding: 10,
      backgroundColor: color.Lavendar[80],
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      overflow: 'hidden',
  },
});

export default FlatMap;

// Api restrictions added
