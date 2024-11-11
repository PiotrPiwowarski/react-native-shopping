import React, {} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import BigButton from './BigButton';
import Background from './Background';

const Home = ({ navigation }) => {

  const logInButtonHandler = () => {
    navigation.navigate('Login');
  }

  const registrationButtonHandler = () => {
    navigation.navigate('Registration')
  }

  return (
    <View style={{flex: 1}}>

      <Background />

      <View style={styles.nav}>

        <Text style={styles.header}>Shopply</Text>

      </View>

      <ScrollView contentContainerStyle={styles.container}>

        <BigButton innerText='zaloguj się' pressFunction={logInButtonHandler} />

        <BigButton innerText='zarejestruj się' pressFunction={registrationButtonHandler} />

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10
  },
  nav: {
    height: 100, 
    width: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  header: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default Home;