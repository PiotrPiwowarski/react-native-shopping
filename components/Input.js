import React, {} from 'react';
import { View, Text,  StyleSheet, TextInput } from 'react-native';

const Input = ({ inputName, changeTextHandler, numeric, password, value }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{inputName}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={changeTextHandler}
        keyboardType={numeric ? 'numeric' : 'default'}
        secureTextEntry={password && true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    marign: 10,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 25,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  }
});

export default Input;