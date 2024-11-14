import React, { useState } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Text,
} from 'react-native';
import Input from './Input';

const FilterBar = ({
	setItemsToDisplay,
	itemsToDisplay,
	filterByShop,
	setFilterByShop,
	shop,
	setShop,
	filterByPrice,
	setFilterByPrice,
	price,
	setPrice,
}) => {
	const handleShopButton = () => {
		setFilterByShop((prev) => !prev);
		if (!filterByShop) {
			setItemsToDisplay(itemsToDisplay.filter((o) => o.shop === shop));
		} else {
			setItemsToDisplay(() => {
				if (!filterByPrice) {
					return itemsToDisplay;
				} else {
					return itemsToDisplay.filter((o) => parseFloat(o.price) === parseFloat(price));
				}
			});
			setShop('');
		}
	};

	const handleShopInput = (input) => {
		setShop(input);
		if (filterByShop) {
			setItemsToDisplay(itemsToDisplay.filter((o) => o.shop === input));
		}
	};

	const handlePriceButton = () => {
		setFilterByPrice((prev) => !prev);
		if (!filterByPrice) {
			setItemsToDisplay(itemsToDisplay.filter((o) => parseFloat(o.price) === parseFloat(price)));
		} else {
			setItemsToDisplay(() => {
				if (!filterByShop) {
					return itemsToDisplay;
				} else {
					return itemsToDisplay.filter((o) => o.shop === shop);
				}
			});
			setPrice(undefined);
		}
	};

	const handlePriceInput = (input) => {
		setPrice(input);
		if (filterByPrice) {
			setItemsToDisplay(itemsToDisplay.filter((o) => parseFloat(o.price) === parseFloat(input)));
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={handleShopButton}>
						<Text style={styles.buttonText}>{filterByShop && 'X'}</Text>
					</TouchableOpacity>

					<Input
						inputName={'podaj sklep'}
						numeric={false}
						changeTextHandler={handleShopInput}
						value={filterByShop ? shop : ''}
					/>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={handlePriceButton}>
						<Text style={styles.buttonText}>{filterByPrice && 'X'}</Text>
					</TouchableOpacity>

					<Input
						inputName={'podaj cenę'}
						numeric={true}
						changeTextHandler={handlePriceInput}
						value={filterByPrice ? price : ''}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 320,
		padding: 10,
		marginBottom: 20,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
	},
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		height: 50,
		width: 50,
		margin: 10,
		marginRight: 60,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 40,
		fontWeight: 'bold',
	},
});

export default FilterBar;