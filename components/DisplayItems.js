import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';
import Item from './Item';
import Navbar from './Navbar';
import Background from './Background';
import FilterBar from './FilterBar';

const DisplayItems = ({ navigation, data, setData, users, setUsers, route }) => {

  const { user } = route.params;

  const [displayData, setDisplayData] = useState(data);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const [filterByShop, setFilterByShop] = useState(false);
  const [shop, setShop] = useState('');
  const [filterByPrice, setFilterByPrice] = useState(false);
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

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

  const handleAddButton = () => {
    navigation.navigate('AddItem', {user: user})
  }

  const handleFilterButton = () => {
    setShowFilterBar(prev => !prev);
  }

  return (
    <View style={{flex: 1}}>

      <Background />
    
      <Navbar navigation={navigation} user={user} users={users} setUsers={setUsers} setData={setData} 
        buttonsArray={[{key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton}, 
                       {key: 2, buttonName: 'dodaj', onClickButton: handleAddButton}, 
                       {key: 3, buttonName: 'filtruj', onClickButton: handleFilterButton}
      ]} />

      {showFilterBar && <FilterBar setDisplayData={setDisplayData} data={data} filterByShop={filterByShop} setFilterByShop={setFilterByShop} shop={shop} setShop={setShop} 
      filterByPrice={filterByPrice} setFilterByPrice={setFilterByPrice} price={price} setPrice={setPrice} />}

      <View>
        <Text style={styles.sectionHeader}> Cześć {user.login}!</Text>
      </View>

      <FlatList
        data={displayData}
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