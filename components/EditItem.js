import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, Platform, View } from 'react-native';
import Navbar from './Navbar';
import Input from './Input';
import BigButton from './BigButton';
import Background from './Background';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditItem = ({ navigation, route, handleLogoutButton, baseUrl }) => {
  const {item, userId, setItems, setItemsToDisplay} = route.params;
  const [shop, setShop] = useState(item.shop);
  const [productName, setProductName] = useState(item.productName);
  const [price, setPrice] = useState(item.price);
  const [amount, setAmount] = useState(item.amount);
  const [description, setDescription] = useState(item.description);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [error, setError] = useState('');

  const handleReturnButton = () => {
    navigation.navigate('DisplayItems', {userId: userId});
  }

  const changeShopHandler = (value) => {
    setShop(value.trim());
  }

  const changeProductNameHandler = (value) => {
    setProductName(value.trim());
  }

  const changePriceHandler = (value) => {
    const parsedValue = parseFloat(value.replace(',', '.'));
    if (isNaN(parsedValue)) setError('Błędna liczba');
    else {
      setError('');
      setPrice(parsedValue);
    }
  }

  const changeAmountHandler = (value) => {
    const parsedValue = parseFloat(value.replace(',', '.'));
    if (isNaN(parsedValue)) setError('Błędna liczba');
    else {
      setError('');
      setAmount(parsedValue);
    }
  }

  const changeDescriptionHandler = (inputState) => {
    setDescription(inputState.trim());
  }

  const changeImageUrlHandler = (inputState) => {
    setImageUrl(inputState.trim());
  }

  const updateButtonHandler = async () => {
    if (error !== '') return;
    if (shop === '' || productName === '' || price === '') {
      setError('wypełnij wymagane pola formularza');
      return;
    } else {
      try {
        const updatedItem = { id: item.id ,shop, productName, price: price.toString(), amount: amount.toString(), description, imageUrl, userId: userId };
        const token = await AsyncStorage.getItem('jwtToken');
        await axios.put(`${baseUrl}/api/items`, updatedItem, {headers: {'Authorization': `Bearer ${token}`}});
        const response = await axios.get(`${baseUrl}/api/items/${parseInt(userId)}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setItems(response.data);
				setItemsToDisplay(response.data);
        navigation.navigate('DisplayItems', {userId: userId, baseUrl: baseUrl});
      } catch (err) {
        setError('Błąd dodawania przedmiotu.');
        console.error(err);
      }
    }
  }

  return (
    
    <View style={{flex: 1}}>

        <Background />

        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

          <Navbar navigation={navigation} 
            buttonsArray={[{key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton}, 
                          {key: 2, buttonName: 'wróć', onClickButton: handleReturnButton}
          ]} />

          <Text style={styles.errorMessage}>{error}</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>

            <View style={{textAlign: 'center'}}>

              <Input inputName='podaj sklep' value={shop} changeTextHandler={changeShopHandler} numeric={false} password={false} />

              <Input inputName='podaj produkt' value={productName} changeTextHandler={changeProductNameHandler} numeric={false} password={false} />

              <Input inputName='podaj cenę' value={String(price)} changeTextHandler={changePriceHandler} numeric={true} password={false} />

              <Input inputName='podaj ilość' value={String(amount)} changeTextHandler={changeAmountHandler} numeric={true} password={false} />

              <Input inputName='podaj opis' value={description} changeTextHandler={changeDescriptionHandler} numeric={false} password={false} />

              <Input inputName='podaj url obrazka' value={imageUrl} changeTextHandler={changeImageUrlHandler} numeric={false} password={false} />

              <BigButton innerText='edytuj' pressFunction={updateButtonHandler} />

            </View>
                
          </ScrollView>

        </KeyboardAvoidingView>

      </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
    margin: 20,
    fontWeight :'bold',
  }
});

export default EditItem;