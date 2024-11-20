import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import AddItem from './components/AddItem';
import DisplayItems from './components/DisplayItems';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import ItemDetails from './components/ItemDetails';
import EditItem from './components/EditItem';

const App = () => {

  const BASE_URL = 'http://192.168.100.112:8080';

  const HomeStack = createStackNavigator();

  const handleLogoutButton = async (navigation) => {
		try {
			const token = await AsyncStorage.getItem('jwtToken');
			await axios.post(
				`${BASE_URL}/api/users/logout`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			await AsyncStorage.removeItem('jwtToken');
			navigation.navigate('Home');
		} catch (error) {
			console.error('Błąd wylogowania', error);
		}
	};

  return (

    <NavigationContainer style={styles.container}>
        <HomeStack.Navigator initialRouteName="Home">

          <HomeStack.Screen name="Home" component={Home} />

          <HomeStack.Screen name="Login">
            {props => <Login {...props} baseUrl={BASE_URL} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="Registration" >
            {props => <Registration {...props} baseUrl={BASE_URL} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="DisplayItems">
            {props => <DisplayItems {...props} baseUrl={BASE_URL} handleLogoutButton={() => handleLogoutButton(props.navigation)} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="AddItem">
            {props => <AddItem {...props} baseUrl={BASE_URL} handleLogoutButton={() => handleLogoutButton(props.navigation)} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="EditItem">
            {props => <EditItem {...props} baseUrl={BASE_URL} handleLogoutButton={() => handleLogoutButton(props.navigation)} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="ItemDetails" >
            {props => <ItemDetails {...props} handleLogoutButton={() => handleLogoutButton(props.navigation)}  />}
          </ HomeStack.Screen>

        </HomeStack.Navigator>

      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  }
});

export default App;
