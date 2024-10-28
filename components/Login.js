import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback,  Text,  Keyboard, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import BigButton from './BigButton';
import Navbar from './Navbar';
import Input from './Input';
import Background from './Background';

const Login = ({ navigation, users, setUsers }) => {

  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('')

  const handleLoginInput = (input) => {
    setUserLogin(input.trim());
  }

  const handlePasswordInput = (input) => {
    setUserPassword(input.trim());
  }

  const handleLoginButton = () => {
    let loggedUser;
    const usersArray = users.filter(iteratedUser => iteratedUser.login === userLogin);
    if(userLogin === '' || userPassword === '') {
      setError('wypełnij wszystkie pola formularza');
    } else if(usersArray.length !== 1) {
      setError('brak użytkowników o podanym loginie');
    } else if(usersArray[0].password !== userPassword) {
      setError('błędne hasło');
    } else {
      const updatedUsers = users.map(iteratedUser => {
        if(iteratedUser.login === userLogin) {
          iteratedUser.logged = true;
          loggedUser = iteratedUser;
        }
        return iteratedUser;
      });
      setUsers(updatedUsers);
      setError('');
      navigation.navigate('DisplayItems', {user: loggedUser, users: users, setUsers: setUsers});
      loggedUser = undefined;
    }
  }

  return (
    
    <View style={{flex: 1}}>

      <Background />

      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

        <Navbar navigation={navigation} buttonsArray={[ {key: 1,buttonName: 'wróć', onClickButton: () => navigation.navigate('Home')} ]} />

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>

          <View style={{alignItems: 'center'}}>

            <Text style={styles.errorMessage}>{error}</Text>

            <Input inputName='podaj login' changeTextHandler={handleLoginInput} numeric={false} password={false} />

            <Input inputName='podaj hasło' changeTextHandler={handlePasswordInput} numeric={false} password={true} />

            <BigButton innerText='zaloguj się' pressFunction={handleLoginButton} />

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

export default Login;