import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Item from './Item';
import Navbar from './Navbar';
import Background from './Background';
import FilterBar from './FilterBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayItems = ({ navigation, baseUrl, user }) => {

  const [items, setItems] = useState([]);
  const [data, setData] = useState(items);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const [filterByShop, setFilterByShop] = useState(false);
  const [shop, setShop] = useState('');
  const [filterByPrice, setFilterByPrice] = useState(false);
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await axios.get(`${baseUrl}/api/items/${user.id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setItems(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Błąd pobierania danych", error);
      }
    };
  
    fetchItems();
  }, [user.id, baseUrl]);

  const handleLogoutButton = () => {
    axios.post(`${baseUrl}/users`)
    navigation.navigate('Home');
  }

  const handleAddButton = () => {
    navigation.navigate('AddItem', {user: user, baseUrl: baseUrl})
  }

  const handleFilterButton = () => {
    setShowFilterBar(prev => !prev);
  }

  return (
    <View style={{flex: 1}}>

      <Background />
    
      <Navbar navigation={navigation} 
        buttonsArray={[{key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton}, 
                       {key: 2, buttonName: 'dodaj', onClickButton: handleAddButton}, 
                       {key: 3, buttonName: 'filtruj', onClickButton: handleFilterButton}
      ]} />

      {showFilterBar && <FilterBar setData={setData} data={data} filterByShop={filterByShop} setFilterByShop={setFilterByShop} shop={shop} setShop={setShop} 
      filterByPrice={filterByPrice} setFilterByPrice={setFilterByPrice} price={price} setPrice={setPrice} />}

      <View>
        <Text style={styles.sectionHeader}> Cześć {user.email}!</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          parseInt(item.userId) === parseInt(user.id) && <Item navigation={navigation} user={user} item={item} data={data} setData={setData} />
        )}
      />
      
      

    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  }
});

export default DisplayItems;