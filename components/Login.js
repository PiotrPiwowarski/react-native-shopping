import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	View,
} from 'react-native';
import BigButton from './BigButton';
import Navbar from './Navbar';
import Input from './Input';
import Background from './Background';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from './useStore';

const Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const baseUrl = useStore(state => state.baseUrl);

	const storeToken = async (token) => {
		try {
			await AsyncStorage.setItem('jwtToken', token);
		} catch (error) {
			console.error('Błąd zapisywania tokenu', error);
		}
	};

	const handleEmailInput = (input) => {
		setEmail(input.trim());
	};

	const handlePasswordInput = (input) => {
		setPassword(input.trim());
	};

	const handleLoginButton = async () => {
		if (email === '' || password === '') {
			setError('wypełnij wszystkie pola formularza');
		} else {
			try {
				setError('');
				const response = await axios.post(`${baseUrl}/api/users/login`, {
					email: email,
					password: password,
				});
				if (response.status === 200) {
					const token = response.data.token;
					const userId = response.data.userId;
					storeToken(token);
					navigation.navigate('DisplayItems', { userId: userId });
				} else {
					setError('Błąd logowania');
				}
			} catch (error) {
				setError('Wystąpił błąd podczas logowania');
				console.error(error);
			}
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<Navbar
					navigation={navigation}
					buttonsArray={[
						{
							key: 1,
							buttonName: 'wróć',
							onClickButton: () => navigation.navigate('Home'),
						},
					]}
				/>

				<ScrollView contentContainerStyle={styles.scrollViewContainer}>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.errorMessage}>{error}</Text>

						<Input
							inputName='podaj email'
							changeTextHandler={handleEmailInput}
							numeric={false}
							password={false}
						/>

						<Input
							inputName='podaj hasło'
							changeTextHandler={handlePasswordInput}
							numeric={false}
							password={true}
						/>

						<BigButton
							innerText='zaloguj się'
							pressFunction={handleLoginButton}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollViewContainer: {
		flexGrow: 1,
		justifyContent: 'flex-start',
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

export default Login;
