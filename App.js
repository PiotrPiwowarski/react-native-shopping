import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
            {props => <DisplayItems {...props} baseUrl={BASE_URL} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="AddItem">
            {props => <AddItem {...props} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="EditItem">
            {props => <EditItem {...props} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="ItemDetails" >
            {props => <ItemDetails {...props}  />}
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
