import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, Keyboard, ScrollView,TouchableWithoutFeedback, Platform, View } from 'react-native';
import BigButton from './BigButton';
import Navbar from './Navbar';
import Input from './Input';
import Background from './Background';

const Registration = ({ navigation, users, setUsers, usersCounter, setUsersCounter }) => {

  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [repeatedUserPassword, setRepeatedUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginInput = (input) => {
    setUserLogin(input.trim());
  }

  const handlePasswordInput = (input) => {
    setUserPassword(input.trim());
  }

  const handleRepeatedPasswordInput = (input) => {
    setRepeatedUserPassword(input.trim());
  }

  const handleRegisterButton = () => {
    if(userLogin === '' || userPassword === '' || repeatedUserPassword === '') {
      setError('Wypełnij wszystkie pola formularza');
    } else if(users.filter((user) => user.login === userLogin).length > 0) {
      setError('Ta nazwa użytkownika jest zajęta');
    } else if(userPassword.length < 4 ) {
      setError('Zbyt krótkie hasło');
    } else if(userPassword !== repeatedUserPassword) {
      setError('Powtórzone hasło się różni względem orginalnego');
    } else {
      setUsers(prev => [...prev, {id: usersCounter, login: userLogin, password: userPassword}]);
      setUsersCounter(prev => prev + 1);
      setError('');
      navigation.navigate('Login');
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

            <Input inputName='podaj login' changeTextHandler={handleLoginInput} numeric={false} password={false} />

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