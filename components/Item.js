import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import BigButton from './BigButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ navigation, item, baseUrl, setItemsToDisplay, userId, setItems }) => {

  const [bought, setBought] = useState(false); 

  const handleDeleteButton = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      await axios.delete(`${baseUrl}/api/items/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get(`${baseUrl}/api/items/${parseInt(userId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
      setItemsToDisplay(response.data);
    } catch (error) {
      console.error(`Nie udało się usunąć produkut o id ${item.id}, spróbuj ponownie`, error);
    }
  };  

  const handleEditButton = () => {
    navigation.navigate('EditItem', {item: item, user: user})
  }

  const handleBuyButton = () => {
    if(!bought) {
      setItemsToDisplay(prev => {
        const thisItem = prev.filter(o => parseInt(o.id) === parseInt(item.id));
        const restItems = prev.filter(o => parseInt(o.id) !== parseInt(item.id));
        return [...restItems, ...thisItem];
      })
    }
    setBought(prev => !prev);
  };

  const handleDetailsButton = () => {
    navigation.navigate('ItemDetails', {userId: userId, item: item})
  }

  return (
    <View style={[styles.container, bought && {borderColor: 'green', borderRadius: 10, borderWidth: 10}]} >

      <Text style={[styles.text, {fontSize: 30}]}>status: {bought ? 'kupiony' : 'kup'}</Text>

      <View style={{alignItems: 'flex-start'}}>

        <Text style={styles.text}>sklep: {item.shop}</Text>

        <Text style={styles.text}>produkt: {item.productName}</Text>
      
        <Text style={styles.text}>cena: {item.price} zł</Text>

      </View>

      <View style={{flexDirection: 'row'}}>

        <BigButton innerText='szczegóły' pressFunction={handleDetailsButton} width={100} height={50} fontSize={17} />

        <BigButton innerText='usuń' pressFunction={handleDeleteButton} width={100} height={50} fontSize={17} />

      </View>

      <View style={{flexDirection: 'row'}}>

        <BigButton innerText='edytuj' pressFunction={handleEditButton} width={100} height={50} fontSize={17} />

        <BigButton innerText={bought ? 'kupiony' : 'kup'} pressFunction={handleBuyButton} width={100} height={50} fontSize={17} />
      
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  text: {
    padding: 10,
    fontWeight: 'bold'
  },
});

export default Item;