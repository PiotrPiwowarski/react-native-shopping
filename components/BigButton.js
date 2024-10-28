import React, {} from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const BigButton = ({ innerText, pressFunction, height, width, fontSize, backgroundColor, textColor }) => {
  
  return (
    <TouchableOpacity 
      onPress={pressFunction} 
      style={[
        styles.button, 
        height !== undefined ? {height: height} : {height: 100}, 
        width !== undefined? {width: width} : {width: 200}, 
        backgroundColor !== undefined ? {backgroundColor: backgroundColor} : {backgroundColor: 'rgba(0, 0, 0, 0.8)'},
      ]}>
      <Text style={
        [ styles.text, fontSize !== undefined ? {fontSize: fontSize} : {fontSize: 25}, textColor !== undefined ? {color: textColor} : {color: 'rgba(255, 255, 255, 1)'} ]
      }>{innerText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default BigButton;