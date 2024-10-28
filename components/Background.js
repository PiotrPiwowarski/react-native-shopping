import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Background = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/mountine.png')} style={styles.bgcImage} />
      <View style={styles.bgc}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  bgcImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizedMode: 'cover',
    position: 'absolute'
  },
  bgc: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

export default Background;