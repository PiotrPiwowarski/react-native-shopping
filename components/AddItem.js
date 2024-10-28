import React, { useState} from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, ScrollView, Platform, View } from 'react-native';
import Navbar from './Navbar';
import Input from './Input';
import BigButton from './BigButton';
import Background from './Background';

const AddItem = ({ navigation, itemsCounter, setItemsCounter, setData, route, users, setUsers }) => {

  const { user } = route.params;

  const [shop, setShop] = useState('');
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const changeShopHandler = (value) => {
    setShop(value.trim());
  }

  const changeProductHandler = (value) => {
    setProduct(value.trim());
  }

  const changePriceHandler = (value) => {
    if(isNaN(value)) {
      setError('Błędna liczba');
    } else {
      setError('');
      setPrice(parseInt(value));
    }
  }

  const changeDescriptionHandler = (value) => {
    setDescription(value.trim());
  }

  const changeImageUrlHandler = (value) => {
    setImageUrl(value.trim());
  }

  const handleLogoutButton = () => {
    const updatedUsers = users.map(iteratedUser => {
      if(iteratedUser.login === user.login) {
        iteratedUser.logged = false;
      }
      return iteratedUser;
    });
    setUsers(updatedUsers);
    navigation.navigate('Home');
  }

  const handleReturnButton = () => {
    navigation.navigate('DisplayItems', {user: user});
  }

  const addButtonHandler = () => {
    if(error !== '') {
      return;
    } else if(shop === '' || product === '' || price === '') {
      setError('wypełnij wymagane pola formularza');
    } else {
      setData(prev => (
        [{id: itemsCounter, userId: user.id, shop: shop, product: product, price: price, description: description, imageUrl: imageUrl}, ...prev]
      ))
      setError('');
      setItemsCounter(prev => (prev + 1));
      navigation.navigate('DisplayItems', {user: user, users: users, setUsers: setUsers});
    }
  }

  return  (
    
      <View style={{flex: 1}}>

        <Background />

        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

          <Navbar navigation={navigation} 
            buttonsArray={[{key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton}, 
                          {key: 2, buttonName: 'wróć', onClickButton: handleReturnButton}
          ]} />

          <Text style={styles.errorMessage}>{error}</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>

            <View style={{alignItems: 'center'}}>

              <Input inputName='podaj sklep:' changeTextHandler={changeShopHandler} numeric={false} password={false} />

              <Input inputName='podaj produkt:' changeTextHandler={changeProductHandler} numeric={false} password={false} />

              <Input inputName='podaj cenę:' changeTextHandler={changePriceHandler} numeric={true} password={false} />

              <Input inputName='podaj opis (opcjonalnie):' changeTextHandler={changeDescriptionHandler} numeric={false} password={false} />

              <Input inputName='podaj url obrazka (opcjonalnie):' changeTextHandler={changeImageUrlHandler} numeric={false} password={false} />

              <BigButton innerText='dodaj' pressFunction={addButtonHandler} />

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

export default AddItem;