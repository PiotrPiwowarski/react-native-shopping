import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, ScrollView, Platform, View } from 'react-native';
import Navbar from './Navbar';
import Input from './Input';
import BigButton from './BigButton';
import Background from './Background';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddItem = ({ navigation, baseUrl, handleLogoutButton }) => {
  const [shop, setShop] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const changeShopHandler = (value) => setShop(value.trim());
  const changeProductNameHandler = (value) => setProductName(value.trim());
  const changePriceHandler = (value) => {
    if (isNaN(value)) setError('Błędna liczba');
    else {
      setError('');
      setPrice(parseFloat(value));
    }
  };
  const changeAmountHandler = (value) => {
    if (isNaN(value)) setError('Błędna liczba');
    else {
      setError('');
      setAmount(parseFloat(value));
    }
  };
  const changeDescriptionHandler = (value) => setDescription(value);
  const changeImageUrlHandler = (value) => setImageUrl(value);

  const handleReturnButton = () => navigation.navigate('DisplayItems', { user });

  const addButtonHandler = async () => {
    if (error !== '') return;
    if (shop === '' || productName === '' || price === '') {
      setError('wypełnij wymagane pola formularza');
    } else {
      try {
        const newItem = { shop, productName, price: price.toString(), amount: amount.toString(), description, imageUrl, userId: user.id };
        const token = await AsyncStorage.getItem('jwtToken');
        const response = await axios.get(`${baseUrl}/api/users/1`, {headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}});
        console.log(response);
        navigation.navigate('DisplayItems', {user: user, baseUrl: baseUrl});
      } catch (err) {
        setError('Błąd dodawania przedmiotu.');
        console.error(err);
      }
    }
  }; 

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Navbar
          navigation={navigation}
          buttonsArray={[
            { key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton },
            { key: 2, buttonName: 'wróć', onClickButton: handleReturnButton },
          ]}
        />
        <Text style={styles.errorMessage}>{error}</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={{ alignItems: 'center' }}>
            <Input inputName="podaj nazwę sklepu:" changeTextHandler={changeShopHandler} numeric={false} password={false} />
            <Input inputName="podaj nazwę produktu:" changeTextHandler={changeProductNameHandler} numeric={false} password={false} />
            <Input inputName="podaj cenę:" changeTextHandler={changePriceHandler} numeric={true} password={false} />
            <Input inputName="podaj ilość:" changeTextHandler={changeAmountHandler} numeric={true} password={false} />
            <Input inputName="podaj opis (opcjonalnie):" changeTextHandler={changeDescriptionHandler} numeric={false} password={false} />
            <Input inputName="podaj url obrazka (opcjonalnie):" changeTextHandler={changeImageUrlHandler} numeric={false} password={false} />
            <BigButton innerText="dodaj" pressFunction={addButtonHandler} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

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
    fontWeight: 'bold',
  },
});

export default AddItem;