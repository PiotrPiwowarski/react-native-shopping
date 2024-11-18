import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import Navbar from './Navbar';
import Background from './Background';

const ItemDetails = ({ navigation, route, handleLogoutButton }) => {

  const { item, userId } = route.params;

  const handleReturnButton = () => {
    navigation.navigate('DisplayItems', {userId: userId});
  }

  return (
    <View style={{flex: 1}}>

      <Background />

      <Navbar navigation={navigation} 
        buttonsArray={[{key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton}, 
                       {key: 2, buttonName: 'wróć', onClickButton: handleReturnButton}
      ]} />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <Text style={[styles.text, {fontSize: 30}]}>szczegóły zakupu</Text>

        <View style={{alignItems: 'flex-start'}}>

          <Text style={styles.text}>id: {item.id}</Text>

          <Text style={styles.text}>sklep: {item.shop}</Text>

          <Text style={styles.text}>produkt: {item.productName}</Text>

          <Text style={styles.text}>cena: {item.price}</Text>

          {item.description && <Text style={styles.text}>opis: {item.description}</Text>}

          {item.imageUrl && <Image source={{uri: item.imageUrl}} style={styles.image} />}
        
        </View>
        
      </ScrollView>
        
      </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    paddingBottom: 20,
    borderRadius :10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    padding: 10,
    fontWeight: 'bold'
  },
  image: { 
    width: 200, 
    height: 200,
    margin: 10,
    borderRadius: 10
  }
});

export default ItemDetails;