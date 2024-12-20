import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Item from './Item';
import Navbar from './Navbar';
import Background from './Background';
import FilterBar from './FilterBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigButton from './BigButton';

const DisplayItems = ({ navigation, baseUrl, route, handleLogoutButton, items, setItems, itemsToDisplay, setItemsToDisplay }) => {
	const { userId } = route.params;
	const [user, setUser] = useState('');
	const [showFilterBar, setShowFilterBar] = useState(false);

	const [filterByShop, setFilterByShop] = useState(false);
	const [shop, setShop] = useState('');
	const [filterByPrice, setFilterByPrice] = useState(false);
	const [price, setPrice] = useState('');

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const token = await AsyncStorage.getItem('jwtToken');
				const response = await axios.get(
					`${baseUrl}/api/items/${parseInt(userId)}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const response2 = await axios.get(
					`${baseUrl}/api/users/${parseInt(userId)}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setUser(response2.data);
				setItems(response.data);
				setItemsToDisplay(response.data);
			} catch (error) {
				console.error('Błąd pobierania danych', error);
			}
		};

		fetchItems();
	}, [userId, baseUrl]);

	const handleAddButton = () => {
		navigation.navigate('AddItem', {
			userId: userId,
			setItemsToDisplay: setItemsToDisplay,
			setItems: setItems,
		});
	};

	const handleFilterButton = () => {
		setShowFilterBar((prev) => !prev);
	};

	const handleDeleteButton = async () => {
		try {
			const token = await AsyncStorage.getItem('jwtToken');
			await axios.delete(`${baseUrl}/api/users/${parseInt(userId)}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			navigation.navigate('Home');
		} catch (error) {
			console.error('Błąd pobierania danych', error);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<Navbar
				navigation={navigation}
				buttonsArray={[
					{ key: 1, buttonName: 'wyloguj', onClickButton: handleLogoutButton },
					{ key: 2, buttonName: 'dodaj', onClickButton: handleAddButton },
					{ key: 3, buttonName: 'filtruj', onClickButton: handleFilterButton },
				]}
			/>

			{showFilterBar && (
				<FilterBar
					items={items}
					setItemsToDisplay={setItemsToDisplay}
					filterByShop={filterByShop}
					setFilterByShop={setFilterByShop}
					shop={shop}
					setShop={setShop}
					filterByPrice={filterByPrice}
					setFilterByPrice={setFilterByPrice}
					price={price}
					setPrice={setPrice}
				/>
			)}

			<View>
				<Text style={styles.sectionHeader}> Cześć {user.email}!</Text>
			</View>

			<FlatList
				data={itemsToDisplay}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) =>
					parseInt(item.userId) === parseInt(userId) && (
						<Item
							navigation={navigation}
							userId={userId}
							item={item}
							itemsToDisplay={itemsToDisplay}
							setItemsToDisplay={setItemsToDisplay}
							baseUrl={baseUrl}
							setItems={setItems}
						/>
					)
				}
			/>

			<View style={{ alignItems: 'center' }}>
				<BigButton
					innerText='usuń konto'
					pressFunction={handleDeleteButton}
					height={50}
					width={100}
					fontSize={17}
					backgroundColor='red'
					textColor='white'
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	sectionHeader: {
		textAlign: 'center',
		fontSize: 30,
		color: 'white',
	},
});

export default DisplayItems;
