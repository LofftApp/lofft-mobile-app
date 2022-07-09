import React from 'react';
import {View, StyleSheet} from 'react-native';

// Assets 🖼
import * as color from '@Assets/lofftColorPallet.json';

const PaginationBar = ({screen}: any) => {
  const blobs = [1, 2, 3, 4];
  return (
    <View style={styles.pagination}>
      {blobs.map((i, index) => {
        const active =
          index === screen
            ? {width: 29, backgroundColor: color.Lavendar[50]}
            : null;
        return <View style={[styles.paginationBlob, active]} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationBlob: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: color.Lavendar[30],
    marginHorizontal: 9,
  },
  active: {},
});

export default PaginationBar;
