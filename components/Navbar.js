import React, {} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const Navbar = ({ buttonsArray }) => {
  return (
    <View style={styles.container}>
      {buttonsArray.map(button => (
        <TouchableOpacity key={button.key} style={styles.button} onPress={button.onClickButton}>
          <Text style={styles.buttonText}>{button.buttonName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  buttonText: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold'
  }
});

export default Navbar;