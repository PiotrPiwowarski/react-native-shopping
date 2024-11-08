import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, Keyboard, ScrollView,TouchableWithoutFeedback, Platform, View } from 'react-native';
import BigButton from './BigButton';
import Navbar from './Navbar';
import Input from './Input';
import Background from './Background';
import axios from 'axios';

const Registration = ({ navigation, users, setUsers, usersCounter, setUsersCounter, baseUrl }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailInput = (input) => {
    setEmail(input.trim());
  }

  const handlePasswordInput = (input) => {
    setPassword(input.trim());
  }

  const handleRepeatedPasswordInput = (input) => {
    setRepeatedPassword(input.trim());
  }

  const handleRegisterButton = async () => {
    if(email === '' || password === '' || repeatedPassword === '') {
      setError('Wypełnij wszystkie pola formularza');
    }  else if(password.length < 4 ) {
      setError('Zbyt krótkie hasło');
    } else if(password !== repeatedPassword) {
      setError('Powtórzone hasło się różni względem orginalnego');
    } else {
      try {
        setError('');
        const response = await axios.post(`${baseUrl}/api/users/register`, {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          navigation.navigate('Login');
        } else {
          setError('Rejestracja nie powiodła się');
        }
      } catch (error) {
        setError('Wystąpił błąd podczas rejestracji');
        console.error(error);
      }
    }
  }

  return (
    
    <View style={{flex: 1}}>

      <Background />

      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

        <Navbar navigation={navigation} buttonsArray={[{key: 1, buttonName: 'wróć', onClickButton: () => navigation.navigate('Home')}]} />

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>

          <View style={{textAlign: 'center'}}>

            <Text style={styles.errorMessage}>{error}</Text>

            <Input inputName='podaj login' changeTextHandler={handleEmailInput} numeric={false} password={false} />

            <Input inputName='podaj hasło' changeTextHandler={handlePasswordInput} numeric={false} password={true} />

            <Input inputName='powtórz hasło' changeTextHandler={handleRepeatedPasswordInput} numeric={false} password={true} />

            <BigButton innerText='zarejestruj się' pressFunction={handleRegisterButton} />

          </View>
              
        </ScrollView>

      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
    margin: 20,
    fontWeight :'bold',
  },
});

export default Registration;