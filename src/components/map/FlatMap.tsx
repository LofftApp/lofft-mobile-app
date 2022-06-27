import React, {useState, useEffect} from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, View} from 'react-native';
import axios from 'axios';
import Geocode from 'react-geocode';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
//import {geocoding} from '../map/geocoding';

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

  const geocoding = async () => {
    const adress = ['Schlegel Strase 14, Berlin', 'Rudi Duschke Str 2, Berlin', 'Oranienstraße 8, Berlin', "Unter den Linden 9, Berlin", "Melchiorstraße 19, Berlin"];



    let formatedCordinates = await Promise.all(
      adress.map(async el => {
      const response = await Geocode.fromAddress(el);
      const data = response.results[0].geometry.location;
      return data
      // setCoordinates([...coordinates, data]);
      // Geocode.fromAddress(el).then(
      //   response => {
      //     const data = response.results[0].geometry.location;
      //     setCoordinates([...coordinates,data]);
      //   },
      //   error => {
      //     console.error(error);
      //   },
      // );
    }));

    setCoordinates(formatedCordinates)
  };

  const createPin = (text) => {
    const svg = '...'
    return 'data:image/svg+xml,' + svg.replace('sample-text', text);
  }

  useEffect(() => {
    geocoding();
  }, []);

  // const geocoding = () => {

  //   const formatedAddress = [];

  //   ["Schlegel str 14", "Rudi Duschke Strase"].map(el => {
  //     axios
  //       .get('https://maps.googleapis.com/maps/api/geocode/json', {
  //         params: {
  //           address: el,
  //           key: 'AIzaSyAD6t5T0t_ZJA5AELVE8JTboDGzKzERMBg',
  //         }
  //       }).then(response => {
  //         console.log(response.data)
  //         setTestArray({ categories: [response.data.results[0].geometry.bounds.northeast]})
  //       }).catch(error => console.log(error))
  //   })

  // }

  console.log(coordinates)

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
          coordinate={{ latitude: el.lat, longitude: el.lng }}

        ><Text>🎾</Text></Marker>)}

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -140,
    borderRadius: 30,
  },
  map: {
    flex: 1,
  },
});

export default FlatMap;

// Api restrictions added
