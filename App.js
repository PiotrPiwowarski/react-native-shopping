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

  const [usersCounter, setUsersCounter] = useState(3);
  const [itemsCounter, setItemsCounter] = useState(7);
  const [users, setUsers] = useState([
    {
      id: 1, login: 'admin', password: 'admin', logged: false
    },
    {
      id: 2, login: 'user', password: 'user', logged: false
    }
  ]);

  const [data, setData] = useState([
    {id: 1, userId: 1, shop: 'Lidl', product: 'Masło', price: 12, description: 'Bardzo dobre masło', imageUrl: 'https://i.pinimg.com/564x/f3/ca/3b/f3ca3b91916db4604735a7406444dd9b.jpg'},
    {id: 2, userId: 1, shop: 'Lidl', product: 'Jabłka', price: 7, description: 'Świeże jabłka', imageUrl: 'https://i.pinimg.com/564x/ee/7a/93/ee7a937dded2fb7f4edaf7a48c592879.jpg'},
    {id: 3, userId: 1, shop: 'Kaufland', product: 'Kabanosy', price: 20, description: 'Koniecznie tarczyńskiego', imageUrl: 'https://i.pinimg.com/564x/2c/18/10/2c18109cee3a0ef0785944d920ed87ba.jpg'},
    {id: 4, userId: 2, shop: 'Lidl', product: 'Masło', price: 12, description: 'Bardzo dobre masło', imageUrl: 'https://i.pinimg.com/564x/f3/ca/3b/f3ca3b91916db4604735a7406444dd9b.jpg'},
    {id: 5, userId: 2, shop: 'Lidl', product: 'Jabłka', price: 7, description: 'Świeże jabłka', imageUrl: 'https://i.pinimg.com/564x/ee/7a/93/ee7a937dded2fb7f4edaf7a48c592879.jpg'},
    {id: 6, userId: 2, shop: 'Kaufland', product: 'Kabanosy', price: 20, description: 'Koniecznie tarczyńskiego', imageUrl: 'https://i.pinimg.com/564x/2c/18/10/2c18109cee3a0ef0785944d920ed87ba.jpg'}
    
  ]);

  const HomeStack = createStackNavigator();

  return (

    <NavigationContainer style={styles.container}>
        <HomeStack.Navigator initialRouteName="Home">

          <HomeStack.Screen name="Home" component={Home} />

          <HomeStack.Screen name="Login">
            {props => <Login {...props} users={users} setUsers={setUsers} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="Registration" >
            {props => <Registration {...props} users={users} setUsers={setUsers} usersCounter={usersCounter} setUsersCounter={setUsersCounter} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="DisplayItems">
            {props => <DisplayItems {...props} data={data} setData={setData} users={users} setUsers={setUsers} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="AddItem">
            {props => <AddItem {...props} itemsCounter={itemsCounter} setItemsCounter={setItemsCounter} data={data} setData={setData} users={users} setUsers={setUsers} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="EditItem">
            {props => <EditItem {...props} setData={setData} users={users} setUsers={setUsers} />}
          </HomeStack.Screen>

          <HomeStack.Screen name="ItemDetails" >
            {props => <ItemDetails {...props} users={users} setUsers={setUsers} />}
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
