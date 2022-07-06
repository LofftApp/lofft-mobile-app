import React, { useState, useCallback } from 'react';

import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Cards
import FlatCard from '../../components/cards/FlatCard';


const FlatList = ({flats}) => {

  const orderedFlatbyMatch = flats.sort((a,b) => {
    return b.match - a.match
  })



  return(

      <View style={styles.flatCardContainer}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>

        {orderedFlatbyMatch.map((el,index) => {
        return  <FlatCard key={index+1} icon={el.icon} match={el.match} name={el.name} price={el.price} district={el.district} />
      })}
        </ScrollView>
      </SafeAreaView>
      </View>

  )
}

const styles = StyleSheet.create({
  flatCardContainer: {
    marginBottom: 290,
  }
})

export default FlatList;
