import React from 'react';
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
	items,
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
			setItemsToDisplay(items.filter((o) => o.shop === shop));
		} else {
			setItemsToDisplay(
				filterByPrice
					? items.filter((o) =>
							parseFloat(o.price) === parseFloat(price.replace(',', '.'))
					  )
					: items
			);
			setShop('');
		}
	};

	const handleShopInput = (input) => {
		setShop(input);

		if (filterByShop) {
			setItemsToDisplay(items.filter((o) => o.shop === input));
		}
	};

	const handlePriceButton = () => {
		setFilterByPrice((prev) => !prev);

		if (!filterByPrice) {
			const priceValue = parseFloat(price.replace(',', '.'));
			if (!isNaN(priceValue)) {
				setItemsToDisplay(items.filter((o) => parseFloat(o.price) === priceValue));
			}
		} else {
			setItemsToDisplay(
				filterByShop
					? items.filter((o) => o.shop === shop)
					: items
			);
			setPrice('');
		}
	};

	const handlePriceInput = (input) => {
		setPrice(input);

		if (filterByPrice) {
			const priceValue = parseFloat(input.replace(',', '.'));
			if (!isNaN(priceValue)) {
				setItemsToDisplay(items.filter((o) => parseFloat(o.price) === priceValue));
			}
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={handleShopButton}>
						<Text style={styles.buttonText}>{filterByShop ? 'X' : ''}</Text>
					</TouchableOpacity>
					<Input
						inputName={'Podaj sklep'}
						numeric={false}
						changeTextHandler={handleShopInput}
						value={filterByShop ? shop : ''}
					/>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={handlePriceButton}>
						<Text style={styles.buttonText}>{filterByPrice ? 'X' : ''}</Text>
					</TouchableOpacity>
					<Input
						inputName={'Podaj cenę'}
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
		marginRight: 10,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 40,
		fontWeight: 'bold',
	},
});

export default FilterBar;
