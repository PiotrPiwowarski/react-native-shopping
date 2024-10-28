import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, Platform, View } from 'react-native';
import Navbar from './Navbar';
import Input from './Input';
import BigButton from './BigButton';
import Background from './Background';

const EditItem = ({ navigation, setData, users, setUsers, route }) => {

  const { item, user } = route.params;

  const [shop, setShop] = useState(item.shop);
  const [product, setProduct] = useState(item.product);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [error, setError] = useState('');

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

  const changeDescriptionHandler = (inputState) => {
    setDescription(inputState.trim());
  }

  const changeImageUrlHandler = (inputState) => {
    setImageUrl(inputState.trim());
  }

  const updateButtonHandler = () => {
    if(error !== '') {
      return;
    } else if(shop === '' || product === '' || price === '') {
      setError('Wypełnij wymagane pola formularza');
    } else {
      setData(prev => {
        const filteredItems = prev.filter(i => parseInt(i.id) !== parseInt(item.id));
        const updatedItem = {id: item.id, userId: user.id, shop: shop, product: product, price: price, description: description, imageUrl: imageUrl};
        return [updatedItem, ...filteredItems];
      });
      setError('');
      navigation.navigate('DisplayItems', {user: user});
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

              <Input inputName='podaj produkt' value={product} changeTextHandler={changeProductHandler} numeric={false} password={false} />

              <Input inputName='podaj cenę' value={price} changeTextHandler={changePriceHandler} numeric={true} password={false} />

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