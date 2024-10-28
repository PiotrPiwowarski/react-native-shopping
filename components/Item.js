import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import BigButton from './BigButton';

const Item = ({ navigation, item, data, setData, user }) => {

  const [bought, setBought] = useState(false); 

  const handleDeleteButton = () => {
    setData(prev => (
      prev.filter(o => parseInt(o.id) !== parseInt(item.id))
    ))
  };  

  const handleEditButton = () => {
    navigation.navigate('EditItem', {item: item, user: user})
  }

  const handleBuyButton = () => {
    if(!bought) {
      setData(prev => {
        const thisItem = prev.filter(o => parseInt(o.id) === parseInt(item.id));
        const restItems = prev.filter(o => parseInt(o.id) !== parseInt(item.id));
        return [...restItems, ...thisItem];
      })
    }
    setBought(prev => !prev);
  };

  const handleDetailsButton = () => {
    navigation.navigate('ItemDetails', {item: item, user: user})
  }

  return (
    <View style={[styles.container, bought && {borderColor: 'green', borderRadius: 10, borderWidth: 10}]} >

      <Text style={[styles.text, {fontSize: 30}]}>status: {bought ? 'kupiony' : 'kup'}</Text>

      <View style={{alignItems: 'flex-start'}}>

        <Text style={styles.text}>sklep: {item.shop}</Text>

        <Text style={styles.text}>produkt: {item.product}</Text>
      
        <Text style={styles.text}>cena: {item.price}</Text>

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